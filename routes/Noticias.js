const router = require ('express').Router();
const multer =  require('../multer/news');
const multer2 =  require('../multer/news2');
const multerpdf =  require('../multer/pdfs');
const fs = require('fs-extra');
//importo Noticias
const Noticia=require('../models/Noticia');
const Categorias=require('../models/Categorias');
const Portada=require('../models/Portada');
//validaciones de modelo
const Joi=require('@hapi/joi');
const path = require('path')

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
        return res.json({error: "NOTICIES NOT FOUND"})
    }
    AllNews.reverse();
    res.json(
        AllNews
    )
})
//devuelve una noticia
router.get('/GetNoticia/:id', async (req,res)=>{
    const id=req.params.id;
    const NoticiaID=await Noticia.findOne({_id:id});
    if(!NoticiaID){
        return res.json({error:true,mensaje:"AUN NO SE ENCONTRO LA NOTICIA"})
    }
    res.json(
        NoticiaID
    )
})
//devuelve noticias no registrados
router.get ('/noticiaSearchNR', async (req, res)=>{
    const NoticiasNoRegistrados=await Noticia.find({hide:1})
    if(!NoticiasNoRegistrados){
        return res.json({error:true,mensaje:"AUN NO SE ENCONTRO LA NOTICIA"})
    }
    NoticiasNoRegistrados.reverse();
    res.json(
        NoticiasNoRegistrados
    )
})
//Noticias Policy para no registrados
router.get ('/GetNoticiaPolicy', async (req, res)=>{
     const IdCategoriaPolicys=await Categorias.findOne({nombre:"POLICY ANALISYS"})
     if(!IdCategoriaPolicys){
         return res.json({error:true,mensaje:"AUN NO SE ENCONTRO LA NOTICIA"})
     }
    const NoticiasPolicys=await Noticia.find({id_categoria:IdCategoriaPolicys._id,hide:1})
    if(!NoticiasPolicys){
        return res.json({error:true,mensaje:"AUN NO SE ENCONTRO LA NOTICIA"})
    }
    NoticiasPolicys.reverse();
    res.json({ error:false,data:
        NoticiasPolicys
    })
})
//Noticias Policy para registrados
router.get ('/GetNoticiaPolicyR', async (req, res)=>{
     const IdCategoriaPolicys=await Categorias.findOne({nombre:"POLICY ANALISYS"})
    
     if(!IdCategoriaPolicys){
         return res.json({error:true,mensaje:"AUN NO SE ENCONTRO LA NOTICIA"})
     }
    const NoticiasPolicys=await Noticia.find({id_categoria:IdCategoriaPolicys._id})
    if(!NoticiasPolicys){
        return res.json({error:true,mensaje:"AUN NO SE ENCONTRO LA NOTICIA"})
    }
    NoticiasPolicys.reverse();
    res.json({ error:false,data:
        NoticiasPolicys
    })
})
//Noticias Literacy para no registrados
router.get ('/GetNoticiaLiteracy', async (req, res)=>{
     const IdNoticiaLiteracy=await Categorias.findOne({nombre:"Teaching & Learning"})
     if(!IdNoticiaLiteracy){
         return res.json({error:true,mensaje:"AUN NO SE ENCONTRO LA NOTICIA"})
     }
    const NoticiasLiteracy=await Noticia.find({id_categoria:IdNoticiaLiteracy._id,hide:1})
    if(!NoticiasLiteracy){
        return res.json({error:true,mensaje:"AUN NO SE ENCONTRO LA NOTICIA"})
    }
    NoticiasLiteracy.reverse()
    res.json({error:false,data: 
        NoticiasLiteracy
    })
})
//Noticias Literacy para registrados
router.get ('/GetNoticiaLiteracyR', async (req, res)=>{
     const IdNoticiaLiteracy=await Categorias.findOne({nombre:"Teaching & Learning"})
     if(!IdNoticiaLiteracy){
         return res.json({error:true,mensaje:"AUN NO SE ENCONTRO LA NOTICIA"})
     }
    const NoticiasLiteracy=await Noticia.find({id_categoria:IdNoticiaLiteracy._id})
    if(!NoticiasLiteracy){
        return res.json({error:true,mensaje:"AUN NO SE ENCONTRO LA NOTICIA"})
    }
    NoticiasLiteracy.reverse();
    res.json({error:false,data: 
        NoticiasLiteracy
    })
})
//Devuelve ultima noticia para no registrados
router.get('/GetLatest',async (req,res)=>{
    const NoticiasR=await Noticia.find({portada:1});
    if(!NoticiasR){
        res.json({error:true,mensaje: "AUN NO HAY NOTICIAS"})
    }
    NoticiasR.reverse();
    //const cantidad=NoticiasR.length
    res.json({
        error:false,
        data: NoticiasR[0]
    })
})
//Devuelve ultima noticia para registrados
router.get('/GetLatestR',async (req,res)=>{

    const NoticiasR=await Noticia.find({hide:1,portada:1});
    
    if(!NoticiasR){
        res.json({error:true,mensaje: "AUN NO HAY NOTICIAS"})
    }
    NoticiasR.reverse();
    //const cantidad=NoticiasR.length
    res.json({
        error:false,
        data: NoticiasR[0]
    })
})
//ARMA LA PORTADA
router.get('/GetPortada', async (req,res)=>{
    const ListaNoticias=[];

const latest=await Noticia.find({portada:1});

// const Noticia1=await Noticia.findOne({_id:{$ne:latest._id},portada:1})
// const Noticia2=await Noticia.findOne({$or:[{_id:{$ne:latest._id},portada:1},{_id:{$ne:Noticia1._id},portada:1}]})
// const Noticia3=await Noticia.findOne({$or:[{_id:{$ne:latest._id},portada:1},{_id:{$ne:Noticia1._id},portada:1},{_id:{$ne:Noticia2._id},portada:1}]})
//  if(latest){
//         if(Noticia1){ListaNoticias.push(Noticia1);}
//         if(Noticia2){ListaNoticias.push(Noticia2);}
//         if(Noticia3){ListaNoticias.push(Noticia3);}
//     }
if(latest){
    latest.reverse();
    if(latest.length>=1){
        ListaNoticias.push(latest[0]);}
    if(latest.length>=2){
        ListaNoticias.push(latest[1]);}
    if(latest.length>=3){
        ListaNoticias.push(latest[2]);}
    }
 if(!ListaNoticias){
         return res.json({error:true,mensaje:"AUN NO HAY NOTICIAS"})
     }
res.json({error:false,data: ListaNoticias})
})

