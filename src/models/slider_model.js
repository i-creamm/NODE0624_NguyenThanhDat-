const { Schema, model, default: mongoose } = require('mongoose')
const ConnectionDocument = 'sliders'
const ModelDocument = 'slider'

const sliderSchema = new Schema({
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
}, {
  collection: ConnectionDocument, timestamps: true
});

module.exports = model(ModelDocument, sliderSchema)
