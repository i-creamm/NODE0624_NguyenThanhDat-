var express = require('express');
var router = express.Router();
const MainController = require('../../controllers/admin/user_controller')
const { asyncHandle } =  require('../../utils/asyncHandle')

    router.get('/', asyncHandle(MainController.getAll))

    router.get('/detail/:id', asyncHandle(MainController.getDetail))

    router.get('/changeStatus/:id/:status', asyncHandle(MainController.changeStatus))

    router.get('/delete/:id', asyncHandle(MainController.deleteItem))

    
module.exports = router;