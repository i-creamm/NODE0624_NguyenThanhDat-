const registerPost = async (req, res, next) => {
    if(!req.body.fullname) {
        req.flash("error", "Please enter fullname")
        res.redirect("back")
        return
    }

    if(!req.body.email) {
        req.flash("error", "Please enter email")
        res.redirect("back")
        return
    }

    if(!req.body.password) {
        req.flash("error", "Please enter password")
        res.redirect("back")
        return
    }

    next()
}


const loginPost = async (req, res, next) => {
    if(!req.body.email) {
        req.flash("error", "Please enter email")
        res.redirect("back")
        return
    }

    if(!req.body.password) {
        req.flash("error", "Please enter password")
        res.redirect("back")
        return
    }

    next()
}

module.exports = {
    registerPost,
    loginPost
}