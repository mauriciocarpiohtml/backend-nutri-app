const express = require('express')
const autorizacion = require('../middlewares/Autorizacion')
const {agregarPacientes, obtenerPacientes, datosPaciente,
     editarPaciente, eliminarPaciente} = require('../controllers/pacientesController')


const pacientesRouter = express.Router()

pacientesRouter.post('/', autorizacion, agregarPacientes)
pacientesRouter.get('/', autorizacion, obtenerPacientes)

pacientesRouter.get('/:id', autorizacion, datosPaciente)
pacientesRouter.put('/:id', autorizacion, editarPaciente)
pacientesRouter.delete('/:id', autorizacion, eliminarPaciente)


module.exports = pacientesRouter