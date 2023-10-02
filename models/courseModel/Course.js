const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    name:{
        type: String,
    },

    price:{
        type: String,
    },

    courseImg:{
        type: String,
        default: ""
    },

    duration:{
        type: String,
    },

    infoText:{
        type: String,
    }

}, {timestamps: true})

module.exports = mongoose.model('Courses', courseSchema)