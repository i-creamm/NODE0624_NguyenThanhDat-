var express = require('express');
var router = express.Router();
const MainController = require('../../controllers/frontend/user_controller')
const { asyncHandle } =  require('../../utils/asyncHandle')

    router.get('/register', asyncHandle(MainController.getRegisterForm))

    router.get('/login', asyncHandle(MainController.getLoginForm))

module.exports = router;