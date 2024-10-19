const { Schema, model, default: mongoose } = require('mongoose')
const ConnectionDocument = 'orders'
const ModelDocument = 'order'

const orderSchema = new Schema({
    // user_id: String,
    cart_id: String,
    userInfo: {
        fullname: String,
        phone: String,
        address: String
    },
    products: [
        {
            product_id: String,
            quantity: Number,
            priceAtTime: Number,
            discountPercentage: Number
        }
    ],
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
  collection: ConnectionDocument, timestamps: true
});

module.exports = model(ModelDocument, orderSchema)