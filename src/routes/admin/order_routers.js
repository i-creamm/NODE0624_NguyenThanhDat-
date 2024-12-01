var express = require('express');
var router = express.Router();
const MainController = require('../../controllers/admin/order_controller')
const { asyncHandle } =  require('../../utils/asyncHandle')

    router.get('/', asyncHandle(MainController.getAll))

    router.get('/detail/:id', asyncHandle(MainController.getDetail))

    
module.exports = router;