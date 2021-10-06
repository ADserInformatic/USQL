const {boolean, string}= require ('@hapi/joi')
const mongoose = require('mongoose');

const noticiaSchema = mongoose.Schema({
    id_categoria:{
        type: String,
        require: true,
    },
    titulo: {
        type: String,
        require: true,
        min: 2, 
        max: 255
    },
    subtitulo:{
        type: String,
        require: true,
        min: 2, 
        max: 1000
    },
    descripcion:{
        type: String,
        require: true,
    },
    foto_portada:{
        type: String,
        require: true,
        min: 2, 
        max: 1000
    },
    foto_noticia:{
        type: String,
        require: true,
        min: 2, 
        max: 1000
    },

    hide:{
        type: String,
        require: true,
        min: 2, 
        max: 10
    },
    date:{
        type: Date,
        default: Date.now
    },
    video_noticia:{
        type: String,
        require: true,
        min: 2, 
        max: 1000
    }
});
module.exports=mongoose.model('Noticia',noticiaSchema);