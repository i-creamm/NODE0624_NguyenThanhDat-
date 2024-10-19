const Cart = require('../../models/cart_model')
const ProductModel = require('../../models/product_model')

const cartId = async (req, res, next) => {
    // const {cartId} = req.cookies

    const cartId = "6708e681645e3efe6b966461"
    
    if(!cartId){
        const cart = new Cart()
        await cart.save()
        const expiresCookie =   12 * 24 * 60 * 60 * 1000 
        res.cookie('cartId', cart.id, {
            expires: new Date(Date.now() + expiresCookie)
        })
    } else {
        const cart = await Cart.findOne({
            _id: cartId
        })
        
        if(cart.products.length > 0){
            for(const item of cart.products){
                const productId = item.product_id
                const productInfo = await ProductModel.findOne({
                    _id: productId
                }).select("name image slug discount")

                productInfo.priceNew = ((productInfo.price * (100 - productInfo.discount)) / 100)

                item.productInfo = productInfo

                item.totalPrice = item.priceAtTime * item.quantity
            }
        }

        cart.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0)

        cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0)

        res.locals.miniCart = cart
    }
    next();
}

module.exports = {
    cartId
}