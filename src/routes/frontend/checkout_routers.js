var express = require('express');
var router = express.Router();
const MainController = require('../../controllers/frontend/checkout_controller')
const { asyncHandle } =  require('../../utils/asyncHandle')

const {infoUserCheckout} = require('../../validation/frontend/user_validates')

    router.get('/info', asyncHandle(MainController.getCheckout))

    // router.post('/info', asyncHandle(MainController.test))

    router.post('/order', asyncHandle(MainController.orderDetail))

    router.get('/success/:orderId', asyncHandle(MainController.success))
    
module.exports = router;