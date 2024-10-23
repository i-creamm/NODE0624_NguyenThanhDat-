const User = require("../../models/user_model")

const userInfo = async (req, res, next) => {
    res.locals.user = null

    if(req.cookies.tokenUser){
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser,
            deleted: false,
            status: "active"
        }).select("-password"); //lay moi thong tin -password

        if(user){
            res.locals.user = user
        }
    } 
    next()
}

module.exports = {
    userInfo
}