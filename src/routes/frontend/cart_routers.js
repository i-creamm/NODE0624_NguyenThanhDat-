var express = require('express');
var router = express.Router();
const MainController = require('../../controllers/frontend/cart_controller')
const { asyncHandle } =  require('../../utils/asyncHandle')

    router.post('/add/:productId', asyncHandle(MainController.addCart))
    
module.exports = router;