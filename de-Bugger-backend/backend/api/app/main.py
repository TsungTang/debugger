#!/usr/bin/env python
# coding: utf-8

# In[60]:

import os
#os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # or any {'0', '1', '2'}

import pandas as pd
import numpy as np
import pickle as pkl
from collections import defaultdict
import json

import uvicorn
from fastapi import Body, FastAPI, Depends
from apiExamples import *
from sqlalchemy.orm import Session

import logging
import datetime

from pydantic import BaseModel, Field
from typing import Optional, Union, NewType, Tuple, List, Dict, DefaultDict

import argparse

from random import randint, choice, seed
seed(0) 


from fastapi.middleware.cors import CORSMiddleware

#from .schemas import CreateSpiderRequest
from .database import get_db
from .models import Moth, Other, Butterfly, Spider, Odonata, Coleoptera, Info, Track, FeatureImp, EcoDiv

POLYGONTOTAL = 2940 # 70*42



# preload
#taxonomyTable = pd.read_csv('TaiwanSpecies20210813_UTF8.csv')
plg2coor = pkl.load(open('plg2coor.pkl', 'rb'))
taxa2tbl = {'moth':Moth, 'butterfly':Butterfly, 'spider':Spider, 'other':Other, 'odonata':Odonata, 'coleoptera':Coleoptera}

# new types
Array = NewType('Array', List[List[float]])
Date = NewType('Date', datetime.datetime)
Polygons = NewType('Polygons', List[int] )
Heatmaps = NewType('Heatmaps', List[Dict])
Featimp = NewType('Featimp', List[Dict])
List2D = NewType('Track', List[List])
  
# self-defined request & response
class Request(BaseModel):
    polygon: Union[Polygons, str]
    name: str # 學名
    date: Union[Date, str]
    
class BioInfoRsp(BaseModel):
    name: str # 學名
    taxonomy: Dict # 界門綱目科屬種
    status: int

class BioDistRsp(BaseModel):
    heatmap: Heatmaps
    featimp: Featimp # 特徵重要度 
    status: int
    all_zero: bool
    
class BioTrackRsp(BaseModel):
    track: List2D
    status: int
    
class EcoDivRsp(BaseModel):
    diversity: List2D    
    status: int
    
def Query(table, condition):
    if table == 'taxonomy':
        df = taxonomyTable
        for n, v in condition.items():
            df = df[df[n] == v]
    return df.copy()

app = FastAPI()

#####################################################################################################################################
#@app.post("/create")
#def create(details: CreateSpiderRequest, db: Session = Depends(get_db)):
#    to_create = Spider(
#        name = details.Name,
#        date = details.Date,
#        polygonid = details.PolygonId,
#        zerozero = details.ZeroZero,
#        zeroone = details.ZeroOne,
#        onezero = details.OneZero,
#        oneone = details.OneOne,
#    )
#    db.add(to_create)
#    db.commit()
#    return { 
#        "success": True,
#        "created_id": to_create.id
#    }
#
#@app.get("/getbyid")
#def get_by_id(id: int, db: Session = Depends(get_db)):
#    return db.query(Spider).filter(Spider.id == id).first()

@app.post("/api/bioinfo", response_model=Union[BioInfoRsp, bytes], responses=BioInfoRe)
async def bioinfo(j: Union[Request, bytes] = BioInfoEx, db: Session = Depends(get_db)):
    """
    Abstract: Bilology information of a species  
    Url: /api/bioinfo  
    Method: POST  
    Raw: Json / Text  
    Request: {"polygon": (<font color=red>not used here</font>) Array of indices between 0 and 2939 which maps to a 70×42 raster of Taiwan. 0 represents grid (0, 0) which is the most northwestern grid of the raster, 2939 represents grid (69, 41) which is the most southeastern grid of the raster.  
    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"name": String of the science name of the species.  
    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"date": (<font color=red>not used here</font>) Which season to query, should be the first day of the season.}  
    """    
    
    name = ''    
    taxonomy = {'kingdom':'', 'class':'', 'family':''}
    status = 200
    try:
        if not isinstance (j, bytes): 
            name = j.name
        else:
            d = json.loads(j.decode("utf-8").replace("\n", ''))
            name = d['name']

        q =  db.query(Info).filter(Info.Name == name).first()
        taxonomy = {'kingdom':q.Kingdom, 'class':q.Class, 'family':q.Family}
        
    except Exception as e:
        logging.basicConfig(filename='api.log', level=logging.DEBUG)
        t = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        logging.error(f'[{t}] api:auxinfo {e}')
        name = ''
        taxonomy = {'kingdom':'', 'class':'', 'family':''}
        status = 400


    return {"name":name, "taxonomy":taxonomy, "status":status}

