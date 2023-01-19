#/bin/bash

docker-compose up -d &&
    docker exec backend-db-1 psql -U postgres -d "city-bike-app" -a -f /create_tables.sql

echo "Backend initialized, use docker-compose down to shut down containers"
