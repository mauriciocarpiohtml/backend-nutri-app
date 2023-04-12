const mongoose = require('mongoose')

async function conectarDB(){
    try{
        const conectar = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser:true,
            useUnifiedTopology :true
        })
        console.log('Conexion exitosa')
    }
    catch(err){
        console.log(err)
    }
}

module.exports= conectarDB