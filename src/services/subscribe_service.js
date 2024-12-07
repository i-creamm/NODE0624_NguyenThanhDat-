const MainModel = require('../models/subscribe_model')
const nodemailer = require("nodemailer");
require('dotenv').config();

class SubscribeService {

  getAllItems = async (status , search, pageSkip, pageLimit) =>{
      const query = {};
      if (status) {
          query.status = status;
      }
      if (search) {
          query.name = new RegExp(search, 'ig');
      }
      return await MainModel.find(query).skip(pageSkip).limit(pageLimit)
  }

  countItemWithStatus = async(name = "") => {
    let status = {}
    if(name != "") status = {status: name}
    return await MainModel.countDocuments(status)
  }

  findId = async (id) => {
    return await MainModel.findById(id)
  }

    saveEmail = async (email) => {
      return await MainModel.create({email})
    }

    sendEmailIsSaved = async ( id, {email, subject, content}) => {
      await MainModel.findByIdAndUpdate(id)
              
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
          subject: subject , // Subject line
          text: "HEHE BOIZ", // plain text body
          html: content 
          , // html body
        });

        return info
  }

  deleteById = async (id) => {
    return await MainModel.findByIdAndDelete(id)
  }

}

module.exports = new SubscribeService()