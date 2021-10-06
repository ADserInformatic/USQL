const router = require ('express').Router();
const multer =  require('../multer/news');
const fs = require('fs-extra');
//importo Noticias
const Noticia=require('../models/Noticia');
const Categorias=require('../models/Categorias');
const Portada=require('../models/Portada');
//validaciones de modelo
const Joi=require('@hapi/joi');

//Validaciones 
const schemaNoticia=Joi.object({
    id_categoria:Joi.string().min(1).max(255).required(),
    titulo:Joi.string().min(1).max(255).required(),
    subtitulo:Joi.string().required(),
    descripcion:Joi.string().required(),
    foto_portada:Joi.string().required(),
    foto_noticia:Joi.string().required(),
    portada:Joi.string().required(),
    hide:Joi.string().required(),
    video_noticia:Joi.string().required(),
})

//DEVUELVE TODAS LAS NOTICIAS
router.get('/GetNoticia', async (req,res)=>{
    const AllNews= await Noticia.find();
    if(!AllNews){
        return res.status(400).json({error: "NOTICIES NOT FOUND"})
    }
    res.json({
        AllNews
    })
})
//devuelve una noticia
router.get('/GetNoticia/:id', async (req,res)=>{
    const id=req.params.id;
    const NoticiaID=await Noticia.findOne({_id:id});
    if(!NoticiaID){
        return res.status(400).json({error:true,mensaje:"AUN NO SE ENCONTRO LA NOTICIA"})
    }
    res.json({
        NoticiaID
    })
})
//devuelve noticias no registrados
router.get ('/noticiaSearchNR', async (req, res)=>{
    const NoticiasNoRegistrados=await Noticia.find({hide:1})
    if(!NoticiasNoRegistrados){
        return res.status(400).json({error:true,mensaje:"AUN NO SE ENCONTRO LA NOTICIA"})
    }
    res.json({
        NoticiasNoRegistrados
    })
})
//Noticias Policy para no registrados
router.get ('/GetNoticiaPolicy', async (req, res)=>{
    const IdCategoriaPolicys=await Categorias.find({nombre:"POLICY ANALISYS"})
    if(!IdCategoriaPolicys){
        return res.status(400).json({error:true,mensaje:"AUN NO SE ENCONTRO LA NOTICIA"})
    }
    const NoticiasPolicys=await Noticia.find({_id:IdCategoriaPolicys._id,hide:1})
    if(!NoticiasPolicys){
        return res.status(400).json({error:true,mensaje:"AUN NO SE ENCONTRO LA NOTICIA"})
    }
    res.json({
        NoticiasPolicys
    })
})
//Noticias Policy para registrados
router.get ('/GetNoticiaPolicyR', async (req, res)=>{
    const IdCategoriaPolicys=await Categorias.find({nombre:"POLICY ANALISYS"})
    if(!IdCategoriaPolicys){
        return res.status(400).json({error:true,mensaje:"AUN NO SE ENCONTRO LA NOTICIA"})
    }
    const NoticiasPolicys=await Noticia.find({_id:IdCategoriaPolicys._id})
    if(!NoticiasPolicys){
        return res.status(400).json({error:true,mensaje:"AUN NO SE ENCONTRO LA NOTICIA"})
    }
    res.json({
        NoticiasPolicys
    })
})
//Noticias Literacy para no registrados
router.get ('/GetNoticiaLiteracy', async (req, res)=>{
    const IdNoticiaLiteracy=await Categorias.find({nombre:"LITERACY"})
    if(!IdNoticiaLiteracy){
        return res.status(400).json({error:true,mensaje:"AUN NO SE ENCONTRO LA NOTICIA"})
    }
    const NoticiasLiteracy=await Noticia.find({_id:IdNoticiaLiteracy._id,hide:1})
    if(!NoticiasLiteracy){
        return res.status(400).json({error:true,mensaje:"AUN NO SE ENCONTRO LA NOTICIA"})
    }
    res.json({
        NoticiasLiteracy
    })
})
//Noticias Literacy para registrados
router.get ('/GetNoticiaLiteracyR', async (req, res)=>{
    const IdNoticiaLiteracy=await Categorias.find({nombre:"LITERACY"})
    if(!IdNoticiaLiteracy){
        return res.status(400).json({error:true,mensaje:"AUN NO SE ENCONTRO LA NOTICIA"})
    }
    const NoticiasLiteracy=await Noticia.find({_id:IdNoticiaLiteracy._id})
    if(!NoticiasLiteracy){
        return res.status(400).json({error:true,mensaje:"AUN NO SE ENCONTRO LA NOTICIA"})
    }
    res.json({
        NoticiasLiteracy
    })
})
//Devuelve ultima noticia para no registrados
router.get('/GetLatest',async (req,res)=>{
    const IdPortada= await Portada.findOne({nombre:"portada"});
    const Ultima=await Noticia.findOne({_id:IdPortada.latest});
    if(!Ultima){
        return res.status(400).json({error:true,mensaje:"AUN NO HAY NOTICIAS"})
    }
    res.json({Ultima});
})
//Devuelve ultima noticia para registrados
router.get('/GetLatestR',async (req,res)=>{
    const IdPortada= await Portada.findOne({nombre:"portada"});
    if(!IdPortada){
        return res.status(400).json({error:true,mensaje:"AUN NO HAY NOTICIAS"});
    }
    if(IdPortada.igual==0){
        const Ultima=await Noticia.findOne({_id:IdPortada.latestr});
        return res.json({Ultima});}
    const Ultima=await Noticia.findOne({_id:IdPortada.latest});
    res.json({Ultima});
})
//ARMA LA PORTADA
router.get('/GetPortada', async (req,res)=>{
    const ListaNoticias=[];


let Noticia0;
let Noticia1;
let Noticia2;
let Noticia3;

if(ListaNoticias.count()>=1){
    Noticia0=Noticia.findOne({portada:1,hide:1})
}
if(ListaNoticias.count()>=2){
    Noticia1=Noticia.findOne({_id:{$ne:Noticia0._id},portada:1,hide:1})
    ListaNoticias.push(Noticia1);
}
if(ListaNoticias.count()>=3){
    Noticia2=Noticia.findOne({$or:[{_id:{$ne:Noticia0._id},portada:1,hide:1},{_id:{$ne:Noticia1._id},portada:1,hide:1}]})
    ListaNoticias.push(Noticia2);
}
if(ListaNoticias.count()>=3){
    Noticia3=Noticia.findOne({$or:[{_id:{$ne:Noticia0._id},portada:1,hide:1},{_id:{$ne:Noticia1._id},portada:1,hide:1},{_id:{$ne:Noticia2._id},portada:1,hide:1}]})
    ListaNoticias.push(Noticia3);
}
if(!ListaNoticias){
        return res.status(400).json({error:true,mensaje:"AUN NO HAY NOTICIAS"})
    }
res.json({ListaNoticias})
})

