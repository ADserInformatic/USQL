const router = require('express').Router();
const pdfs = require('../models/Archivos');
const multer =  require('../multer/pdf');
const fs = require('fs-extra');
const path=require('path')

//ruta que crea un nuevo documento de fotos
router.post('/Addpdf', multer.upload, async (req, res)=>{
    //try{
       const fot = new fotos()
        const url = req.file.filename
        const {titulo, hide} = req.body
        fot.titulo = titulo;
        fot.url = url 
        fot.hide = hide

        const fotasa = await fot.save()

        res.json(fotasa)
    //}
    //catch{error => console.log(error)}
    
})

//ruta que obtiene todos los documento de fotos
router.get('/GetFotos', async (req, res)=>{
    const busqueda = await fotos.find({})
    res.json(
        busqueda
    )
})
//obtiene todos los elementos de fotos para no registrados
router.get('/GetFotosNR', async (req, res)=>{
    const busqueda = await fotos.find({hide:1})
    res.json(
        busqueda
    )
})

//ruta que obtiene un documento de fotos
router.get('/GetFoto/:id', async (req, res)=>{
    const id = req.params.id;
    const busque1 = await fotos.findOne({_id: id})
    res.json(busque1)
})

//ruta que obtiene para editar un documento de fotos
router.get('/PutFotos/:id', async (req, res)=>{
    const id = req.params.id
    const busca1 = await fotos.findOne({_id: id})
    res.json(
        busca1
    )
})

//ruta que edita un documento de fotos
router.put('/PutFotos/:id', multer.upload, async (req, res)=>{
    const id = req.params.id
    const uno = await fotos.findOne({_id: id})
    await fs.unlink(uno.url)
    const archivo = req.file.path
    const {titulo, hide} = req.body
    const edita1 = await fotos.findByIdAndUpdate({_id: id}, {titulo, hide, url: archivo})
    res.json(
        {data: "editaoo"}
    )
})

//ruta que elimina un documento de fotos
router.delete('/DeleteFoto/:id', async (req, res)=>{
    const id = req.params.id
    const viejo = await fotos.findOne({_id: id})
    const borre = path.parse(__dirname).dir + '/app/assets/img/Fotos/'+viejo.url
    await fs.unlink(borre)
    const borra1 = await fotos.findByIdAndDelete({_id: id})
    res.json(
        borra1
    )
})



module.exports = router;