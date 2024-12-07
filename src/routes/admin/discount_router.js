var express = require('express');
var router = express.Router();
const MainController = require('../../controllers/admin/discount_controller')
const { asyncHandle } =  require('../../utils/asyncHandle')

    router.get('/', asyncHandle(MainController.getAll))

    router.get('/form/:id?', asyncHandle(MainController.getForm))

    router.get('/detail/:id', asyncHandle(MainController.getDetail))

    router.get('/changeStatus/:id/:status', asyncHandle(MainController.changeStatus))

    
module.exports = router;