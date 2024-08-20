var express = require('express');
var router = express.Router();
const MainController = require('../../controllers/frontend/category_controller')

    router.get('/:id', MainController.getProductDetail)
    
module.exports = router;