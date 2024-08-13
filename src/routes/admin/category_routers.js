var express = require('express');
var router = express.Router();
const MainController = require('../../controllers/admin/category_controller')

    router.get('/', MainController.getAll)

    router.get('/form/:id?', MainController.getForm)

    router.get('/changeStatus/:id/:status', MainController.changeStatus)
    
    router.post('/form/:id?', MainController.saveForm)

    router.get('/delete/:id', MainController.deleteItem)
    
module.exports = router;