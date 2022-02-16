
const router = require('express').Router();
const videos = require('../models/Videos');
const multer =  require('../multer/vid');
const fs = require('fs-extra');
const path = require('path');

//ruta que crea un nuevo documento de fotos
router.post('/PostVideo', multer.upload, async (req, res)=>{
    try{
        
        const vidd = new videos()
        const url = req.file.filename
        const {titulo, hide} = req.body

        
        vidd.titulo = titulo;
        vidd.url = url 
        vidd.hide = hide
        const videeaso = await vidd.save()
        res.json({error:false, data: videeaso})
        }catch(err){
            res.json({error: true, mensaje:err})
        }
})

//ruta que obtiene todos los documento de fotos
router.get('/GetVideos', async (req, res)=>{
    const busqueda = await videos.find({})
    busqueda.reverse();
    res.json(
        busqueda
    )
})
//obtiene todos los elementos de fotos para no registrados
router.get('/GetVideosNR', async (req, res)=>{
    const busqueda = await videos.find({hide:1})
    busqueda.reverse();
    res.json(
        busqueda
    )
})

//ruta que obtiene un documento de fotos
router.get('/GetVideo/:id', async (req, res)=>{
    const id = req.params.id;
    const busque1 = await videos.findOne({_id: id})
    res.json(busque1)
})



//ruta que elimina un documento de fotos
router.delete('/DeleteVideo/:id', async (req, res)=>{
    try{
        const id = req.params.id
        console.log('llego peticion de borrado ')
        const viejo = await videos.findOne({_id: id})
        if(viejo){
            
            console.log('video a borrar: ', viejo)

            
            try{
                // const borre = path.resolve(__dirname,"../../public_html/assets/img/Videos/"+viejo.url);
                // console.log('path del video: ', borre)
                await fs.unlink(path.resolve(__dirname,"../../public_html/assets/img/Videos/"+viejo.url),function (err) {
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                    console.log('File deleted!');
                })

                }catch(err){
                            console.log(err);
                            res.json({error:true, mensaje:"no se pudo borrar video con el id"})
                            }
            try{    
                const borra1 = await videos.findByIdAndDelete({_id: id})
                }catch(err){
                console.log(err)
                res.json({error:true, mensaje:"no se encontro video en db"})
                }
            console.log('borrado con exito')
            res.json({error:false, mensaje: "borrado con exito"})
            }else{
                console.log('no se encontro video ')
                res.json({error:true,mensaje:"no se borro video de base de datos con id"})
                }
    }catch(err){
        res.json({error:true,mensaje:"algo malio sal"})}

})



module.exports = router;