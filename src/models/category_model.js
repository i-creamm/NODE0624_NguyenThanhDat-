const { Schema, model } = require('mongoose')
var slugify = require('slugify')

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
    },
    slug: String
  }, {
      collection : ConnectionDocument, 
      timestamps: true,
  });


  categorySchema.pre("save", function (next) {
    if (this.name) {
      this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
  });

  categorySchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    if (update.name) {
      update.slug = slugify(update.name, { lower: true, strict: true });
    }
    next();
  });

  module.exports = model(ModelDocument, categorySchema)