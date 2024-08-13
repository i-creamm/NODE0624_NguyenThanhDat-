const MainService = require('../../services/category_service')

class homeController {
    getAll = async (req, res, next) => {
        let categories = await MainService.getAllItems()
        res.render('frontend/pages/home', {categories, layout: "frontend" })
    }
    
    getProductDetail = (req, res, next) => {
        res.render('frontend/pages/product', { layout: "frontend" })
    }


}

module.exports = new homeController()