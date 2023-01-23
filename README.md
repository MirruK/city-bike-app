# README

This is a fullstack application that shows information about city-bike stations and journeys in Helsinki.

This project is for the Solita dev academy pre-assignment.

## Build steps:
### DEPENDENCIES: 
- docker
- docker-compose
-wget (if running shell script)
- WSL (windows subsystem for linux) ONLY ON WINDOWS (might work without it but it is not tested)
- The dataset files listed in step 1.1 (automatic dl if using shell script)

### Steps:
<br>**ON LINUX:** 
1. Clone repository
2. `cd city-bike-app/backend`
3. `chmod +x dockerdbinit.sh && ./dockerdbinit.sh`
<br>Proceed to the "SERVING THE FRONTEND" section below

<br>**ON WINDOWS:**
1. Clone repository
    - Download datasets from https://github.com/solita/dev-academy-2023-exercise
            <br>The files you want are: https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
            <br> And: https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv 
    - Copy the files into a directory called "dataset" placed at the root of the project. That is, "city-bike-app/dataset"
    - Make sure the files are named exactly as follows:
        - "2021-05.csv" and "Helsingin_ja_Espoon_kaupunkipyöräasemat.csv"

After the files are correctly placed in the dataset directory, proceed to step 2.

2. `cd city-bike-app/backend`
3. `docker-compose up -d`
4. `docker exec backend-db-1 psql -U postgres -c 'CREATE DATABASE "city-bike-app";'`
5. `docker exec backend-db-1 psql -U postgres -d "city-bike-app" -a -f /create_tables.sql`
<br>The database should now be populated with data and running along with the backend server

## SERVING THE FRONTEND
#### This is the same on both linux and windows
<br>1. `cd ../frontend/city-bike-app`
<br>2. `npm install`
<br>3. `npm start`

**Congratulations!** The application should now be running on localhost:3000/
    
The backend will be available on localhost:3001, offering multiple api endpoints.
The postgresql database is also exposed on the port 5432,
in case you want to check it out through a database interface.

__Application setup has been tested on:__

- Arch linux on a crappy laptop with 4gb ram and an Intel 64-bit CPU
- Windows 10 on an AMD CPU 64-bit running docker with WSL

**When you want to shut down the app properly**:
<br>Run the command: `docker-compose down`

If issues arise during the build process please share them with me and I will take a look at it.
