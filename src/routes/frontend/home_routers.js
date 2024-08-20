var express = require('express');
var router = express.Router();
const HomeController = require('../../controllers/frontend/home_controller')

router.get('/category', require('./category_routers'))
router.get('/', HomeController.getAll)
    
module.exports = router;