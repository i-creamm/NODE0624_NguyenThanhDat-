const MainService = require('../services/menu_service')
const CategoryService = require('../services/category_service')

class Middleware {
    header = async (req, res, next) => {
        const menus = await MainService.getAllOrderingAndStatus()
        for (let menu of menus) {
            menu.categories = await CategoryService.getCategoryByMenuId(menu._id);
        }
        res.locals.menus = menus
        next()
    }
}


module.exports = new Middleware();