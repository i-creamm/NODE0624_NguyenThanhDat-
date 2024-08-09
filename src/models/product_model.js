const { Schema, model, default: mongoose } = require('mongoose')

const ConnectionDocument = 'products'
const ModelDocument = 'product'

const categorySchema = new Schema({
  name: String,
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },
  ordering: {
    type: Number,
    min: 0,
    max: 100
  },
  productIdCategory: {
    type: mongoose.Schema.Types.ObjectId, ref: 'category'
  }
}, {
  collection: ConnectionDocument, timestamps: true
});

module.exports = model(ModelDocument, categorySchema)