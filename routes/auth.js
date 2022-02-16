const router = require('express').Router();

//importo User de User.js
const User=require('../models/User');
//importo bcrypt 
const bcrypt=require('bcrypt');
//importo jwt 
const jwt=require('jsonwebtoken');
// const {LocalStorage}=require('node-localstorage');


//validaciones del modelo
const Joi=require('@hapi/joi');
//validaciones para register
const schemaRegister=Joi.object({
    nickname: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(4).max(1024).required(),
    rol: Joi.string().min(0).max(4).required(),
    nombre: Joi.string().min(2).max(255).required(),
    apellido: Joi.string().min(2).max(255).required(),
       
})


//validaciones para login
const schemaLogin=Joi.object({
    email: Joi.string().min(2).max(255).required(),
    password: Joi.string().min(6).max(1024).required()
})

//REGISTRO
router.post('/register', async (req, res) => {
    // const {error}= schemaRegister.validate(req.body.nickname, req.body.email, req.body.password, req.body.rol, req.body.apellido, req.body.nombre);
    // if (error){
    //    return res.json({error:true, mensaje: "Error validation", peticion: req.body.email})
    // }

    const existemail=await User.findOne({email:req.body.email})//true si existe
    if(existemail){return res.json({error: true,mensaje:"EMAIL REGISTRADO"})}

    const existenickname=await User.findOne({nickname:req.body.nickname})//true si existe
    if(existenickname){return res.json({error: true,mensaje:"NICKNAME REGISTRADO"})}

    //encripto la contraseña
    const saltos= await bcrypt.genSalt(10);
    const passwordbody=await bcrypt.hash(req.body.password, saltos);


    const user=new User({
        nickname: req.body.nickname,
        email: req.body.email,
        password: passwordbody,
        rol: req.body.rol,       
        nombre: req.body.nombre,
        apellido: req.body.apellido
    });
    try {
        const userDB = await user.save();
        res.json({
            // error: null,
            // data: userDB
            mensaje: userDB
        })
        
    } catch (error) {
        res.json({error:true, mensaje: error})
    }

})

//LOGIN
router.post('/Login', async (req, res) => {
    const {error}=schemaLogin.validate(req.body);
    if (error){
       return res.json({resultado: 0,mensaje:"error validation"})}
    
    var existe;

    existe=await User.findOne({email:req.body.email})//true si existe
    if(!existe){
        existe=await User.findOne({nickname:req.body.email})//true si existe
        if(!existe){return res.json({resultado: 0,mensaje:"email o nickname invalid"})
                    }
    }


  
    const comparepassword=await bcrypt.compare(req.body.password, existe.password)//true si existe
    if(!comparepassword){return res.json({resultado: 0,mensaje:"password invalid"})}

    if(existe.active==false){
        return res.json({resultado: 0,mensaje:"the user is not active"})}

    
    // const token= jwt.sign({
    //     id : existe._id,
    //     nickname  : existe.nickname,   
    //     email: existe.email,
    //     rol: existe.rol   
    // },process.env.TOKEN_SECRET)

    // res.json ({
    //     error: false,
    //     message: "adentro",
    //     token: token
    // })
   //if(existe.rol==0){localStorage.setItem('resultado',0)}else{localStorage.setItem('resultado',1)}
    // var localstorage=new LocalStorage('./scratch');
    // localStorage.setItem('resultado', existe.rol) 

    res.json({
        resultado: 1,
        datos:
            existe
            // user_id: existe._id,
            // rol: existe.rol,
            // nickname: existe.nickname }     
    })

})

//DEVUELVE USUARIOS
router.get('/GetUsers', async (req,res)=>{
    const AllUsers = await User.find();
    res.json(AllUsers)
})

//DEVUELVE USUARIO con ID
router.get('/Perfil/:id', async (req,res)=>{
    const id=req.params.id;

    const OnlyUser = await User.findOne({_id:id});
    if(!OnlyUser){
        return res.json({error:true,mensaje: "NO SE ENCONTRO USUARIO"})
    }

    res.json({
        error:false,
        data: OnlyUser
    })
})

// MODIFICAR                   falta encriptar password
router.post('/Modificar/:id', async (req, res)=>{
    const id=req.params.id;
    const Amodificar=await User.findOne({_id:id});
    if(!Amodificar){
        return res.json({error:true,mensaje: "NO SE ENCONTRO USUARIO"})
    }
    
    const VerificaEmail=await User.findOne({email:req.body.email});
    if(VerificaEmail){

        if (id != VerificaEmail._id){
            console.log('email registrado')
            return res.json({error: true,mensaje:"EMAIL REGISTRADO"})
        }
    }
    const VerificaNickname=await User.findOne({nickname:req.body.nickname});
    if(VerificaNickname){if(id!=VerificaNickname._id){
        console.log('nickname registrado')
        return res.json({error: true,mensaje:"NICKNAME REGISTRADO"})}}

    

    
    
    
    
    //************************************************************************************* */
    
     
    //ENCRIPTAR PASSSWORD
    const {nickname,email,password,rol, nombre, apellido}=req.body;
    const saltos= await bcrypt.genSalt(10);
     const passwordbody=await bcrypt.hash(password, saltos);
    const Actualizado= await User.updateOne({_id:id},{nickname,email,passwordbody,rol, nombre, apellido})
    const modificado = await User.findOne({_id:id});
    res.json({error:false, data:modificado,peticion:req.body})
})


//LOGOUT                       falta sacar del localstorage

router.get('/Logout/:id',async (req,res)=>{
    var existe;
    const id=req.params.id;
    //nodeStorage.removeItem('resultado')
    existe=await User.findOne({_id:id})
    if(!existe){
        return res.status(400).json({error:true, mensaje: "no existe el usuario"})
    }
    res.json({
        resultado:0
    })
    //SACAR DEL LOCALSTORAGE
})
module.exports = router;

//eliminar
router.delete('/DelUser/:id', async (req,res)=>{

    const id=req.params.id;
    const Aeliminar= await User.findOne({_id:id});
    if(!Aeliminar){
        return res.json({
            error:true,
            mensaje: "NO SE ENCUENTRA ESTE USUARIO"
        })
    }
    const eliminado = await User.findByIdAndDelete({_id:Aeliminar._id})
    res.json({error: false, data: eliminado})


})