const express = require('express')

const PORT = process.env.PORT || 3001

const app = express()

// Use logging middleware for errors
// use morgan for pretty logging of requests

app.get('/', (req, res)=>{
    res.status(200)
    res.send("Hi there")
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
