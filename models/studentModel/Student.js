const mongoose = require("mongoose");
const studentSchema = mongoose.Schema({
    fullname:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
        unique: true,
    },

    phone:{
        type: String,
        required: true,
        unique: true,
    },

    course:{
        type: String,
        required: true,
    },

    session:{
        type: String,
        required: true,
    },

    profileImg:{
        type: String,
        default: ""
    },

    password:{
        type: String,
        required: true,
        unique: true,
        min: 6
    },

    isAdmin:{
        type: Boolean,
    }

},{timestamps: true})

module.exports = mongoose.model('Students', studentSchema)