var express = require('express');
var router = express.Router();
const CategoryController = require('../../controllers/admin/category_controller')

router.get('/', CategoryController.getAllCategory)

router.get('/formCategory/:id?', CategoryController.getFormCategory)

router.post('/formCategory/:id?', CategoryController.saveFormCategory)


module.exports = router;