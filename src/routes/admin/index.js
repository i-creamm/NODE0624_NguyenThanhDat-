var express = require('express');
var router = express.Router();

router.use('/item',require('./item_routers'))
router.use('/',require('./dashboard_router'))
router.use('/product',require('./product_routers'))
router.use('/category',require('./category_routers'))
router.use('/menu',require('./menu_router'))
router.use('/slider',require('./slider_routers'))
router.use('/setting',require('./setting_routers'))
router.use('/brand',require('./brand_routers'))

module.exports = router