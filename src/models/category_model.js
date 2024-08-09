const { Schema, model } = require('mongoose')

const ConnectionDocument = 'categories'
const ModelDocument = 'category'

const categorySchema = new Schema({
    name: String,
    status : {
      type: String,
      enum : ['active', 'inactive'],
      default: 'inactive'
    },
    ordering : {
      type: Number,
      min : 0,
      max : 100
    }
  }, {
      collection : ConnectionDocument, timestamps: true
  });

  module.exports = model(ModelDocument, categorySchema)