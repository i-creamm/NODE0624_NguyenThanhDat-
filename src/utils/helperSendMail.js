const nodemailer = require("nodemailer");
require('dotenv').config();

const sendEmail = async (email, subject, html) => {
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
        from: '"Eugo Raviaz" <ntdat3120411046@gmail.com>', 
        to: email, 
        subject: subject, 
        html: html
    });

    return info
}

module.exports = {
    sendEmail
}