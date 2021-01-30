const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    message: String,
    name: String,
    receiver: Boolean,
    timestamp: String,
})

const Message = mongoose.model('messages', messageSchema)

module.exports = Message