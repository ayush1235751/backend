const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()


async function connectToDB(){
   try{
   await mongoose.connect(process.env.MONGO_URI)
    console.log('DateBase is Connect')
   }
   catch(error){
    console.log('DateBase is Not Connect',error)
    process.exit(1)
   }

}

module.exports = connectToDB