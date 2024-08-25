
class DashboardController {
    getAll = (req, res, next) => {
        res.render('admin/pages/dashboard')
    }
}

module.exports = new DashboardController()