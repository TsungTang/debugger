# de Bugger backend
### Web site
  ![](https://i.imgur.com/ro2N4hy.png) 
  All you need is [de Bugger](https://debugger.vercel.app/) 
  
### before deployment 
* \*\*note:\*\* 
  bellows are fake info, you should change to your own content
  1. in `env/postgres.env`
  ```bash=
  POSTGRES_USER=postgres
  POSTGRES_PASSWORD=pw2postgres
  ```
  you should change `POSTGRES_PASSWORD` to your own content.
  2. in `docker-compose.yaml`
  ```bash=
    pgadmin:
        container_name: pgadmin
        image: dpage/pgadmin4
        environment:
          - PGADMIN_DEFAULT_EMAIL=pgadmin4@pgadmin.org
          - PGADMIN_DEFAULT_PASSWORD=pw2pgadmin
  ```
  3. in `/api/app/database.py`
  ```bash=
  SQLALCHEMY_DATABASE_URL = "postgresql://postgres:pw2postgres@db:5432/biodb"
  ``` 
   you should change `fakepassword` to your own content.
  
### deployment
1. `docker build -t api .`
2. `docker-compose -f docker-compose.yaml up`
4. open browser with `host://localhost:8964` 
5. login pgadmin with 
    user:`pgadmin4@pgadmin.org` 
    password:`pw2pgadmin`
7. in pgadmin
   * Add New Server 
   * Create-Server
   * Set connection information with 
   * mantainance database:`postgres` 
     user: `postgres` 
     password: `pw2postgres`
   * create database `biodb`
   * copy and peast `db/init.sql` to initiate your database 

