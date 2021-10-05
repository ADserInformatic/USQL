const router=require('express').Router();
const Categoria=require('../models/Categorias');

const Joi=require('@hapi/joi');
//validar nueva categoria

const schemaAddCategory=Joi.object({
    nombre:Joi.string().min(2).max(50).required(),
    portada:Joi.string().min(1).max(50).required(),
    hide:Joi.string().min(1).max(50).required()
})

//add CATEGORIA
router.post('/PostCategoria',async  (req,res)=>{
    const {error}=schemaAddCategory.validate(req.body);
    if (error){
        return res.status(400).json({error: error.details[0].message})
     }
    const existeCategory=await Categoria.findOne({nombre:req.body.nombre});
    if(existeCategory){return res.status(400).json({error:true,mensaje:"CATEGORIA YA EXISTE"})};
    
    const Category= new Categoria({
        nombre:req.body.nombre,
        portada:req.body.portada,
        hide:req.body.hide
    });
    try {
        const CategoryDB= await Category.save();
        res.json({
            mensaje: CategoryDB
        })
    }
    catch (error) {
        res.status(400).json({error})
    }

})
//EDIT CATEGORIA
router.post('/edit/:id', async (req,res)=>{
    const {error}=schemaAddCategory.validate(req.body);
    if(error){
        return res.status(400).json({
            error:error.details[0].message
        })
    }
    const id=req.params.id;
    const {nombre, portada, hide}=req.body;
    const Category = await Categoria.updateOne({_id:id},{nombre,portada,hide})
    const Modificado = await Categoria.findOne({_id:id})
    res.json({
        Modificado
    });



})
//ELIMINAR CATEGORIA
router.delete('/DeleteCategoria/:id',async(req, res)=>{
    const id=req.params.id;
    const Aeliminar= await Categoria.findOne({_id:id});
    if(Aeliminar.nombre=="POLICY ANALISYS" || Aeliminar.nombre=="LITERACY"){
        return res.status(400).json({
            error:true,
            mensaje: "NO SE PUEDE ELIMINAR ESTA CATEGORIA"
        })
    }
    //********************************************************************** */
    //COMPROBAR QUE NO HAYA NOTICIAS CON ESTA CATEGORIA
    const eliminado = await Categoria.findByIdAndDelete(Aeliminar)
    res.json({error: false, data: eliminado})

})
//DEVOLVER TODAS LAS CATEGORIAS
router.get('/GetCategoria',async(req, res)=>{
    const AllCategories = await Categoria.find();
    res.json({
        error:false,
        data: AllCategories
    });
    
})
// DEVOLVER UNA CATEGORIA 
router.get('/GetCategoria/:id',async(req, res)=>{
    const id=req.params.id;
    const CategorySearch= await Categoria.findOne({_id:id});
    if(!CategorySearch){
        return res.status(400).json({
            error:true,
            mensaje: "CATEGORIA NO ENCONTRADA"
        })
    }
    res.json({
        error:false,
        data: CategorySearch
    })
})
module.exports = router;