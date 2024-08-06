class homeController {
    getAll = (req, res, next) => {
        res.render('frontend/index', {layout: "frontend"})
    }
}

module.exports = new homeController()