require('dotenv').config() // ? => .env configuration handler
const express = require('express');
const app = express()

// TODO : Database Configuration
require('./config/DatabaseConfig')

app.get('/', (req, res) => {
    res.send({
        "status": 200,
        "message": "Hello World"
    })
})


const PORT = process.env.PORT || 3030
app.listen(PORT, console.log(`running on port:${PORT}`))