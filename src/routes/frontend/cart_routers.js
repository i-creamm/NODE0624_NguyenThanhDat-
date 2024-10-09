var express = require('express');
var router = express.Router();
const MainController = require('../../controllers/frontend/cart_controller')


    router.get('/view', MainController.getCart)

    router.post('/add/:productId', MainController.addCart)
    
module.exports = router;