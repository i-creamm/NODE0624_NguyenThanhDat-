
const Cart = require('../../models/cart_model')


class CartController {
    addCart = async (req, res, next) => {
        const productId = req.params.productId
        const quantity = parseInt(req.body.quantity)
        const cartId = req.cookies.cartId

        const cart = await Cart.findOne({
            _id: cartId
        })


        const existProductInCart = cart.products.find(item => item.product_id == productId)

        if (existProductInCart){
            const quantityNew = quantity + existProductInCart.quantity
            await Cart.updateOne({
                _id: cartId,
                "products.product_id": productId
            },{
                $set: {
                    "products.$.quantity": quantityNew
                }
            })
            console.log(quantityNew)
        } else {
            const objectCart = {
                product_id: productId,
                quantity: quantity
            }
            await Cart.updateOne(
                {
                    _id: cartId,
                },
                {
                    $push: {products: objectCart}
                }
            )
        }        
        req.flash("success", "Them thanh cong")
        res.redirect("back")
    }
}

module.exports = new CartController()