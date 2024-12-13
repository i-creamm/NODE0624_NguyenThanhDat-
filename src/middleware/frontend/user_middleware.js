const User = require("../../models/user_model")

const userInfo = async (req, res, next) => {
    res.locals.user = null

    if(req.cookies.User){
        const user = JSON.parse(req.cookies.User)
        if(user){
            res.locals.user = user
        }
    } 
    next()
}

module.exports = {
    userInfo
}