//ARMA LA PORTADA REGISTRADOS
router.get('/GetPortadaR', async (req,res)=>{
    const ListaNoticias=[];

const Noticia0=Noticia.findOne({portada:1,hide:1});
const Noticia1=Noticia.findOne({_id:{$ne:Noticia0._id},portada:1})
ListaNoticias.push(Noticia1);
const Noticia2=Noticia.findOne({$or:[{_id:{$ne:Noticia0._id},portada:1},{_id:{$ne:Noticia1._id},portada:1}]})
ListaNoticias.push(Noticia2);
const Noticia3=Noticia.findOne({$or:[{_id:{$ne:Noticia0._id},portada:1},{_id:{$ne:Noticia1._id},portada:1},{_id:{$ne:Noticia2._id},portada:1}]})
ListaNoticias.push(Noticia3);

if(!ListaNoticias){
        return res.status(400).json({error:true,mensaje:"AUN NO HAY NOTICIAS"})
    }
res.json({ListaNoticias})
})

//AGREGAR NOTICIA
router.get('/register', multer.fotonoticia, async (req,res)=>{
    const verificaIdCategoria= await Categorias.findOne({_id:req.body.id_categoria})
    if(!verificaIdCategoria){
        return res.status(400).json({
            error:true,
            mensaje:"CATEGORIA NO EXISTE" 
        })
    }
    const {id_categoria, titulo,subtitulo,descripcion,foto_portada,foto_noticia, hide, date, video_noticia}=req.body;
    const New=new Noticia();
    New.id_categoria=id_categoria, 
    New.titulo=titulo,
    New.subtitulo=subtitulo,
    New.descripcion=descripcion,
    New.foto_portada=req.file.path,
    New.foto_noticia=foto_noticia, 
    New.hide=hide, 
    New.video_noticia=video_noticia
    try {
        const NoticiasDB= await Noticia.save();
        res.json({
            mensaje: NoticiasDB
        })
    }
    catch (error) {
        res.status(400).json({error})
    }
})
//modificar
router.get('/edit/:id', multer.fotonoticia,async (req,res)=>{
    const id= req.params.id;
    const Editar= await Noticia.findOne({_id:id})
    if(!Editar){
        return res.status(400).json({
            error:true,
            mensaje:"NO SE ENCUENTRA NOTICIA CON ESTE ID"
        })
    }
    const {id_categoria, titulo,subtitulo,descripcion,foto_portada,foto_noticia, hide, date, video_noticia}=req.body;
    const Actualizar = await Noticia.updateOne({_id:id},{id_categoria, titulo,subtitulo,descripcion,foto_portada,foto_noticia:req.file.path, hide, date, video_noticia})
    const Modificado = await Noticia.findOne({_id:id})
    res.json({
        Modificado
    });

})
//eliminar
router.get('/DeleteNoticia/:id', async (req,res)=>{

    const id=req.params.id;
    const Aeliminar= await Noticia.findOne({_id:id});
    if(!Aeliminar){
        return res.status(400).json({
            error:true,
            mensaje: "NO SE ENCUENTRA ESTA NOTICIA"
        })
    }
    const fotoportada=Aeliminar.fotoportada;
    const fotonoticia=Aeliminar.fotonoticia;
    await fs.unlink(fotoportada);
    await fs.unlink(fotonoticia);
    const eliminado = await Categoria.findByIdAndDelete(Aeliminar)
    res.json({error: false, data: eliminado})


})
module.exports=router;

