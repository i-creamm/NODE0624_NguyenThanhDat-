var express = require('express');
var router = express.Router();
const {fetchMenusAndCategories} = require('../../middleware/Main_Middleware')
const userMiddleware = require("../../middleware/frontend/user_middleware")

router.use(fetchMenusAndCategories);
router.use(userMiddleware.userInfo);

router.use('/', require('./home_routers'))

router.use('/cart', require('./cart_routers'))

router.use('/checkout', require('./checkout_routers'))

router.use('/user', require('./user_routers'))

module.exports = router