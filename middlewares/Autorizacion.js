const jwt = require('jsonwebtoken')
const nutricionista = require('../models/NutricionistaModel')
// va a checkear que el usuario este autenticado


async function checkAut(req, res, next){
    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            // hacemos esto para sacar la palabra bearer 
            token = req.headers.authorization.split(" ")[1]
            const decodificado = jwt.verify(token, process.env.SECRETO_TOKEN)
            
            // esto que esta aca lo podemos usar en cualquier lugar para verificar que usuario
            // es el que esta autenticado
            req.nutricionista = await nutricionista.findById(decodificado.id).select('-password -confirmado -token -createdAt -updatedAt -__v')
            return next()
        } catch (error) {
            return res.status(404).json({msg: error})
        }
    }
    
    if(!token){
        const error = new Error('Token no encontrado')
       return res.status(404).json({msg: error.message})
    }
    next()
}

module.exports = checkAut