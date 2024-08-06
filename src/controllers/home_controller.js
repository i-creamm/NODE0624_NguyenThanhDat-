class homeController {
    getAll = (req, res, next) => {
        res.render('frontend/pages/home', { layout: "frontend" })
    }
    getProductDetail = (req, res, next) => {

        res.render('frontend/pages/product', { layout: "frontend" })
    }
}

module.exports = new homeController()