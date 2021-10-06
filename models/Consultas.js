const { boolean } = require('@hapi/joi');
const mongoose = require('mongoose');

const contactoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    correo: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    consulta: {
        type: String,
        required: true,
        minlength: 6,
        max: 500
    }
}); 

module.exports = mongoose.model('Contacto', contactoSchema);
