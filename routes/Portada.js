
const router = require('express').Router();
const principal = require('../models/Principal')

//Agrega texto si no hay
router.post('/portada', async (req, res)=>{
    const elementos =await principal.find({})
    if(elementos.length == 0 ){
        const texto = new principal()
        texto.nombre = req.body.nombre
        texto.textwwa = req.body.textwwa
        texto.urlwwa = req.body.urlwwa
        texto.textautor = req.body.textautor
        texto.urlautor = req.body.urlautor

        const guarde = await texto.save()
        res.json(guarde)
    }else{
        res.json({mensaje:'Ya hay datos. Solo debe editarlos'}) 
    }
});

//Obttiene el texto guardado
router.get('/editPort', async (req, res)=>{
    const aEditar = await principal.find()
    res.json(aEditar[0])

})

//Editaa el texto que ya eesstá guardado
router.post('/editPortada', async (req, res)=>{
    const aEditar = await principal.find()
    const {nombre, textwwa, urlwwa, textautor, urlautor} = req.body
    const listo = await principal.findByIdAndUpdate({_id:aEditar[0]._id}, {nombre, textwwa, urlwwa, textautor, urlautor})
    res.json(listo)
})


module.exports = router

