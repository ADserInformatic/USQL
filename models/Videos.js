const {boolean, string}= require('@hapi/joi');
const mongoose=require('mongoose');

const videoSchema=mongoose.Schema({
    url: {
        type: String,
        required: true,
        min: 2,
        max: 1000
    },
    hide: {
        type: String,
        required: true,
        min: 1,
        max: 20
    },
    titulo: {
        type: String,
        required: true,
        min: 1,
        max: 255
    }
});

module.exports=mongoose.model('Videos',videoSchema);