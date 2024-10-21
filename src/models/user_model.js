const { Schema, model, default: mongoose } = require('mongoose');
var randomstring = require("randomstring");
const ConnectionDocument = 'users'
const ModelDocument = 'user'

const userSchema = new Schema({
  fullname: String,
  email: String,
  password: String,
  tokenUser: {
    type: String,
    default: randomstring.generate(20)
  },
  phone: String,
  avatar: String,
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  deleted: {
    type: String,
    default: false
  },
  deletedAt: Date
}, {
  collection: ConnectionDocument, timestamps: true
});

module.exports = model(ModelDocument, userSchema)