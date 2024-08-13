var express = require('express');
var router = express.Router();
const HomeController = require('../../controllers/frontend/home_controller')

router.get('/:slug', HomeController.getProductDetail)
router.get('/', HomeController.getAll)
    
module.exports = router;