//ARMA LA PORTADA REGISTRADOS
router.get('/GetPortadaR', async (req,res)=>{
    const ListaNoticias=[];

const latestr=await Noticia.find({portada:1,hide:1});
latestr.reverse();

//const Noticia1=await Noticia.findOne({_id:{$ne:latestr._id},portada:1,hide:1})
//const Noticia2=await Noticia.findOne({$or:[{_id:{$ne:latestr._id},portada:1,hide:1},{_id:{$ne:Noticia1._id},portada:1,hide:1}]})
//const Noticia3=await Noticia.findOne({$or:[{_id:{$ne:latestr._id},portada:1,hide:1},{_id:{$ne:Noticia1._id},portada:1,hide:1},{_id:{$ne:Noticia2._id},portada:1,hide:1}]})


if(latestr){
    latestr.reverse();
    if(latestr.length>=1){
        ListaNoticias.push(latestr[0]);}
    if(latestr.length>=2){
      ListaNoticias.push(latestr[1]);}
    if(latestr.length>=3){
      ListaNoticias.push(latestr[2]);}
    }
if(!ListaNoticias){
        return res.json({error:true,mensaje:"AUN NO HAY NOTICIAS"})
    }
res.json({error:false,data: ListaNoticias})
})

//AGREGAR NOTICIA
router.post('/register', multer.fotoportada, async (req,res)=>{
    const verificaIdCategoria= await Categorias.findOne({_id:req.body.id_categoria})
    if(!verificaIdCategoria){
        return res.json({
            error:true,
            mensaje:"CATEGORIA NO EXISTE" 
        })
    }
    const {id_categoria, titulo,subtitulo,descripcion,foto_portada,foto_noticia, hide, date, portada, video_noticia,tableau}=req.body;
    const New=new Noticia();
    if (req.file==null){
        New.id_categoria=id_categoria,
        New.titulo=titulo,
        New.subtitulo=subtitulo,
        New.descripcion=descripcion,
        New.foto_portada="assets/imagennotavailable.png",
        New.foto_noticia="assets/imagennotavailable.png", 
        New.portada=portada,
        New.hide=hide
        New.tableau=tableau
    }else{   
    New.id_categoria=id_categoria, 
    New.titulo=titulo,
    New.subtitulo=subtitulo,
    New.descripcion=descripcion,
    New.foto_portada=req.file.filename,
    New.foto_noticia="assets/imagennotavailable.png", 
    New.portada=portada,
    New.hide=hide
    New.tableau=tableau
    }
    
    try {
        const NoticiasDB= await New.save();
         res.json({error: false, 
             data: NoticiasDB
         })
    }
    catch (error) {
        res.json({error: true, mensaje: "no se pudo guardar", mensajeSistema: error})
    }

})
//modificar
router.post('/edit/:id', multer2.fotonoticia,async (req,res)=>{

    const id= req.params.id;
    const Editar= await Noticia.findOne({_id:id})
    if(!Editar){
        return res.json({
            error:true,
            mensaje:"NO SE ENCUENTRA NOTICIA CON ESTE ID"
        })
    }

    const {id_categoria, titulo,subtitulo,descripcion,foto_portada,foto_noticia, hide, date, portada, video_noticia,tableau}=req.body;
    if (req.file==null){
        const Actualizar = await Noticia.updateOne({_id:id},{
            id_categoria,
            titulo,
            subtitulo,
            descripcion, 
            hide,
            tableau

            })
    }else{

        const Actualizar = await Noticia.updateOne({_id:id},{
            id_categoria,
            titulo,
            subtitulo,
            descripcion,
            foto_noticia:req.file.filename, 
            hide,
            tableau
            })
    }
    

    const Modificado = await Noticia.findOne({_id:id})
    res.json({
        error:false,
        data:
        Modificado}
    );

})
router.post('/ChangePort/:id',multer.fotoportada,async (req,res)=>{
    const id= req.params.id;
    const Editar= await Noticia.findOne({_id:id})
    if(!Editar){
        return res.json({
            error:true,
            mensaje:"NO SE ENCUENTRA NOTICIA CON ESTE ID"
        })
    }

    const {id_categoria, titulo,subtitulo,descripcion,foto_portada,foto_noticia, hide, date, portada, video_noticia,tableau}=req.body;
    if (req.file!=null){

        const oldphoto=Editar.foto_portada;
        try{
            Editar.foto_portada=req.file.filename
            Editar.update();
            Editar.save();
            if(oldphoto!='assets\imagennotavailable.png'){
                await fs.unlink(path.resolve(__dirname,"../../public_html/assets/img/Fotos/"+oldphoto));
                }
            }
        catch(err){
            res.json({
                error:true,mensaje:err
            })
        }
            
    }
    

    const Modificado = await Noticia.findOne({_id:id})
    res.json({
        error:false,
        data:
        Modificado}
    );

})
//eliminar
router.delete('/DeleteNoticia/:id', async (req,res)=>{

    const id=req.params.id;
    const Aeliminar= await Noticia.findOne({_id:id});
    if(!Aeliminar){
        return res.json({
            error:true,
            mensaje: "NO SE ENCUENTRA ESTA NOTICIA"
        })
    }
    try{
    if(Aeliminar.foto_portada!='assets\imagennotavailable.png'){await fs.unlink(path.resolve(__dirname,"../../public_html/assets/img/Fotos/"+Aeliminar.foto_portada));}
    if(Aeliminar.foto_noticia!='assets\imagennotavailable.png'){await fs.unlink(path.resolve(__dirname,"../../public_html/assets/img/Fotos/"+Aeliminar.foto_noticia));}
    if(Aeliminar.video_noticia!=''){await fs.unlink(path.resolve(__dirname,"../../public_html/assets/img/PDFS/"+Aeliminar.video_noticia));}
    }catch{}
    const eliminado = await Noticia.findByIdAndDelete({_id:id})
    res.json({error: false, data: eliminado})


})

