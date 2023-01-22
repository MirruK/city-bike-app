const express = require('express')
const cors = require('cors');
const { Pool, Client } = require('pg')


const PORT = process.env.PORT || 3001

const client = new Client({
    host: "db",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "city-bike-app"
})

//Get all this postgres working. Insert from dataset
//Then get to working on frontend, using this inserted dataset
// const postgresConnect = async() => {
//     console.log("Attempting to connect to postgresql db")
//     client.connect().then((val)=>console.log(val)).catch((err)=>console.log(err))
// }
//
// const retryConnection = async()=>{
//     let retries = 5
//     while (retries) {
//         try {
//             console.log("Attempting connect")
//             await postgresConnect()
//             await new Promise(res => setTimeout(res, 3000))
//             break
//         } catch (error) {
//             console.log(error)
//             retries -= 1
//             console.log("Retries left: ", retries)
//             //wait
//             await new Promise(res => setTimeout(res, 3000))
//         }
//     }
//     process.exit(1);
// }
//
// retryConnection()
const app = express()

app.use(cors())

client.connect((err)=>{
    if(err) console.error('connection error', err.stack)
    else console.log("connected")
})

// Use logging middleware for errors
// use morgan for pretty logging of requests

app.get('/', (req, res)=>{
    res.status(200)
    res.send("Hi there")
})

// Get info about specific journey by id
//app.get('api/journies/:id')


// Get info about all stations (preload these)
app.get('/api/stations', (req, res)=>{
    console.log("Hit stations endpoint")
    const queryRes = client.query("SELECT * FROM stations")
    queryRes.then((val)=>{
        res.status(200)
        res.json(val.rows).end()
        return;
    }).catch((err)=>res.status(404).end())
})

// Get info about a station by id
app.get('/api/stations/:id', (req, res)=>{
    console.log("Hit stations/id endpoint")
    const queryRes = client.query(`SELECT * FROM stations WHERE fid=${req.params.id}`)
    queryRes.then((val)=>{
        res.status(200)
        res.json(val.rows).end()
        return;
    }).catch((err)=>res.status(404).end())
})

app.get('/api/stations/:name', (req, res)=>{
    console.log("Hit stations/id endpoint")
    const queryRes = client.query(
        `SELECT * FROM stations 
        WHERE Nimi=${req.params.name} 
        OR Namn=${req.params.name} 
        OR Name=${req.params.name}`
    )
    queryRes.then((val)=>{
        res.status(200)
        res.json(val.rows).end()
        return;
    }).catch((err)=>res.status(404).end())
})

// Get all journies for specific station id
app.get('/api/stations/:id/journeys', (req,res)=>{
    //type(default both): departing, returning
    //order(default descending)
    //sortBy(default latest): latest, oldest, length (ride length), time (ride time)
    const getTypeQuery = () => {
        return {
            "departing" : `WHERE Departure_station_id=${req.params.id}`,
            "returning" : `WHERE Return_station_id=${req.params.id}`,
        }
    }
    const getSortQuery = (type,order) => {
        //only valid values for query order is asc or desc
        if(order !== "asc") order = "DESC";
        else order = "ASC";
        if (type === "departing") type = "Departure";
        else type = "Return";
        return {
            "latest" : `ORDER BY ${type} ${order}`,
            "oldest" : `ORDER BY ${type} ${order}`,
            "length" : `ORDER BY Covered_distance_m ${order}`,
            "time" : `ORDER BY Duration_sec ${order}`,
        }
    }
    const type = getTypeQuery(req.params.id)[req.query.rideType || "departing"];
    const sortBy = getSortQuery(req.query.rideType,req.query.order)[req.query.sortBy || "latest"];
    const page = req.query.page ? `OFFSET ${(Number.parseInt(req.query.page)*50).toString() || "0"}` : ""
    console.log(`Test queries:\nRidetype: ${type}\nSortBy: ${sortBy}\npage: ${page}`)
    const queryRes = client.query(`SELECT * FROM journeys ${type} ${sortBy} LIMIT 50 ${page}`)
    queryRes
        .then((val)=>{
        res.status(200)
        res.json(val.rows).end()
        return;
        })
        .catch((err)=>{
            console.log("Failed to get data from database")
            res.status(404).end()})
})

// add a new journey 
// database gives id & validate format of data
//app.post('api/journies')

//same as above but for adding new stations

app.listen(PORT, ()=>console.log("Server listening on port: ", PORT))
process.on ("SIGINT", async() => {
  await client.close();
});
