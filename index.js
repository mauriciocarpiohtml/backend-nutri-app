const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const conectarDB = require('./db/mongoose')
const nutricionistaRouter = require('./routes/nutricionistaRouter')
const pacientesRouter = require('./routes/PacientesRouter')
const controlRouter = require('./routes/controlRouter')

const app = express()

dotenv.config()

const PORT = process.env.PORT
//Procesar info de tipo json()
app.use(express.json())

// Conectar con db
conectarDB()

// Aceptar cors
app.use(cors())

// Rutas
app.use('/api/usuarios', nutricionistaRouter )
app.use('/api/pacientes', pacientesRouter )
app.use('/api/controles', controlRouter)

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`)
})