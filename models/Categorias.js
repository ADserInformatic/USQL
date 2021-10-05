const { boolean } = require('@hapi/joi');
const mongoose = require('mongoose');

const CategoriaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    portada: {
        type: String,
        required: true,
        min: 1,
        max: 20
    },
    hide: {
        type: String,
        required: true,
        min: 1,
        max: 20
    }
})

module.exports = mongoose.model('Categorias', CategoriaSchema);
