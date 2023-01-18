CREATE TABLE IF NOT EXISTS stations (
    FID INT NOT NULL,
    ID INT NOT NULL,
    Nimi VARCHAR(60),
    Namn VARCHAR(60),
    Name VARCHAR(60),
    Osoite VARCHAR(60),
    Adress VARCHAR(60),
    Kaupunki VARCHAR(60),
    Stad VARCHAR(60),
    Operaattor VARCHAR(60),
    Kapasiteet INT,
    x FLOAT,
    y FLOAT,
    PRIMARY KEY (ID)
);

COPY stations
FROM '/Stationdata.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE IF NOT EXISTS journeys (
    id SERIAL NOT NULL, 
    Departure TIMESTAMP,
    Return TIMESTAMP,
    Departure_station_id INT,
    Departure_station_name VARCHAR(60),
    Return_station_id INT,
    Return_station_name VARCHAR(60),
    Covered_distance_m FLOAT,
    Duration_sec FLOAT,
    PRIMARY KEY (id)
);

COPY journeys (Departure, Return, Departure_station_id, Departure_station_name,Return_station_id,Return_station_name, Covered_distance_m,Duration_sec)
FROM '/Journeydata.csv'
DELIMITER ','
CSV HEADER;
