var express = require('express');
var router = express.Router();
const MainController = require('../../controllers/frontend/checkout_controller')
const { asyncHandle } =  require('../../utils/asyncHandle')

    router.get('/info', asyncHandle(MainController.getCheckout))

    router.post('/order', asyncHandle(MainController.order))

    router.get('/success/:orderId', asyncHandle(MainController.success))
    
module.exports = router;