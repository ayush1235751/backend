const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: [true,'the username already exists'],
        required: true,
    },
    email:{
        type: String,
        unique: [true,'email already exists'],
        required: [true,'Email address is required'],
        match: [/^.+@(?:[\w-]+\.)+\w+$/, 'Please enter a valid email address']
    },
    password:{
        type: String,
        required: [true,'password is required'],
        select : false 
    }
})



userSchema.pre('save', async function () {
    if (!this.isModified('password')) return

    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
})

userSchema.methods.userpassword = async function(password){
   return await bcrypt.compare(password, this.password)
}

const usermodel = mongoose.model('User', userSchema)

module.exports = usermodel