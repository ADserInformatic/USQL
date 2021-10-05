const router=require('express').Router();
const Consulta=require('../models/Consultas');
const Joi=require('@hapi/joi');
const nodemailer=require('nodemailer');


 const schemaConsulta=Joi.object({
     nombre:Joi.string().min(2).max(50).required(),
     correo:Joi.string().min(1).max(50).required().email(),
     consulta:Joi.string().min(1).max(50).required()
 })


 const transporter=nodemailer.createTransport({
     host : "smtp.gmail.com",
     //port : 587,
     port : 465,
     secure:true,
     auth:{
         user: 'unionsquarelearning@gmail.com',
         pass:'gohkxuidaofxrrkp'
     }
 });

 transporter.verify().then(()=>{
     console.log('listo para enviar email')
 })

 router.post('/EnviarContacto',async(req,res)=>{
try{
    const correo= await transporter.sendMail({
        from:"unionsquarelearning@gmail.com",
        to:"alijihernandez@gmail.com",
        subject:"Correo de Prueba",
        text:"TEXTO PLANO",
        html:`<b>HELLO WORLD?</b><br>
        <b>Please click on the following link, or paste this into your browser to complete the process:</b>
        <a href="www.google.com">Verification Link</a>`
       })
       res.json({
               error:false,
               ok:correo.messageId,
               "Preview URL":nodemailer.getTestMessageUrl(correo)
       })}catch(error){
                return res.status(400).json({
                    error:true
                    })
                    }


 })

module.exports=router;





// var DesdeEmail = new MailAddress("unionsquarelearning@gmail.com", "contacto");
// var HaciaEmail = new MailAddress("david@usql.org");
// var DesdeEmailPassword = "gohkxuidaofxrrkp";
// string subject = "Query of " + Form.nombre + " on the Union Square Learning page";

// string body = "<br/><br/>" + Form.consulta + "<br/><br/>" + "Answer to: " + Form.correo;

// var smtp = new SmtpClient
// {
//     Host = "smtp.gmail.com",
//     Port = 587,
//     //Port = 465,
//     EnableSsl = true,
//     DeliveryMethod = SmtpDeliveryMethod.Network,
//     UseDefaultCredentials = false,
//     Credentials = new NetworkCredential(DesdeEmail.Address, DesdeEmailPassword)
// };
