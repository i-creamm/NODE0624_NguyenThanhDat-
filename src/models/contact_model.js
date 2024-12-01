const { Schema, model, default: mongoose } = require('mongoose')
const ConnectionDocument = 'contacts'
const ModelDocument = 'contact'

const contactSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    content: String
}, {
  collection: ConnectionDocument, timestamps: true
});

module.exports = model(ModelDocument, contactSchema)