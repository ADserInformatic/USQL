const router=require('express').Router();
const Portada=require('../models/Portada');
const Joi=require('@hapi/joi');

const schemaMain=Joi.object({
    cantidad: Joi.string.required(),
    latest:Joi.string.required(),
    latestr:Joi.string.required(),
    nombre:Joi.string.required(),
    igual:Joi.string.required()
})

//GetPortada DEVUELVE DB PORTADA
router.get('/GetPortada', async (req,res)=>{
    const dbportada= await Portada.find();
    if(!dbportada){
        return res.status(400).json({error: "PORTADA VACIA"})
    }
    res.json({
        dbportada
    })
})
//GetPortada ID     DEVUELVE DB PORTADA POR ID 
router.get('/GetPortada/:id', async (req,res)=>{
    const id=req.params.id;
    const idportada= await Portada.findOne({_id:id});
    if(!idportada){
        return res.status(400).json({error: "NO SE ENCONTRO PORTADA"})
    }
    res.json({
        idportada
    })
})
//PutPortada ID  modifica portada por id
router.post('/PutPortada/:id', async (req,res)=>{
    const id=req.params.id;

    const {error}= schemaMain.validate(req.body);
    if (error){
        return res.status(400).json({error: error.details[0].message})
     }
     const idportada= await Portada.findOne({_id:id});
    if(!idportada){
        return res.status(400).json({error: "NO SE ENCONTRO PORTADA"})
    }
    const {cantidad, latest, latestr,nombre,igual} =req.body;
    const actualizado = await Portada.updateOne({_id: id}, {cantidad, latest, latestr,nombre,igual})
    const modificado=await Portada.finOne({_id:id})
    res.json({
        "okupdateOne":actualizado,
        "ok findone":modificado
    })
})
//PostPortada AGREGA PORTADA
router.post('/PostPortada',async (req,res)=>{
    const {error}= schemaMain.validate(req.body);
    if (error){
        return res.status(400).json({error: error.details[0].message})
     }
     //const {cantidad, latest, latestr,nombre,igual} =req.body;
     //const actualizado = await Sempresa.updateOne({_id: id}, {cantidad, latest, latestr,nombre,igual})
      const NuevoPortada=new Portada({
         cantidad: req.body.cantidad,
         latest:req.body.latest,
         latestr:req.body.latestr,
         nombre:req.body.nombre,
         igual:req.body.igual
      })
     try {
         const guardar=await NuevoPortada.save();
         res.json({
             mensaje: NuevoPortada
         });
     }catch(error){
        res.status(400).json({error})
     }

})
//DeletePortada POR ID
router.delete('/DeletePortada/:id',async (req,res)=>{
    const id=req.params.id;
    const eliminar=await Portada.findOne({_id:id});
    if(!eliminar){
        return res.status(400).json({
            error:true,
            mensaje: "DATA NOT FOUND"
        })
    }
    const eliminado = await Portada.findByIdAndDelete(eliminar);
    res.json({error: false, data: eliminado});
})
module.exports=router;