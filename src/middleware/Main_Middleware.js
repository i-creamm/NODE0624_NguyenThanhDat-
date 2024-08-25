const MainService = require('../services/menu_service')
const CategoryService = require('../services/category_service')

    const fetchMenusAndCategories  = async (req, res, next) => {
        try {
            const menus = await MainService.getAllOrderingAndStatus()
            for (let menu of menus) {
                menu.categories = await CategoryService.getCategoryByMenuId(menu._id);
            }
            res.locals.menus = menus
            next()
        } catch (error) {
            next(error)
        }
    }

module.exports = {
    fetchMenusAndCategories
}