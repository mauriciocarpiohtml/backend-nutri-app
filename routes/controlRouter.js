const express = require('express')
const autorizacion = require('../middlewares/Autorizacion')
const {crearControl, obtenerControles, editarControl, eliminarControl} = require('../controllers/controlesController')

// Creamos router
const controlRouter = express.Router()

// Despues ver si necesitamos un id
controlRouter.post('/:id', autorizacion, crearControl)
controlRouter.get('/:id', autorizacion, obtenerControles)
controlRouter.put('/:controlId', autorizacion, editarControl)
controlRouter.delete('/:controlId', autorizacion, eliminarControl)


module.exports = controlRouter