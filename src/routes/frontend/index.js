var express = require('express');
var router = express.Router();
const MainService = require('../../services/menu_service')
const CategoryService = require('../../services/category_service')

router.use(async (req , res , next) => {
    const menus = await MainService.getAllOrderingAndStatus()
    for (let menu of menus) {
        menu.categories = await CategoryService.getCategoryByMenuId(menu._id);
    }
    res.locals.menus = menus
    next()
})

router.use('/', require('./home_routers'))

module.exports = router