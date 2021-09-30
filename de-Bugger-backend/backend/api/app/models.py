import sqlalchemy as sqa
from sqlalchemy import Integer, String, Numeric
from sqlalchemy.sql.schema import Column
from .database import Base

    
class Moth(Base):
    __tablename__ = 'moth'
    id = Column(Integer, primary_key=True)
    Name = Column(String, nullable=False)
    Date = Column(sqa.Date, nullable=False)
    PolygonId = Column(Integer, nullable=False)
    ZeroZero = Column(Numeric, nullable=False)
    ZeroOne = Column(Numeric, nullable=False)
    OneZero = Column(Numeric, nullable=False)
    OneOne = Column(Numeric, nullable=False)


class Other(Base):
    __tablename__ = 'other'
    id = Column(Integer, primary_key=True)
    Name = Column(String, nullable=False)
    Date = Column(sqa.Date, nullable=False)
    PolygonId = Column(Integer, nullable=False)
    ZeroZero = Column(Numeric, nullable=False)
    ZeroOne = Column(Numeric, nullable=False)
    OneZero = Column(Numeric, nullable=False)
    OneOne = Column(Numeric, nullable=False)


class Butterfly(Base):
    __tablename__ = 'butterfly'
    id = Column(Integer, primary_key=True)
    Name = Column(String, nullable=False)
    Date = Column(sqa.Date, nullable=False)
    PolygonId = Column(Integer, nullable=False)
    ZeroZero = Column(Numeric, nullable=False)
    ZeroOne = Column(Numeric, nullable=False)
    OneZero = Column(Numeric, nullable=False)
    OneOne = Column(Numeric, nullable=False)


class Spider(Base):
    __tablename__ = 'spider'
    id = Column(Integer, primary_key=True)
    Name = Column(String, nullable=False)
    Date = Column(sqa.Date, nullable=False)
    PolygonId = Column(Integer, nullable=False)
    ZeroZero = Column(Numeric, nullable=False)
    ZeroOne = Column(Numeric, nullable=False)
    OneZero = Column(Numeric, nullable=False)
    OneOne = Column(Numeric, nullable=False)


class Odonata(Base):
    __tablename__ = 'odonata'
    id = Column(Integer, primary_key=True)
    Name = Column(String, nullable=False)
    Date = Column(sqa.Date, nullable=False)
    PolygonId = Column(Integer, nullable=False)
    ZeroZero = Column(Numeric, nullable=False)
    ZeroOne = Column(Numeric, nullable=False)
    OneZero = Column(Numeric, nullable=False)
    OneOne = Column(Numeric, nullable=False)


class Coleoptera(Base):
    __tablename__ = 'coleoptera'
    id = Column(Integer, primary_key=True)
    Name = Column(String, nullable=False)
    Date = Column(sqa.Date, nullable=False)
    PolygonId = Column(Integer, nullable=False)
    ZeroZero = Column(Numeric, nullable=False)
    ZeroOne = Column(Numeric, nullable=False)
    OneZero = Column(Numeric, nullable=False)
    OneOne = Column(Numeric, nullable=False)

    
class Info(Base):
    __tablename__ = 'info'
    id = Column(Integer, primary_key=True)
    Name = Column(String, nullable=False)
    Kingdom = Column(String, nullable=False)
    Class = Column(String, nullable=False)
    Family = Column(String, nullable=False)
    Taxa = Column(String, nullable=False)
    Count = Column(Integer, nullable=False)
    
    
class Track(Base):
    __tablename__ = 'track'
    id = Column(Integer, primary_key=True)
    Name = Column(String, nullable=False)
    Date = Column(sqa.Date, nullable=False)
    Lat = Column(Numeric, nullable=False)
    Long = Column(Numeric, nullable=False)
    
class FeatureImp(Base):
    __tablename__ = 'featureimp'
    id = Column(Integer, primary_key=True)
    Name = Column(String, nullable=False)
    F1Name = Column(String, nullable=False)
    F1Value = Column(Numeric, nullable=False)
    F2Name = Column(String, nullable=False)
    F2Value = Column(Numeric, nullable=False)
    F3Name = Column(String, nullable=False)
    F3Value = Column(Numeric, nullable=False)
    F4Name = Column(String, nullable=False)
    F4Value = Column(Numeric, nullable=False)
    
    
class EcoDiv(Base):
    __tablename__ = 'ecodiv'
    id = Column(Integer, primary_key=True)
    Date = Column(sqa.Date, nullable=False)
    PolygonId = Column(Integer, nullable=False)
    Species = Column(String, nullable=False)
    
    
# class EcoDiv(Base):
#     __tablename__ = 'ecodiv'
#     id = Column(Integer, primary_key=True)
#     Date = Column(sqa.Date, nullable=False)
#     PolygonId = Column(Integer, nullable=False)
#     Count = Column(Integer, nullable=False)    