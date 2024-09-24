const MainModel = require('../models/subscribe_model')
const nodemailer = require("nodemailer");
require('dotenv').config();

class SliderService {

    saveEmailAndSendIt = async ({email}) => {
        await MainModel.create({email})

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });

        const info = await transporter.sendMail({
            from: '"Eugo Raviaz" <ntdat3120411046@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "HEHE BOIZ", // plain text body
            html: "<b>Thank you for Subscribe <3 </b>", // html body
          });

          return info
    }
}

module.exports = new SliderService()