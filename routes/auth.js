const router = require('express').Router();

//importo User de User.js
const User=require('../models/User');
//importo bcrypt 
const bcrypt=require('bcrypt');
//importo jwt 
const jwt=require('jsonwebtoken');


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
    NicknameEmail: Joi.string().min(2).max(255).required(),
    password: Joi.string().min(6).max(1024).required()
})

//REGISTRO
router.post('/register', async (req, res) => {
    const {error}=schemaRegister.validate(req.body);
    if (error){
       return res.status(400).json({error: error.details[0].message})
    }

    const existemail=await User.findOne({email:req.body.email})//true si existe
    if(existemail){return res.status(400).json({error: true,mensaje:"El email ya se encuentra registrado"})}

    const existenickname=await User.findOne({nickname:req.body.nickname})//true si existe
    if(existenickname){return res.status(400).json({error: true,mensaje:"El nickname"+req.body.nickname+" ya se encuentra registrado"})}

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
        res.status(400).json({error})
    }

})

//LOGIN
router.post('/Login', async (req, res) => {
    const {error}=schemaLogin.validate(req.body);
    if (error){
       return res.status(400).json({error: "error validacion",mensaje: error.details[0].message})}
    
    var existe;

    existe=await User.findOne({email:req.body.NicknameEmail})//true si existe
    if(!existe){
        existe=await User.findOne({nickname:req.body.NicknameEmail})//true si existe
        if(!existe){return res.status(400).json({error: true,mensaje:"email o nickname invalid"})
                    }
    }


  
    const comparepassword=await bcrypt.compare(req.body.password, existe.password)//true si existe
    if(!comparepassword){return res.status(400).json({error: true,mensaje:"password invalid"})}
    if(existe.active==false){return res.status(400).json({error: true,mensaje:"the user is not active"})}
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

    res.header('auth-token', token).json({
            user_id: existe._id,
            rol: existe.rol,
            nickname: existe.nickname      
    })

})

//DEVUELVE USUARIOS
router.get('/GetUsers', async (req,res)=>{
    const AllUsers = await User.find();
    res.json({
        error:false,
        data: AllUsers
    })
})

//DEVUELVE USUARIO con ID
router.get('/Perfil/:id', async (req,res)=>{
    const id=req.params.id;

    const OnlyUser = await User.findOne({_id:id});
    if(!OnlyUser){
        return res.status(400).json({error: "NO SE ENCONTRO USUARIO"})
    }
    res.json({
        error:false,
        data: OnlyUser
    })
})

// MODIFICAR                   falta encriptar password
router.post('/Modificar/:id', async (req, res)=>{
    const id=req.params.id;
    const Amodificar=User.findOne({_id:id});
    if(!Amodificar){
        return res.status(400).json({error: "NO SE ENCONTRO USUARIO"})
    }
    const VerificaEmail=User.findOne({email:req.body.email});
    const VerificaNickname=User.findOne({nickname:req.body.nickname});
    if(Amodificar._id!=VerificaNickname._id){return res.status(400).json({error: "El nickname ya se encuentra registrado"})}
    if(Amodificar._id!=VerificaEmail._id){return res.status(400).json({error: "El email ya se encuentra registrado"})}
    
    
    //************************************************************************************* */
    
     
    //ENCRIPTAR PASSSWORD
    const {nickname,email,password,rol, nombre, apellido}=req.body;
    const saltos= await bcrypt.genSalt(10);
     const passwordbody=await bcrypt.hash(password, saltos);
    const Actualizado= await User.updateOne({_id:id},{nickname,email,passwordbody,rol, nombre, apellido})
    const modificado = await User.findOne({_id:id});
    res.json({"ok":modificado})
})


//LOGOUT                       falta sacar del localstorage

router.get('/Logout',async (req,res)=>{
    var existe;
    existe=await User.findOne({nickname:req.body.nickname})
    if(!existe){
        return res.status(400).json({error:true, mensaje: "no existe el usuario"})
    }
    //SACAR DEL LOCALSTORAGE
})
module.exports = router;

