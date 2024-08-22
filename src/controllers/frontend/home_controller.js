const MainService = require('../../services/product_service')

class homeController {
    
    getAll = async (req, res, next) => {
        res.render('frontend/pages/home', {layout: "frontend" })
    }
    
}

module.exports = new homeController()