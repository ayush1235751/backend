const express = require('express')
const { RegisterUserController, loginUserController, logoutUserController,getMeController } = require('../controller/auth.controller')
const authMiddleware = require('../middleware/auth.midlleware')
const authRoutes = express.Router()

/**
 * @route POST /api/auth/register
 * @description Register the new user
 * @access Public
 */

authRoutes.post('/register', RegisterUserController )

/**
 * @route POST /api/auth/login
 * @description Login the with emai & password
 * @access Public
 */


authRoutes.post('/login', loginUserController)


/**
 * @route GET /api/auth/logout
 * @description Logout the user 
 * @access Public
 */

authRoutes.get('/logout',logoutUserController)


/**
 * @route GET /api/auth/get-me
 * @description get the cuurent logged in user details
 * @access Private
 */

authRoutes.get('/get-me',authMiddleware.authUser,getMeController)

module.exports = authRoutes