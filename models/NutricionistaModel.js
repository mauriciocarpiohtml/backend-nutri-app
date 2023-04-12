const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const nutricionistaSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true
    },
    apellido:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
 },{
    timestamps:true
 })

 
// Hashear password
    nutricionistaSchema.pre('save', async function(next){
        // este codigo de aca lo que hace es evitar que se hashee lo hasheado jajaja
        if(!this.isModified('password')){
            next()
        }
        const salt = await bcrypt.genSalt(10)
                        // cadena sin hashear   // cadena hasheada
        this.password = await bcrypt.hash(this.password, salt)
    })

    nutricionistaSchema.methods.comprobarPassword = async function(passwordFormulario){
        return await bcrypt.compare(passwordFormulario, this.password)
    }

 const nutricionista = mongoose.model('nutricionista',nutricionistaSchema )


 module.exports = nutricionista