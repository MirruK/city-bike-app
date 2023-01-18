const express = require('express')
const { Pool, Client } = require('pg')


const PORT = process.env.PORT || 3001

const getQueryString = (param) => {
    const queries = {
        "station/id" : `SELECT * FROM stations WHERE id==${param}`,
        
    }
}
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
app.get('/addtable', async(req,res)=>{
    console.log("adding table and dummy data")
    dbres = await client.query(`CREATE TABLE IF NOT EXISTS "test-data" (
        "id" SERIAL,
        "data1" VARCHAR(50),
        "data2" VARCHAR(50),
        PRIMARY KEY ("id"));`
    )
    res.send(`${dbres}`).end()
})

// Get info about specific journey by id
//app.get('api/journies/:id')


// Get info about all stations (preload these)
//app.get('api/stations/')

// Get info about a station by id
//app.get('api/stations/:id')
/*returns {name, 
           address, 
           total journies started, 
           total journies ended}
*/

// Get all journies for specific station
//app.get('api/stations/:id/journies')

// add a new journey 
// database gives id & validate format of data
//app.post('api/journies')

//same as above but for adding new stations

app.listen(PORT, ()=>console.log("Server listening on port: ", PORT))
process.on ("SIGINT", async() => {
  await client.close();
});