@app.post("/api/biodist", response_model=Union[BioDistRsp, bytes], responses=BioDistRe)
async def biodist(j: Union[Request, bytes] = BioDistEx, db: Session = Depends(get_db)):
    """
    Abstract: Biology distribution of a species  
    Url: /api/biodist  
    Method: POST  
    Raw: Json / Text  
    Request: {"poligon": (<font color=red>not used here</font>) Array of indices between 0 and 2939 which maps to a 70×42 raster of Taiwan. 0 represents grid (0, 0) which is the most northwestern grid of the raster, 2939 represents grid (69, 41) which is the most southeastern grid of the raster.  
    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"name": String of the science name of the species.  
    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"date": (<font color=red>not used here</font>) Which season to query, should be the first day of the season.}  
    """    

    heatmap = []
    featimp = [{"name": "", "value": ""}, {"name": "", "value": ""}, {"name": "", "value": ""}]
    status = 200    
    all_zero = False
    try:
        if not isinstance (j, bytes):
            name = j.name
            date = j.date if isinstance(j.date, str) else j.date.strftime('%Y-%m-%d')
            #date = datetime.datetime.strptime(j.date, '%Y-%m-%d') if isinstance(j.date, str) else j.date
            #date = date.date()
            
        else:
            d = json.loads(j.decode("utf-8").replace("\n", ''))
            name = d['name']
            date = d['date'] if isinstance(d['date'], str) else d['date'].strftime('%Y-%m-%d')
            #date = datetime.datetime.strptime(d['date'], '%Y-%m-%d') if isinstance(d['date'], str) else d['date']
            #date = date.date()
  
        
        q = db.query(Info).filter(Info.Name == name).first()
        if q.Taxa in taxa2tbl:
            Table = taxa2tbl[q.Taxa]
            
        table = Table.__tablename__
        sql = f"SELECT \"PolygonId\",\"H0\",\"H1\",\"H2\",\"H3\" FROM {table} WHERE \"Name\" = \'{name}\' AND \"Date\" =\'{date}\';"
        q = pd.read_sql(sql, db.bind)
        
        q['heatmap'] = q.apply(lambda x: f"[[{x['H0']}, {x['H1']}],[{x['H2']}, {x['H3']}]]", axis=1)
        q['heatmap'] = q.apply(lambda x: eval(x['heatmap']), axis=1)
        

        all_zero = not sum([ np.array(_).sum() for _ in q['heatmap']])
        q = q.sort_values(by='PolygonId')
        heatmap = q.drop(['H0','H1','H2','H3'], axis=1).rename(columns={'PolygonId':'id'}).to_dict('records')
        

        
        q = db.query(FeatureImp).filter(FeatureImp.Name == name).first()
        featimp = [{"name":q.F1Name, "value":round(q.F1Value,3)}, {"name":q.F2Name, "value":round(q.F2Value,3)}, {"name":q.F3Name, "value":round(q.F3Value,3)}, {"name":q.F4Name, "value":round(q.F4Value,3)}]
        
        if not heatmap:
            status=400


        pkl.dump(heatmap, open('fuck.pkl', 'wb'))
        


            

        # for pid in range(POLYGONTOTAL):
        #     polygon = {}
        #     q = db.query(Table).filter(Table.Name == name).filter(Table.Date == date).first()
        #     polygon["id"] = pid
        #     polygon["heatmap"] = [[q.H0, q.H1, q.H2, q.H3], 
        #                           [q.H4, q.H5, q.H6, q.H7],
        #                           [q.H8, q.H9, q.HA, q.HB],
        #                           [q.HC, q.HD, q.HE, q.HF]] 
        #     heatmap.append(polygon)
        
        #q = db.query(FeatureImp).filter(Info.Name == name).first()
        #featimp[{"name": q.F1Name, "value": q.F1Val}, {"name": q.F2Name, "value": q.F2Val}, {"name": q.F3Name, "value": q.F3Val}]
            
    except Exception as e:
        logging.basicConfig(filename='api.log', level=logging.DEBUG)
        t = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        logging.error(f'[{t}] api:biodist {e}')
        heatmap = []
        featimp = [{"name": "", "value": ""}, {"name": "", "value": ""}, {"name": "", "value": ""}]
        status = 400
        all_zero = True
    
    return {"heatmap":heatmap, "featimp":featimp, "status":status, "all_zero":all_zero}


