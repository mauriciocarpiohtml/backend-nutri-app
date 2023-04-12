const mongoose = require('mongoose')

const pacienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        require:true
    },
    apellido:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true
    },
    telefono:{
        type: Number,
        require:true
    },
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'nutricionista'
    },
})


const paciente = mongoose.model('paciente', pacienteSchema)

module.exports = paciente