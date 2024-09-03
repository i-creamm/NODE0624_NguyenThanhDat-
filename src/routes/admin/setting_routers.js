var express = require('express');
var router = express.Router();
const MainController = require('../../controllers/admin/setting_controller')
const { asyncHandle } =  require('../../utils/asyncHandle')

    router.get('/', asyncHandle(MainController.getAll))

    router.get('/form/:id?', asyncHandle(MainController.getForm))

    // router.get('/changeStatus/:id/:status', asyncHandle(MainController.changeStatus))

    // router.get('/changeOrdering/:id/:ordering', asyncHandle(MainController.changeOrdering))
    
    // router.post('/form/:id?', MainController.saveForm)

    // router.get('/delete/:id', asyncHandle(MainController.deleteItem))
    
module.exports = router;