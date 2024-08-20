const { Schema, model, default: mongoose } = require('mongoose')
var slugify = require('slugify')

const ConnectionDocument = 'products'
const ModelDocument = 'product'

const productSchema = new Schema({
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
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  description: {
     type: String 
  },
  isSpecial: {
    type: Boolean,
    default: false
  },
  detail: String,
  image: String,
  images : [String],
  idCategory : {
    type: Schema.Types.ObjectId,
    ref: 'category',
  },
  slug: String,


}, {
  collection: ConnectionDocument, timestamps: true
});

productSchema.pre("save", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

productSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name, { lower: true, strict: true });
  }
  next();
});

module.exports = model(ModelDocument, productSchema)
