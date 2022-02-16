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

    },
    subtitulo:{
        type: String,
        require: true,

    },
    descripcion:{
        type: String,
        require: true,
    },
    foto_portada:{
        type: String,
        require: true,

    },
    foto_noticia:{
        type: String,
        require: true,

    },
//0 solo lo ven los logueados         1 lo ven todos
    hide:{
        type: String,
        require: true,

    },
    date:{
        type: Date,
        default: Date.now
    },
    // 0 no aparece en portada   1 aparece
    portada:{ 
        type: String,
        require: true,
    },
    video_noticia:{
        type: String,
        default: "",
        require: true

    },
    tableau:{
        type: String,
        default:"",
        require:true
    }
});
module.exports=mongoose.model('Noticia',noticiaSchema);