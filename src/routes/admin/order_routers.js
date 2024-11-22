var express = require('express');
var router = express.Router();
const MainController = require('../../controllers/admin/order_controller')
const { asyncHandle } =  require('../../utils/asyncHandle')

    router.get('/', asyncHandle(MainController.getAll))

    router.get('/detail/:id', asyncHandle(MainController.getDetail))

    // router.get('/form/:id?', asyncHandle(MainController.getForm))

    // router.get('/changeStatus/:id/:status', asyncHandle(MainController.changeStatus))

    // router.get('/changeOrdering/:id/:ordering', asyncHandle(MainController.changeOrdering))

    // router.get('/changeIsSpecial/:id', asyncHandle(MainController.changeSpecial))
    
    // router.get('/changeNewProduct/:id', asyncHandle(MainController.changeNew))

    // router.post('/form/:id?', MainController.saveForm)

    // router.get('/delete/:id', asyncHandle(MainController.deleteItem))
    
module.exports = router;