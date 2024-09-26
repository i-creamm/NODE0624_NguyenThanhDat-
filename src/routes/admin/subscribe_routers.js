var express = require('express');
var router = express.Router();
const MainController = require('../../controllers/admin/subscribe_controller')
const { asyncHandle } =  require('../../utils/asyncHandle')
  
    router.get('/', asyncHandle(MainController.getAllEmail)) 

    router.get('/form/:id?', asyncHandle(MainController.getForm))

    router.post('/sendEmail/:id?', asyncHandle (MainController.saveEmailAndSendIt))

    router.get('/delete/:id', asyncHandle(MainController.deleteItem))
  
module.exports = router;