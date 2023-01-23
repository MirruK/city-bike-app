#/bin/bash

cd .. && mkdir dataset
cd dataset 
wget https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv -O 2021-05.csv
wget https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv -O Helsingin_ja_Espoon_kaupunkipyöräasemat_avoin.csv

docker-compose up -d
docker exec backend-db-1 psql -U postgres -c 'CREATE DATABASE "city-bike-app";'
docker exec backend-db-1 psql -U postgres -d "city-bike-app" -a -f /create_tables.sql

echo "Backend initialized, use docker-compose down to shut down containers"
