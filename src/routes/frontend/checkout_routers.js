var express = require('express');
var router = express.Router();
const MainController = require('../../controllers/frontend/checkout_controller')
const { asyncHandle } =  require('../../utils/asyncHandle')

    // router.use((req, res, next) => {
    //     let token = req.cookies.tokenUser
    //     if(token){
    //         next()
    //     } else {
    //         res.redirect("/user/login")
    //     }
    // })

    router.get('/info', asyncHandle(MainController.getCheckout))

    router.post('/order', asyncHandle(MainController.orderDetail))

    router.get('/success/:orderId', asyncHandle(MainController.success))
    
module.exports = router;