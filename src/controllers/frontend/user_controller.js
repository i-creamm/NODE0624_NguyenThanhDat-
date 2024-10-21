
class UserController {

    getRegisterForm = async (req, res, next) => {
        res.render("frontend/pages/user/register",{
            layout: "frontend"
        })
    }

    getLoginForm = async (req, res, next) => {
        res.render("frontend/pages/user/login",{
            layout: "frontend"
        })
    }

}

module.exports = new UserController()