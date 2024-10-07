const { Schema, model, default: mongoose } = require('mongoose')
const ConnectionDocument = 'carts'
const ModelDocument = 'cart'

const cartSchema = new Schema({
    user_id: String,
    products: [
        {
            product_id: String,
            quantity: Number
        }
    ]
}, {
  collection: ConnectionDocument, timestamps: true
});

module.exports = model(ModelDocument, cartSchema)