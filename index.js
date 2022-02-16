const express = require('express');
const mongoose = require('mongoose');
const path=require('path');
var https = require('https');
var http=require ('http');

var fs = require('fs');
const cors=require('cors');//llamo el cors


require('dotenv').config();

const app = express();
//cors SIEMPRE DSP DEL EXPRESS XQ LO OCUPA
 

//**********************************OPCION 1*************************************************** */
 var corsOptions = {
       origin:'*',
       optionsSuccessStatus:200,
       methods: "GET, PUT, POST, DELETE"
  }
  app.use(cors(corsOptions));
//**********************************OPCION 2*************************************************** */
// configurar cabeceras http
/*
app.use((req, res, next) => {
    
    res.header('Access-Control-Allow-Origin', '*');              
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 /*       
        res.setHeader('Access-Control-Allow-Origin', '*');
            // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        */
   /* next();
});*/



//**********************************OPCION 3*************************************************** */
//app.use(cors({origin: '*',credentials:true}));





//capturar body
    //app.use(bodyparser.urlencoded({extended:false}));
    //app.use(bodyparser.json());
//app.use(express.urlencoded({limit: "9091990mb", extended: true, parameterLimit:90000}));
//app.use(express.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({extended: true, limit: '10mb' }));
app.use(express.raw());

// Conexión a Base de datos
const uri=`mongodb+srv://ADser:dMZ14j5QFtYDrwVN@usql.lxhz8.mongodb.net/USQL?retryWrites=true&w=majority`


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
const NoticiasRoute=require('./routes/Noticias');
const validatetoken =require('./routes/validate-token');
const fotos =require('./routes/Fotos');
const videos =require('./routes/Videos');
const Main =require('./routes/Portada');
//rutas de vendedores
//const addpyme = require('./routes/vendedor/addpyme');

// route middlewares
app.use('/api/user', authRoutes);
app.use('/api/Categorias', CatgoriasRoute);
app.use('/api/Noticias', NoticiasRoute);
app.use('/api/Contacto', ConsultasRoute);
app.use('/api/dashboard',validatetoken,dashboard);
app.use('/api/Fotos', fotos)
app.use('/api/Videos', videos)
app.use('/api/Main', Main)
//app.use('/api/agent/addpyme', validatetoken,addpyme);



//dejo la ruta que sigue de ejemplo

//  app.get('/',(req,res)=>{
//     res.json({
//        estado:true,
//        mensaje: 'FUNCIONANDO!'
//   })
//  });
 const history= require('connect-history-api-fallback');
 app.use(history());
 app.use(express.static(path.resolve(__dirname,"../public_html")))



//iniciar server
 const PORT=process.env.PORT || 9070;
/*if(process.argv.indexOf('--prod') !== -1){
*/
/*
 const httpsServer= https.createServer({   
                        cert: fs.readFileSync(path.resolve(__dirname, "../ssl/certs/api_usql_org_e1ca5_35543_1667005188_46d63c2effe437fa921c327b533774db.crt"),'utf8'),
                        key: fs.readFileSync(path.resolve(__dirname, "../ssl/keys/e1ca5_35543_0b84d07a606409faa337aa4ec6d6d896.key"),'utf8')
                        //cert: fs.readFileSync(path.resolve(__dirname, "../ssl/certs/api_usql_org_958e1_4818f_1643327999_06a3dd808fddc16a1100465a2f35514f.crt"),'utf8'),
                        //key: fs.readFileSync(path.resolve(__dirname, "../ssl/keys/958e1_4818f_400943edd8c4d7a68fa221ffec758aa0.key"),'utf8')
                        
                        
                      },app)
 httpsServer.listen(PORT, function(){
         console.log('Servidor https correindo en el puerto: ',PORT);
     });
     */
 app.listen(PORT, ()=>{
        console.log(`servidor andando en: ${PORT}`)
    })