var express = require('express');
var router = express.Router();
const MainController = require('../../controllers/frontend/cart_controller')
const { asyncHandle } =  require('../../utils/asyncHandle')


    router.get('/view', asyncHandle(MainController.getCart))

    router.post('/add/:productId', asyncHandle(MainController.addCart))

    router.get('/delete/:productId', asyncHandle(MainController.deleteProductInCart))

    router.get('/update/:productId/:quantity', asyncHandle(MainController.updateProductInCart))
    
module.exports = router;