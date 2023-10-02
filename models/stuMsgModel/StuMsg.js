const mongoose = require('mongoose')

const StuMsgSchema = mongoose.Schema({
    name:{
        type: String
    },

    senderId:{
        type: String
    },

    text:{
        type: String
    },
})

module.exports = mongoose.model('StudentMsgs', StuMsgSchema)