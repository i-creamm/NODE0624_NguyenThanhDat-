const { Schema, model, default: mongoose } = require('mongoose')
var slugify = require('slugify')

const ConnectionDocument = 'products'
const ModelDocument = 'product'

const categorySchema = new Schema({
  name: String,
  slug_product: String,
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
  image: String,
  images : [String],
  idCategory : {
    type: String,
  }
}, {
  collection: ConnectionDocument, timestamps: true
});

categorySchema.pre('save', function(next) {
  this.slug_product = slugify(this.name, { lower: true })
  next()
});





module.exports = model(ModelDocument, categorySchema)
