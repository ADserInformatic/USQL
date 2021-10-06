const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config();

const app = express();
//cors SIEMPRE DSP DEL EXPRESS XQ LO OCUPA
const cors=require('cors');//llamo el cors
var corsOptions = {
     origin:'*',//reemplazar con dominio, donde esta el origen del servidor del frontend
     optionsSuccessStatus:200//para algunos navegadores
}
app.use(cors(corsOptions));

//capturar body
    //app.use(bodyparser.urlencoded({extended:false}));
    //app.use(bodyparser.json());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.raw());

// Conexión a Base de datos
const uri=`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@usql.lxhz8.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`


const option={ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(uri,option)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))
//las opciones las puedo poner en el mismo, ejemplo
// mongoose.connect(uri,
//     { useNewUrlParser: true, useUnifiedTopology: true }
// )
// .then(() => console.log('Base de datos conectada'))
// .catch(e => console.log('error db:', e))



// import routes
const authRoutes = require('./routes/auth');
const dashboard =require('./routes/dashboard');
const CatgoriasRoute=require('./routes/Categorias');
const ConsultasRoute=require('./routes/Consultas');
const NoticiasRoute=require('./routes/Noticias')
const validatetoken =require('./routes/validate-token');
const fotos =require('./routes/Fotos');
//rutas de vendedores
//const addpyme = require('./routes/vendedor/addpyme');

// route middlewares
app.use('/api/user', authRoutes);
app.use('/api/Categorias', CatgoriasRoute);
app.use('/api/Noticias', NoticiasRoute);
app.use('/api/Contacto', ConsultasRoute);
app.use('/api/dashboard',validatetoken,dashboard);
app.use('/api', fotos)
//app.use('/api/agent/addpyme', validatetoken,addpyme);



//dejo la ruta que sigue de ejemplo
 app.get('/',(req,res)=>{
     res.json({
         estado:true,
        mensaje: 'FUNCIONANDO!'
    })
 });



//iniciar server

const PORT=process.env.PORT || 3001;
app.listen(PORT, ()=>{
    console.log(`servidor andando en: ${PORT}`)
})