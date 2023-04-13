const control = require('../models/ControlModel')

async function crearControl(req, res){
const {id} = req.params

try {
    const controlAlmacenado = new control(req.body)
    controlAlmacenado.doctor = req.nutricionista._id
    controlAlmacenado.paciente = id
    await controlAlmacenado.save()
    console.log(controlAlmacenado)
    res.status(200).json(controlAlmacenado)

} catch(error){
    console.log(error)
}
}



async function obtenerControles(req, res) {
    const { id } = req.params;
    const controlesPaciente = await control.find({
        doctor: req.nutricionista._id,
        paciente: id
    }).populate('paciente');

    if (controlesPaciente) {
        res.status(200).json(controlesPaciente)
    } else {
        res.status(404).json({
            mensaje: 'No se encontraron controles para el paciente especificado.'
        });
    }
}

async function editarControl(req, res){
    const {controlId} = req.params
    const controlEditar = await control.findById(controlId)
    if(!controlEditar){
        res.status(404).json({msg: 'Control no encontrado'})
        return
    }
    controlEditar.fecha = req.body.fecha || controlEditar.fecha
    controlEditar.pesoActual = req.body.pesoActual || controlEditar.pesoActual
    controlEditar.biceps = req.body.biceps || controlEditar.biceps
    controlEditar.cintura = req.body.cintura || controlEditar.cintura
    controlEditar.cuadriceps = req.body.cuadriceps || controlEditar.cuadriceps
    controlEditar.gluteos = req.body.gluteos || controlEditar.gluteos

    try{
        const datosEditados = await controlEditar.save()
        res.status(200).json(datosEditados)
    } catch(error){
        console.log(error)
    }
}

async function eliminarControl(req, res){
    const {controlId} = req.params
    const controlEliminar = await control.findById(controlId)
    if(!controlEliminar){
       return res.status(404).json({msg: 'Control no encontrado'})
    }
    try{
        await controlEliminar.deleteOne()
        res.json({msg:"Control eliminado", controlEliminar})
    } catch(error){
        console.log(error)
    }
}


module.exports={crearControl, obtenerControles, editarControl, eliminarControl}