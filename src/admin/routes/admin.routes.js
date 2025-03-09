const express = require('express')
const { registerController } = require('../controllers/auth.controllers.js')

const userRouter = express.Router()


userRouter.get('/register', registerController)


module.exports = userRouter