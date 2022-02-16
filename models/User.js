const { boolean, string } = require('@hapi/joi');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 4,
        max: 1024
    },
    rol: {
        type: Number,
        required: true,
        min: 0,
        max: 4
    },
    nombre: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    apellido: {
        type: String,
        required: true,
        minlength: 2,
        max: 255
    },
    user_foto:{
        type: String,
        required: false,
        default:"./../../../assets/img/profile.png"
    }
    ,
    active: {
        type: Boolean,
        default: true,
        required:false,
    },
    token:{
        type: String,
        default: false,
        required:false,
        default:"sin"
    },
    user_descripcion:{
        type: String,
        required: false,
        default:"No description"
    }

    // date: {
    //     type: Date,
    //     default: Date.now
    // }
})

module.exports = mongoose.model('User', userSchema);
