const Cart = require('../../models/cart_model')
const ProductModel = require('../../models/product_model')
const idCartPrefix = '6708e681645e3efe6b966461'


class CartController {

    addCart = async (req, res, next) => {

        const productId = req.params.productId
        const quantity = parseInt(req.body.quantity)
        // const cartId = req.cookies.cartId
        const cartId = idCartPrefix

        const cart = await Cart.findOne({
            _id: cartId
        })

        const product = await  ProductModel.findById(productId)
    
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
                quantity: quantity,
                priceAtTime: product.price_discount
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
        req.flash("success", "Product added successfully")
        res.redirect("back")
    }

    getCart = async (req, res, next) => {
        const cartId = idCartPrefix

        const cart = await Cart.findOne({
            _id: cartId
        })

        if(cart.products.length > 0){
            for(const item of cart.products){
                const productId = item.product_id
                const productInfo = await ProductModel.findOne({
                    _id: productId
                }).select("name image slug price discount")

                productInfo.priceNew = ((productInfo.price * (100 - productInfo.discount)) / 100)

                item.productInfo = productInfo


                // item.totalPrice = productInfo.priceNew * item.quantity

                item.totalPrice = item.priceAtTime * item.quantity
            }
        }

        cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0)

        res.render('frontend/pages/cart/index',{
            cartDetail: cart, 
            layout: "frontend",
        })
    }

    deleteProductInCart = async (req, res, next) => {
        const cartId = idCartPrefix
        const productId = req.params.productId

        await Cart.updateOne({
            _id: cartId
        },
        {
            $pull: {products: {product_id: productId}}
        })

        req.flash("success", "Product removed")

        res.redirect("back")
    }

    updateProductInCart = async (req, res, next) => {
        const cartId = idCartPrefix
        const productId = req.params.productId
        const quantity = req.params.quantity

        await Cart.updateOne({
            _id: cartId,
            "products.product_id": productId
        },
        {
            $set: {
                "products.$.quantity": quantity
            }
        })
        res.redirect("back")
    }



}

module.exports = new CartController()