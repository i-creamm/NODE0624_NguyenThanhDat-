var express = require('express');
var router = express.Router();
const MainController = require('../../controllers/admin/contact_controller')
const { asyncHandle } =  require('../../utils/asyncHandle')

    router.get('/', asyncHandle(MainController.getContact))

    router.post('/save', asyncHandle(MainController.save))

    router.get('/detail/:id', asyncHandle(MainController.detailContact))
    
module.exports = router;