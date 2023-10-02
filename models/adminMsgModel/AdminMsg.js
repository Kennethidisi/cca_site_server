const mongoose = require('mongoose')

const AdminMsgSchema = mongoose.Schema({
    senderId:{
        type: String
    },

    message:{
        type: String
    }
})

module.exports = mongoose.model('AdminMsg', AdminMsgSchema)