const mongoose = require('mongoose')

const controlSchema = mongoose.Schema({
    fecha:{
        require:true,
        type: String
    },
    pesoActual: {
        require:true,
        type: Number
    },
    biceps: {
        require:true,
        type: Number
    },
    cintura: {
        require:true,
        type: Number
    },
    cuadriceps: {
        require:true,
        type: Number
    },
    gluteos: {
        require:true,
        type: Number
    },
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'nutricionista'
    },
    paciente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'paciente'
    },
})

const control = mongoose.model('control',controlSchema )

module.exports = control