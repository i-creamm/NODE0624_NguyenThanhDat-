var express = require('express');
var router = express.Router();
const ItemController = require('../../controllers/item_controller')

    router.get('/', ItemController.getAll)

    router.get('/form/:id?', ItemController.getForm)

    router.get('/changeStatus/:id/:status', ItemController.changeStatus)

    router.get('/changeOrdering/:id/:ordering', ItemController.changeOrdering)
    
    router.post('/form/:id?', ItemController.saveForm)

    router.get('/delete/:id', ItemController.deleteItem)
    
module.exports = router;