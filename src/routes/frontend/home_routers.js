var express = require('express');
var router = express.Router();
const HomeController = require('../../controllers/home_controller')

router.get('/', HomeController.getAll)
    
module.exports = router;