var express = require('express');
var router = express.Router();
const MainController = require('../../controllers/admin/subscribe_controller')
const { asyncHandle } =  require('../../utils/asyncHandle')
  
    router.post('/sendEmail', asyncHandle (MainController.sendEmail))
  
module.exports = router;