const { Schema, model, default: mongoose } = require('mongoose')
const ConnectionDocument = 'brands'
const ModelDocument = 'brand'
var slugify = require('slugify')

const brandSchema = new Schema({
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
  image: String,
  slug: String,
  idCategory : {
    type: Schema.Types.ObjectId,
    ref: 'category',
  }
}, {
  collection: ConnectionDocument, timestamps: true
});

brandSchema.pre("save", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

brandSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name, { lower: true, strict: true });
  }
  next();
});

module.exports = model(ModelDocument, brandSchema)
