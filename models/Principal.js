const { boolean } = require('@hapi/joi');
const mongoose = require('mongoose');

const mainSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    urlwwa: {
        type: String,
        required: true,
        min: 2,
        max: 1000
    },
    textwwa: {
        type: String,
        required: true,
        min: 4,
        max: 2500
    },
    textautor: {
        type: Number,
        required: true,
        min: 1,
        max: 2000
    },
    urlautor: {
        type: String,
        required: true,
        min: 6,
        max: 1000
    }
})

module.exports = mongoose.model('mains', mainSchema);
