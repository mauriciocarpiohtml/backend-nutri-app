const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const conectarDB = require('./db/mongoose')
const nutricionistaRouter = require('./routes/nutricionistaRouter')
const pacientesRouter = require('./routes/PacientesRouter')
const controlRouter = require('./routes/controlRouter')

const app = express()
const port = process.env.URL

dotenv.config()

//Procesar info de tipo json()
app.use(express.json())

// Conectar con db
conectarDB()

// Aceptar cors
app.use(cors())

// Rutas
app.use('/', (req, res) =>{
  res.json({msg: "Conectado de forma exitosa"})
})
app.use('/api/usuarios', nutricionistaRouter )
app.use('/api/pacientes', pacientesRouter )
app.use('/api/controles', controlRouter)

app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`)
})