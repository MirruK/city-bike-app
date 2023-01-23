# README

This is a fullstack application that shows information about city-bike stations and journeys in Helsinki.

This project is for the Solita dev academy pre-assignment.

## Build steps:
### DEPENDENCIES: 
- docker
- docker-compose
- WSL (windows subsystem for linux) ONLY ON WINDOWS (might work without it but it is not tested)
- The dataset files listed in step 1.1

### Steps:
1. Clone repository
    - Download datasets from https://github.com/solita/dev-academy-2023-exercise
            <br>The files you want are: https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
            <br> And: https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv 
    - Copy the files into a directory called "dataset" placed at the root of the project. That is, "city-bike-app/dataset"

After the files are correctly placed in the dataset directory, proceed to step 2.

2. run command: `cd city-bike-app/backend`
<br><br>**ON LINUX:** 
3. run command: `chmod +x dockerdbinit.sh && ./dockerdbinit.sh`
<br><br>**ON WINDOWS:**
4. run command: `docker-compose up -d`
<br>4.1. run command: `docker exec backend-db-1 psql -U postgres -d "city-bike-app" -a -f /create_tables.sql`
<br>The database should now be populated with data and running along with the backend server

If you want to run the frontend in development mode:
<br>5. run command: `cd ../frontend/city-bike-app`
<br>6. run command: `npm install`
<br>7. run command: `npm start`

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
