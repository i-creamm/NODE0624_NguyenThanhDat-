const { Schema, model } = require('mongoose')
var slugify = require('slugify')

const ConnectionDocument = 'categories'
const ModelDocument = 'category'

const categorySchema = new Schema({
    name: String,
    slug : String,
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
      collection : ConnectionDocument, 
      timestamps: true,
  });

  categorySchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true })
    next()
  });

  module.exports = model(ModelDocument, categorySchema)