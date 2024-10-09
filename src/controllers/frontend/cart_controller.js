
const Cart = require('../../models/cart_model')
const ProductModel = require('../../models/product_model')


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
            },
            {
                $set: {
                    "products.$.quantity": quantityNew
                }
            })
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

    getCart = async (req, res, next) => {
        const cartId = req.cookies.cartId

        const cart = await Cart.findOne({
            _id: cartId
        })

        if(cart.products.length > 0){
            for(const item of cart.products){
                const productId = item.product_id
                const productInfo = await ProductModel.findOne({
                    _id: productId
                }).select("name image slug price_discount discount")
                item.productInfo = productInfo

                item.totalPrice = productInfo.price_discount * item.quantity
            }
        }


        res.render('frontend/pages/cart/index',{
            cartDetail: cart, 
            layout: "frontend"
        })
    }
}

module.exports = new CartController()