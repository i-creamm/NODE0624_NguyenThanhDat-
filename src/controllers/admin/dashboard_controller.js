const MenuService = require('../../services/menu_service')
const CategoryService = require('../../services/category_service')
const ProductService = require('../../services/product_service')

class DashboardController {
    getAll = async (req, res, next) => {
        const menu = await MenuService.countAllItems()
        const category = await CategoryService.countAllItems()
        const product = await ProductService.countAllItems()
        res.render('admin/pages/dashboard', {menu, category, product})
    }
}

module.exports = new DashboardController()