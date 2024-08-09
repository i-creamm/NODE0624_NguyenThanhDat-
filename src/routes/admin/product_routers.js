var express = require('express');
var router = express.Router();
const ProductController = require('../../controllers/admin/product_controller')

router.get('/', ProductController.getAllProduct)

router.get('/formProduct/:id?', ProductController.getFormProduct)

router.post('/formProduct/:id?', ProductController.saveFormProduct)


module.exports = router;