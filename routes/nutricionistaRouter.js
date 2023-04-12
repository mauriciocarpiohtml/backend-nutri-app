const express = require('express')
const {crearUsuario, iniciarSesion, perfil} = require('../controllers/nutricionistaController')
const autorizacion = require('../middlewares/Autorizacion')

const nutricionistaRouter= express.Router()

nutricionistaRouter.post('/', crearUsuario)
nutricionistaRouter.post('/login', iniciarSesion)
nutricionistaRouter.get('/perfil', autorizacion, perfil)


module.exports = nutricionistaRouter