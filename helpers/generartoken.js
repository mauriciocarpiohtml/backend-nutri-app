const jwt = require('jsonwebtoken')

function generarJwt(id,nombre){
    // Funcion que nos permite generar un jsonwebtoken
    const token = jwt.sign({id, nombre}, process.env.SECRETO_TOKEN, {expiresIn:'30d', algorithm:'HS256' })
   
    return token
}


module.exports = generarJwt