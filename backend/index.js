const express = require('express')

const PORT = process.env.PORT || 3001

const app = express()

app.get('/', (req, res)=>{
    res.status(200)
    res.send("Hi there")
})

app.listen(PORT, ()=>console.log("Server listening on port: ", PORT))
