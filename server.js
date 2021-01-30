require('dotenv').config({ path: './config/.env' }) // ? => .env configuration handler
const express = require('express');
const mongoose = require('mongoose');
const app = express()
const cors = require('cors');

const Pusher = require("pusher");

// TODO : Database Configuration
require('./src/database/dbCon')

app.use(cors())
app.use(express.json())

// TODO : API Routing
const messageAPI = require('./src/routers/MessageAPI');
app.use(messageAPI)

// TODO : Listening to real-time data change
const pusher = new Pusher({
    appId: "1146972",
    key: "1670cbdca7939dff9895",
    secret: "116f4e20fdbd9a1d5050",
    cluster: "ap1",
    useTLS: true
})

// ? PUSHER CONFIG
const db = mongoose.connection

db.once('open', () => {

    // Message Collection
    const msgCollection = db.collection('messages')
    
    // Watch
    const stream = msgCollection.watch()

    // listen to changed data
    stream.on("change", (event) => { // everything is fired whenever event occured

        // if new message added
        if (event.operationType === 'insert'){
            const message = event.fullDocument;

            // trigger front-end 
            pusher.trigger('message', 'inserted', {
                name: message.name,
                message: message.message,
                timestamp: message.timestamp,
                receiver: message.receiver
            })
        }

    })
})

const PORT = process.env.PORT || 3030
app.listen(PORT, console.log(`running on port:${PORT}`))