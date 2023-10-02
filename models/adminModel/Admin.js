const mongoose = require('mongoose')

const AdminSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },

    phone_no:{
        type: String,
        required: true,
        unique: true
    },

    email_address:{
        type: String,
        required: true,
        unique: true
    },

    profileImg:{
        type: String,
        default: ""
    },

    secret_key:{
        type: String,
        required: true,
    },

    isAdmin:{
        type: Boolean,
    },

    password:{
        type: String,
        required: true,
        min: 6
    }

})

module.exports = mongoose.model('Admin', AdminSchema)