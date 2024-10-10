var express = require('express');
var router = express.Router();
const MainController = require('../../controllers/frontend/cart_controller')


    router.get('/view', MainController.getCart)

    router.post('/add/:productId', MainController.addCart)

    router.get('/delete/:productId', MainController.deleteProductInCart)

    router.get('/update/:productId/:quantity', MainController.updateProductInCart)
    
module.exports = router;