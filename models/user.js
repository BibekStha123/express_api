const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    is_admin: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('user', userSchema)