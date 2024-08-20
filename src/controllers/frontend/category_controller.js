const MainService = require('../../services/category_service')
const ProductService = require('../../services/product_service')

class CategoryController {

    getProductDetail = async (req, res, next) => {
        const categories = await ProductService.getAllItems()
        res.render('frontend/pages/product', {categories, layout: "frontend" })
    }

}

module.exports = new CategoryController()