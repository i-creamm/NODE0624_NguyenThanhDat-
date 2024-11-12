var express = require('express');
var router = express.Router();

// router.use((req, res, next) => {
//     let token = req.cookies.tokenUser
//     if(token){
//         next()
//     } else {
//         res.redirect("/login")
//     }
// })

router.use('/item',require('./item_routers'))
router.use('/',require('./dashboard_router'))
router.use('/product',require('./product_routers'))
router.use('/category',require('./category_routers'))
router.use('/menu',require('./menu_router'))
router.use('/slider',require('./slider_routers'))
router.use('/setting',require('./setting_routers'))
router.use('/brand',require('./brand_routers'))
router.use('/subscribe',require('./subscribe_routers'))

module.exports = router