const nutricionista = require('../models/NutricionistaModel')
const generarJwt = require('../helpers/generartoken')

// Al crear un usuario tengo que validar que :
// No exista en la base de datos

async function crearUsuario(req,res){
const {email} = req.body
// evaluar si el usuario existe
const usuarioDuplicado = await nutricionista.findOne({email})

    if(usuarioDuplicado){
    return res.status(403).json({msg: 'Usuario ya registrado'})
    }
    try {
        const usuario = new nutricionista(req.body)
       await usuario.save()
    return res.status(201).json({msg: 'Usuario creado correctamente'})
    } catch (error) {
        console.log(error)
    }
}

// Hay que ver si el usuario esta registrado
// Hay que ver si la clave es igual a la de la base de datos
async function iniciarSesion(req,res){

    const {email, password} = req.body 
    const usuario = await nutricionista.findOne({email})

    if(!usuario){
        return res.status(404).json({msg:'El usuario no existe, por favor crea una cuenta'})
    }

    // Validar que la clave sea correcta
    if(await usuario.comprobarPassword(password)){
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJwt(usuario._id, usuario.nombre)
        })
    
    } else{
        return res.status(403).json({msg: 'La clave es incorrecta'})
    }

}

async function perfil(req,res){
    try{
        res.status(200).json(req.nutricionista)
    }
    catch(error){
        console.log(error)
    }
    
}


module.exports={ crearUsuario, iniciarSesion, perfil }