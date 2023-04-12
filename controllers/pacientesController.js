const paciente = require('../models/PacienteModel')

async function agregarPacientes(req,res){
//para crear un paciente necesito comprobar algo ? No 
try {
    const pacienteAlmacenado =  new paciente(req.body)
    pacienteAlmacenado.doctor = req.nutricionista._id 
    await pacienteAlmacenado.save()
    res.status(200).json(pacienteAlmacenado)
    return
} catch (error) {
    console.log(error)
}
}

// Solo traeme los pacientes de ese doctor
async function obtenerPacientes(req,res){
    const pacientes = await paciente.find().where('doctor').equals(req.nutricionista)
    res.status(200).json({pacientes})
}

// buscar un solo paciente
async function datosPaciente(req,res){
    const {id} = req.params
    const datos = await paciente.findById(id)

    if(!datos){
        res.status(404).json({msg:'Paciente no encontrado'})
    }
    try {
        res.status(200).json(datos)
    } catch (error) {
        console.log(error)
    }
}

async function editarPaciente(req,res){
    const {id} = req.params
    const datos = await paciente.findById(id)

    if(!datos){
       return res.status(404).json({msg:'Paciente no encontrado'})
    }
        datos.nombre = req.body.nombre || datos.nombre
        datos.apellido = req.body.apellido || datos.apellido
        datos.email = req.body.email || datos.email
        datos.telefono = req.body.telefono || datos.telefono
    try {
        const datosEditados = await datos.save()
         res.status(200).json(datosEditados)
    } catch (error) {
        console.log(error)
    }
}

async function eliminarPaciente(req,res){
    const {id} = req.params
    const datos = await paciente.findById(id)

    if(!datos){
      return  res.status(404).json({msg:'Paciente no encontrado'})
    }
    try {
        await datos.deleteOne()
        res.json({msg: "Paciente eliminado", datos})
    } catch (error) {
        console.log(error)
    }
}

module.exports= {agregarPacientes, obtenerPacientes, datosPaciente, editarPaciente, eliminarPaciente}