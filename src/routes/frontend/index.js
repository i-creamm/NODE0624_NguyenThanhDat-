var express = require('express');
var router = express.Router();
const {fetchMenusAndCategories} = require('../../middleware/Main_Middleware')


router.use(fetchMenusAndCategories);

router.use('/', require('./home_routers'))

module.exports = router