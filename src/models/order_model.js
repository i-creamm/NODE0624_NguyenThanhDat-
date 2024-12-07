const { Schema, model, default: mongoose } = require('mongoose')
var randomstring = require("randomstring");
const ConnectionDocument = 'orders'
const ModelDocument = 'order'

const orderSchema = new Schema({
    // user_id: String,
    order_id: {
        type: String
    },
    userInfo: {
        fullname: String,
        phone: String,
        address: String
    },
    products: [
        {
            product_id: String,
            name: String,
            quantity: Number,
            priceAtTime: Number,
            image: String
        }
    ],
    total: Number,
    status: {
        type: String,
        enum : ['pending', 'shipping'],
        default: 'pending'
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
  collection: ConnectionDocument, timestamps: true
});

function removeVietnameseTones(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') 
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D') 
        .replace(/[^a-zA-Z0-9\s]/g, '') 
}

orderSchema.pre('save', function (next) { 
    if (this.userInfo && this.userInfo.fullname) {
        const normalizedName = removeVietnameseTones(this.userInfo.fullname);
        const words = normalizedName.split(" ");
        const lastWord = words[words.length - 1];
        this.order_id = (lastWord + '-' + randomstring.generate(5)).toUpperCase()
    }
    next();
});

module.exports = model(ModelDocument, orderSchema)