const { boolean } = require('@hapi/joi');
const mongoose = require('mongoose');

const mainSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        default:"portada"

    },
    urlwwa: {
        type: String,
        required: true,
        default:""
    },
    textwwa: {
        type: String,
        required: true,

    },
    textautor: {
        type: String,
        required: true,

    },
    urlautor: {
        type: String,
        required: true,
        default:""

    }
})

module.exports = mongoose.model('mains', mainSchema);
