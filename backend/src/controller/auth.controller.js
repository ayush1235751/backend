const usermodel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const emailService = require('../services/email.service.js')
const dotenv = require('dotenv')
const tokenblacklistModel = require('../models/blacklist.model.js')
dotenv.config()



async function RegisterUserController(req,res){
    try{
        const {username,email,password} = req.body

        if(!username || !email || !password ){
            return res.status(400).json({
                Message : 'please provide username,email,password'
            })
        }


        const existingUser = await usermodel.findOne({
            $or : [{username}, {email}]
        })

        if (existingUser) {
            if (existingUser.username === username) {
               return res.status(400).json({
                  message: "Username already existss"
               }) 
            }
         
            if (existingUser.email === email) {
               return res.status(400).json({
                  message: "Email already exists"
               })
            }
         }


         const user =  await usermodel.create({
            username,
            email,
            password
         })

         if (!process.env.JWT_KEY) {
            throw new Error('JWT_KEY not set in environment variables');
         }

         const token = jwt.sign({UserID:user._id},"tF2sP5qmGYMx0jAaR65q5gJXGh4RuNDU")

         res.cookie('token', token, { httpOnly: true })
         
         await emailService.sendRegistrationEmail(email, username);
      
         res.status(201).json({
            message : 'user is created successfully',
            userinfo : {
                id: user._id,
                username: user.username,
                email: user.email
            }
         })

    
    }
    catch(error){
        console.error('Register error:', error);
        res.status(500).json({
            message: 'Registration failed',
            error: error.message
        });
    }
}

async function loginUserController(req,res){
   try{
  const {email,password} = req.body

  if(!email || !password){
   return res.status(400).json({
      message : 'please provide the email and password'
   })
  }

  const existingUser = await usermodel.findOne({email}).select("+password")

  if(!existingUser){
   return  res.status(400).json({
 message : 'User Not Found'
   })
  }
  const isvalidpassword = await existingUser.userpassword(password);

  if(!isvalidpassword){ 
   return res.status(401).json({
      message : 'Password is not Match please check the password and try again'
   })
  }

  const token = jwt.sign({UserID:existingUser._id},"tF2sP5qmGYMx0jAaR65q5gJXGh4RuNDU");

  res.cookie('token',token);

  res.status(200).json({
   user:{
      message : 'User Login Successfull',
      email : existingUser.email,
      username : existingUser.username,
      token : token
   }
  })

   }
   catch(error){
      console.error('Login error:', error);
      res.status(500).json({
         message: 'Login failed',
         error: error.message
      });
   }
}


async function logoutUserController(req,res){
   const token = req.cookies.token

   if(token){
  await tokenblacklistModel.create({token})
   }

   res.clearCookie('token')

   res.status(200).json({
      message : 'user logged out seccessfully'
   })
}


async function getMeController(req,res){
   const user = await usermodel.findById(req.user.id)

   res.status(200).json({
      message : 'user detalis successfully',
      user:{
      id : user._id,
      email : user.email,
      username : user.username
      }
   })
}

module.exports = {
   RegisterUserController,
   loginUserController,
   logoutUserController,
   getMeController
} 