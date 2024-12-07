const { Schema, model, default: mongoose } = require('mongoose');
var randomstring = require("randomstring");
const ConnectionDocument = 'forgot-passwords'
const ModelDocument = 'forgot-password'

const userSchema = new Schema({
  email: String,
  otp: String,
  expireAt: {
    type: Date,
    expires: 10
  }
}, {
  collection: ConnectionDocument, timestamps: true
});

module.exports = model(ModelDocument, userSchema)