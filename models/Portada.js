const {boolean, string}=require( '@hapi/joi');
const mongoose= require('mongoose');

const portadaSchema=mongoose.Schema({
cantidad:{
    type: String,
    min:1,
    max:100
},
latest:{
    type: String,
    min:1,
    max:100
},
latestr:{
    type: String,
    min:1,
    max:100
},
nombre:{
    type: String,
    min:1,
    max:250
},
igual:{
    type: String,
    min:1,
    max:100
},
});
module.exports= mongoose.model('Portada',portadaSchema);