CREATE TABLE moth(
    "id"                  integer PRIMARY KEY,
    "Name"                varchar(200),
    "Date"                date,
    "PolygonId"           integer,
    "H0"                  numeric,
    "H1"                  numeric,
    "H2"                  numeric,
    "H3"                  numeric
);


CREATE TABLE other(
    "id"                  integer PRIMARY KEY,
    "Name"                varchar(200),
    "Date"                date,
    "PolygonId"           integer,
    "H0"                  numeric,
    "H1"                  numeric,
    "H2"                  numeric,
    "H3"                  numeric
);

CREATE TABLE butterfly(
    "id"                  integer PRIMARY KEY,
    "Name"                varchar(200),
    "Date"                date,
    "PolygonId"           integer,
    "H0"                  numeric,
    "H1"                  numeric,
    "H2"                  numeric,
    "H3"                  numeric
);

CREATE TABLE spider(
    "id"                  integer PRIMARY KEY,
    "Name"                varchar(200),
    "Date"                date,
    "PolygonId"           integer,
    "H0"                  numeric,
    "H1"                  numeric,
    "H2"                  numeric,
    "H3"                  numeric
); 


CREATE TABLE odonata(
    "id"                  integer PRIMARY KEY,
    "Name"                varchar(200),
    "Date"                date,
    "PolygonId"           integer,
    "H0"                  numeric,
    "H1"                  numeric,
    "H2"                  numeric,
    "H3"                  numeric
);

CREATE TABLE coleoptera(
    "id"                  integer PRIMARY KEY,
    "Name"                varchar(200),
    "Date"                date,
    "PolygonId"           integer,
    "H0"                  numeric,
    "H1"                  numeric,
    "H2"                  numeric,
    "H3"                  numeric
);

CREATE TABLE info(
    "id"                  integer PRIMARY KEY,
    "Name"                varchar(200),
    "Kingdom"             varchar(200),
    "Class"               varchar(200),
    "Family"              varchar(200),
    "Taxa"                varchar(200),
    "Count"               numeric
);

CREATE TABLE track(
    "id"                  integer PRIMARY KEY,
    "Name"                varchar(200),
    "Date"                date,
    "Long"                numeric,
    "Lat"                 numeric
);

CREATE TABLE featureimp(
    "id"                  integer PRIMARY KEY,
    "Name"                varchar(200),
    "F1Name"              varchar(200),
    "F1Value"             numeric,
    "F2Name"              varchar(200),
    "F2Value"             numeric,
    "F3Name"              varchar(200),
    "F3Value"             numeric,
    "F4Name"              varchar(200),
    "F4Value"             numeric
);

CREATE TABLE ecodiv(
    "id"                  integer PRIMARY KEY,
    "Date"                date,
    "PolygonId"           integer,
    "Count"               integer
);

COPY moth("id","Name","Date","PolygonId","H0","H1","H2","H3") FROM '/db/dist/moth.csv' DELIMITER ',' CSV HEADER;
COPY butterfly("id","Name","Date","PolygonId","H0","H1","H2","H3") FROM '/db/dist/butterfly.csv' DELIMITER ',' CSV HEADER;
COPY other("id","Name","Date","PolygonId","H0","H1","H2","H3") FROM '/db/dist/other.csv' DELIMITER ',' CSV HEADER;
COPY spider("id","Name","Date","PolygonId","H0","H1","H2","H3") FROM '/db/dist/spider.csv' DELIMITER ',' CSV HEADER;
COPY odonata("id","Name","Date","PolygonId","H0","H1","H2","H3") FROM '/db/dist/odonata_csv' DELIMITER ',' CSV HEADER;
COPY coleoptera("id","Name","Date","PolygonId","H0","H1","H2","H3") FROM '/db/dist/coleoptera.csv' DELIMITER ',' CSV HEADER;
COPY "info"("id","Name","Kingdom","Class","Family","Taxa","Count") FROM '/db/info/bioinfo.csv' DELIMITER ',' CSV HEADER;
COPY track("id","Name","Date","Long","Lat") FROM '/db/track/track.csv' DELIMITER ',' CSV HEADER;
COPY featureimp("id","Name","F1Name","F1Value","F2Name","F2Value","F3Name","F3Value","F4Name","F4Value") FROM '/db/dist/attention.csv' DELIMITER ',' CSV HEADER;
COPY ecodiv("id","Date","PolygonId","Count") FROM '/db/ecodiv/alliving.csv' DELIMITER ',' CSV HEADER;
