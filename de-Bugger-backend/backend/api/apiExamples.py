from fastapi import Body
from datetime import datetime
import pickle as pkl

import numpy as np
from random import randint, choice, seed
seed(0) 

plg2coor = pkl.load(open('plg2coor.pkl', 'rb'))
ts = [datetime(2020, 1, 1), datetime(2020, 4, 1), datetime(2020, 7, 1), datetime(2020, 10, 1), 
      datetime(2021, 1, 1), datetime(2021, 4, 1), datetime(2021, 7, 1), datetime(2021, 10, 1)]
polygons =[ plg2coor[pid] for pid in range(0,2939) ]

BioInfoEx = Body(...,
                 examples={"simple": {"summary": "One sample example.",
                                      "description": "One sample example",
                                      "value": {"polygon":[], 
                                                "name": "Euphaea formosa",
                                                "date": ""},
                                     },
                          }
                )

BioInfoRe =  {200: {"description": "Success",
                    "content": {
                        "application/json": {
                            "examples": {"simple": {"summary": "One sample example.",
                                                    "value": {"name":'', 
                                                              "taxonomy":{'kingdom': 'Animalia', 'phylum': 'Arthropoda', 'class': 'Insecta', 'order': 'Odonata', 'family': 'Euphaeidae', 'genus': 'Euphaea', 'species': 'formosa'}, 
                                                              "other":{},
                                                              "status":200}
                                                   },
                                        }
                        }
                    }
                   },
                400: {"description": "Success",
                       "content": {
                           "application/json": {
                               "examples": {"simple": {"summary": "One sample example.",
                                                       "value": {"name":'', 
                                                                 "taxonomy":{'kingdom':'', 'kingdom':'', 'phylum':'', 'class':'', 'order':'', 'family':'', 'genus':'', 'species':''}, 
                                                                 "other":{}, 
                                                                 "status":400}
                                                      },
                                           }
                           }
                       }
                     },
             }



BioDistEx = Body(...,
                 examples={"simple": {"summary": "One sample example.",
                                      "description": "One sample example",
                                      "value": {"polygon": [5+42*10, 6+42*10, 7+42*10, 5+42*11, 6+42*11, 7+42*11, 5+42*12, 6+42*12, 7+42*12], 
                                                "name": "Euphaea formosa",
                                                "date": datetime(2019, 10, 1)},
                                     },
                          }
                )

BioDistRe =  {200: {"description": "Success",
                    "content": {
                        "application/json": {
                            "examples": {"simple": {"summary": "One sample example.",
                                                    "value": {"heatmap": (np.random.rand(3,3)*10).tolist(), "featimp":200}
                                                   },
                                        }
                        }
                    }
                   },
                400: {"description": "Success",
                       "content": {
                           "application/json": {
                               "examples": {"simple": {"summary": "One sample example.",
                                                       "value": {"heatmap":[], 
                                                                 "featimp":{'altitude':10, 'vegetation':5, 'water content':7}, 
                                                                 "status":400}
                                                      },
                                           }
                           }
                       }
                     },
             }


BioTrackEx = Body(...,
                 examples={"simple": {"summary": "One sample example.",
                                      "description": "One sample example",
                                      "value": {"polygon": list(range(2939)), 
                                                "name": "Euphaea formosa",
                                                "date": datetime(2019, 10, 1)},
                                     },
                          }
                )

BioTrackRe =  {200: {"description": "Success",
                    "content": {
                        "application/json": {
                            "examples": {"simple": {"summary": "One sample example.",
                                                    "value": {"track": [[t]+choice(choice(polygons)) for t, _ in zip(ts, range(randint(3,10))) ], 
                                                              "status":200}
                                                   },
                                        }
                        }
                    }
                   },
                400: {"description": "Success",
                       "content": {
                           "application/json": {
                               "examples": {"simple": {"summary": "One sample example.",
                                                       "value": {"track": [], "status":400}
                                                      },
                                           }
                           }
                       }
                     },
             }




EcoDivEx = Body(...,
                 examples={"simple": {"summary": "One sample example.",
                                      "description": "One sample example",
                                      "value": {"polygon": [5+42*10, 6+42*10, 7+42*10, 5+42*11, 6+42*11, 7+42*11, 5+42*12, 6+42*12, 7+42*12], 
                                                "name": "Euphaea formosa",
                                                "date": datetime(2019, 10, 1)},
                                     },
                          }
                )

EcoDivRe =  {200: {"description": "Success",
                    "content": {
                        "application/json": {
                            "examples": {"simple": {"summary": "One sample example.",
                                                    "value": {"thld": 10, 
                                                              "diversity":[ [datetime(y, m, 1), randint(20,50)] for y, m in zip([2019]*2+[2020]*4+[2021]*4, [7, 10, 1, 4, 7, 10, 1, 4, 7, 10])],
                                                              "status":200}
                                                   },
                                        }
                        }
                    }
                   },
                400: {"description": "Success",
                       "content": {
                           "application/json": {
                               "examples": {"simple": {"summary": "One sample example.",
                                                       "value": {"thld":0, 
                                                                 "diversity":[], 
                                                                 "status":400}
                                                      },
                                           }
                           }
                       }
                     },
             }






# HelloWorldEx = Body(...,
#                     examples={"simple": {"summary": "One sample example.",
#                          "description": "One sample example",
#                          "value": {"hello": "hello"},
#                          },
#              })

# HelloWorldRe =  {200: {"description": "Success",
#                        "content": {
#                                    "application/json": {
#                                                         "examples": {"simple": {
#                                                                                 "summary": "One sample example.",
#                                                                                 "value": {"hello": "world", "status":200}
#                                                                                },
#                                                                     }
#                                                        }
#                                   }
#                       },
#                  400: {"description": "Success",
#                        "content": {
#                                    "application/json": {
#                                                         "examples": {"simple": {
#                                                                                 "summary": "One sample example.",
#                                                                                 "value": {"hello": "", "status":400}
#                                                                                },
#                                                                     }
#                                                        }
#                                   }
#                       },
#                 }
