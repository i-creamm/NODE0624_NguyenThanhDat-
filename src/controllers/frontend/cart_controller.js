const Cart = require('../../models/cart_model')
const ProductModel = require('../../models/product_model')
const idCartPrefix = '6708e681645e3efe6b966461'


class CartController {

    getCart = async (req, res, next) => {
        res.render('frontend/pages/cart/index',{
            layout: "frontend",
        })
    }


}

module.exports = new CartController()