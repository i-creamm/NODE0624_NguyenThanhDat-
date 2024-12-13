const User = require("../../models/user_model")
const md5 = require("md5")
const generateHelper = require('../../utils/generate')
const forgotPasswordModel = require('../../models/forgot-password_model')


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

    getLogOut = async (req, res, next) => {
       res.clearCookie("User")
       res.redirect("/")
    }

    registerPost = async (req, res, next) => {

        const existEmail = await User.findOne({
            email: req.body.email
        })

        if(existEmail){
            req.flash("error", "Email exist")
            res.redirect("back")
            return;
        }
        
        req.body.password = md5(req.body.password)

        const user = await User(req.body)
        await user.save()


        res.cookie("tokenUser", user.tokenUser)
        res.redirect("/")
    }

    LoginPost = async (req, res, next) => {
        const {email, password} = req.body

        const user = await User.findOne({
            email: email,
            deleted: false
        })

        if(!user){
            req.flash("error", "Email not exist")
            res.redirect("back")
            return
        }

        if(md5(password) !== user.password){
            req.flash("error", "Password wrong !")
            res.redirect("back")
            return
        }

        if(user.status === "inactive"){
            req.flash("error", "User blocked")
            res.redirect("back")
            return
        }

        // res.cookie("tokenUser", user.tokenUser)
        res.cookie("User", JSON.stringify({
            tokenUser : user.tokenUser,
            userName : user.fullname,
            userEmail : user.email,

        }))
        req.flash("success", `Login account ${user.fullname} successfully`)
        res.redirect("/")
    }

    forgotPassword = async (req, res, next) => {
        res.render("frontend/pages/user/forgot-password",{
            title: "Forgot Password",
            layout: "frontend"
        })
    }

    forgotPasswordPost = async (req, res, next) => {
        const {email} = req.body
        
        const user = await User.findOne({
            email: email,
            deleted: false
        })

        if(!user){
            req.flash("error", "Email not exist")
            res.redirect("back")
            return
        }

        //ton tai thi gui OTP
        const otp = generateHelper.generateRandomNumber(6)

        const objectForgotPassword = {
            email: email,
            otp: otp,
            expireAt: Date.now()
        }

        const forgotPassword = new forgotPasswordModel(objectForgotPassword)
        await forgotPassword.save()

        res.send('ok')
        
    }

}

module.exports = new UserController()