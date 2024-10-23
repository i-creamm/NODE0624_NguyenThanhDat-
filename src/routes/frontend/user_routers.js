var express = require('express');
var router = express.Router();
const MainController = require('../../controllers/frontend/user_controller')
const validate = require("../../validation/frontend/user_validates")
const { asyncHandle } =  require('../../utils/asyncHandle')

    router.get('/register', asyncHandle(MainController.getRegisterForm))

    router.get('/login', asyncHandle(MainController.getLoginForm))

    router.get('/logout', asyncHandle(MainController.getLogOut))

    router.post('/register', validate.registerPost, asyncHandle(MainController.registerPost))

    router.post('/login', validate.loginPost, asyncHandle(MainController.LoginPost))

    router.get('/password/forgot', asyncHandle(MainController.forgotPassword))

    router.post('/password/forgot', asyncHandle(MainController.forgotPasswordPost))


module.exports = router;