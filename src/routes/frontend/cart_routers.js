var express = require('express');
var router = express.Router();
const MainController = require('../../controllers/frontend/cart_controller')
const { asyncHandle } =  require('../../utils/asyncHandle')


    router.get('/view', asyncHandle(MainController.getCart))

    
module.exports = router;