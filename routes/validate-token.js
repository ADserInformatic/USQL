//import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');




const verifyToken = (req, res, next) => { //next quiere decir q va a ir a la ruta 
    const token = req.header('auth-token')

    //si el no envia el token al ingresar a ruta retorno que no puede acceder
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next() // continuamos
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}

module.exports = verifyToken;