router.post('/addpdf/:id', multerpdf.archivopdf, async (req, res)=>{

    const id = req.params.id;
    console.log(id)
    const noticia = await Noticia.findOne({_id:id});
    if(!noticia){
        console.log('no encontro noticia')
        res.json({error:true, mensaje:"NO SE ENCUENTRA NOTICIA CON ESTE ID"})
    }
    if (req.file==null){
        noticia.video_noticia="";
        noticia.save();
        res.json({error:true, mensaje:"NO SE CARGO PDF"})

    }


    
    try{noticia.video_noticia=req.file.filename;
        noticia.save();
        }
    catch(error){
        res.json({error:true, mensaje:error})
    }
    res.json({error:false, mensaje:"GUARDADO CORRECTAMENTE"})
})

 router.delete('/delpdf/:id', async (req, res)=>{
     const id=req.params.id
     const noticia= await Noticia.findOne({_id:id})
     if (!noticia){
         res.json({error:true, mensaje: "NO EXISTE EL REPORTE"})
     }
    try{
        if(noticia.video_noticia!=''){
            await fs.unlink(path.resolve(__dirname,"../../public_html/assets/img/PDFS/"+noticia.video_noticia));
            noticia.video_noticia="";
            noticia.save();
        }
        }catch(err){ res.json({error:true, mensaje: "error del sistema", errores:err})}
//     const noticia = await Noticia.findOne({_id:id});
//     if(!noticia){
//         res.json({error:true, mensaje:"NO SE ENCUENTRA NOTICIA CON ESTE ID"})
//     }
//     if(!noticia.video_download){
//         res.json({error:true, mensaje:"NO SE CONTIENE PDF"})
//     }else{
//         res.json({error:false, data:noticia.video_noticia})
//     }
        res.json({error:false, mensaje: "borrado correctamente"})
     })



module.exports=router;

