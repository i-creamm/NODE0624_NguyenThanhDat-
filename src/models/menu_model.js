const { Schema, model, Types } = require('mongoose')
var slugify = require('slugify')

const ConnectionDocument = 'menus'
const ModelDocument = 'menu'


const menuSchema = new Schema({
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
    link: String,
    slug: String,
  }, {
      collection : ConnectionDocument, 
      timestamps: true,
  });

  menuSchema.pre("save", function (next) {
    if (this.name) {
      this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
  });

  menuSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    if (update.name) {
      update.slug = slugify(update.name, { lower: true, strict: true });
    }
    next();
  });

module.exports = model(ModelDocument, menuSchema)