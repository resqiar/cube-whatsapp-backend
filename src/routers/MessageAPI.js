const mongoose = require('mongoose');
const express = require('express');
const router = express.Router()

// TODO: Import Data Model
const Message = require('../model/Message')

// TODO: Create Message
router.post('/api/v1/message/create', async (req, res) => {
    try {

        // TODO: Create a Message from request => Save it to DB
        await Message.create({
            ...req.body,
        })

        // TODO: Send back status
        res.status(201).send({
            status: 201
        })
    } catch (e) {
        res.status(500).send({
            error: e.message
        })
    }
})

// TODO: Create Message
router.get('/api/v1/messages', async (req, res) => {
    try {

        // TODO: GET all available message
        const messages = await Message.find({})

        res.send(messages)
    } catch (e) {
        res.status(500).send({
            error: e.message
        })
    }
})

module.exports = router