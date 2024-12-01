const { check, validationResult } = require('express-validator');


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


const demo = async (req, res, next) => {

    await check(req.body.email)
        .isEmail()
        .withMessage("Invalid email")
        .normalizeEmail().run(req)

        
    await check(req.body.password)
        .isLength({ min: 6 })
        .withMessage("Password must have at least 6 characters").run(req)


    const errors = validationResult(req);


    if (!errors.isEmpty()) {

        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        res.redirect('back');
        return 
    }
    next();
};


module.exports = {
    registerPost,
    demo
}