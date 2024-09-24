const { Schema, model, default: mongoose } = require('mongoose')
const ConnectionDocument = 'subscribes'
const ModelDocument = 'subscribe'

const subscribeSchema = new Schema({
  email: String,
}, {
  collection: ConnectionDocument, timestamps: true
});

module.exports = model(ModelDocument, subscribeSchema)