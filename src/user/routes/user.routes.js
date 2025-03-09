const express = require('express')
const authMiddleware = require('../../middlewares/auth.middlewares.js');
const { registerController, loginController, refreshTokenController, sendVerificationController } = require('../controllers/auth.controllers.js')
const { registerSchema, loginSchema, refreshTokenSchema, sendVerificationSchema } = require("../validations/authValidation");
const { getProfile, updateProfile, myProducts } = require('../controllers/profile.controllers.js');
const validate = require('../../middlewares/validate.js');

const userRouter = express.Router()


userRouter.post("/register", validate(registerSchema), registerController);
userRouter.post("/login", validate(loginSchema), loginController);
userRouter.post("/refresh-token", validate(refreshTokenSchema), refreshTokenController);
userRouter.post("/send-verification", validate(sendVerificationSchema), sendVerificationController);

userRouter.get("/profile", authMiddleware, getProfile);
userRouter.put("/profile", authMiddleware, updateProfile);

userRouter.get("/my-products", authMiddleware, myProducts);



module.exports = userRouter;