@app.post("/api/biotrack", response_model=Union[BioTrackRsp, bytes], responses=BioTrackRe)
async def biotrack(j: Union[Request, bytes] = BioTrackEx, db: Session = Depends(get_db)):
    """
    Abstract: Biology track of a species  
    Url: /api/biotrack  
    Method: POST  
    Raw: Json / Text  
    Request: {"poligon": Array of indices between 0 and 2939 which maps to a 70×42 raster of Taiwan. 0 represents grid (0, 0) which is the most northwestern grid of the raster, 2939 represents grid (69, 41) which is the most southeastern grid of the raster.  
    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"name": String of the science name of the species.  
    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"date": Which season to query, should be the first day of the season.}  
    """    

    
    track = [[]]
    status = 200        
    try:
        if not isinstance (j, bytes):
            name = j.name
        else:
            d = json.loads(j.decode("utf-8").replace("\n", ''))
            name = d['name']
        
        q = db.query(Track).filter(Track.Name == name).all()
        track = [ [t.Date, t.Lat, t.Long]for t in q]

    except Exception as e:
        logging.basicConfig(filename='api.log', level=logging.DEBUG)
        t = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        logging.error(f'[{t}] api:biotrack {e}')
        track = [[]]
        status = 400
    
    return {"track":track, "status":status}


@app.post("/api/ecodiv", response_model=Union[EcoDivRsp, bytes], responses=EcoDivRe)
async def ecodiv(j: Union[Request, bytes] = EcoDivEx, db: Session = Depends(get_db)):
    """
    Abstract: Biology track of a species  
    Url: /api/biotrack  
    Method: POST  
    Raw: Json / Text  
    Request: {"poligon": Array of indices between 0 and 2939 which maps to a 70×42 raster of Taiwan. 0 represents grid (0, 0) which is the most northwestern grid of the raster, 2939 represents grid (69, 41) which is the most southeastern grid of the raster.  
    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"name": String of the science name of the species.  
    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"date": Which season to query, should be the first day of the season.}  
    """    

    

    diversity = []    
    status = 200   
    try:
        if not isinstance (j, bytes):
            polygons = j.polygon
        else:
            d = json.loads(j.decode("utf-8").replace("\n", ''))
            polygons = d['polygon']
            

        q = db.query(EcoDiv).filter(EcoDiv.PolygonId.in_(polygons)).all()
        
        div = defaultdict(lambda :"")
        for t in q:
            div[t.Date] += f'+{t.Species}'  


        diversity = [[_[0], len(set(_[1].split('+'))-set([''])) ] for _ in  sorted(div.items(), key=lambda x: x[0])]
            
            


    except Exception as e:
        logging.basicConfig(filename='api.log', level=logging.DEBUG)
        t = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        logging.error(f'[{t}] api:ecodiv {e}')
        diversity = []    
        status = 400
    
    return {"diversity":diversity, "status":status}



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    def printTitle(title):
        print(f'-'*(len(title)-9+4))
        print(f'| {title} |')
        print(f'-'*(len(title)-9+4))

    parser = argparse.ArgumentParser()
    parser.add_argument('-port', metavar='PPPP', type=int, 
                        dest='port', action='store', default=8100,
                        help='port number for the api service')
    args = parser.parse_args()
    title = f"start de Bugger API at sport \033[36m{args.port}\033[0m"
    printTitle(title)
    uvicorn.run("app", host="0.0.0.0", port=args.port, reload=True)
