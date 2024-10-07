const Cart = require('../../models/cart_model')

const cartId = async (req, res, next) => {

    if(!req.cookies.cartId){
        const cart =  new Cart()
        await cart.save()
        const expiresCookie = 24 * 60 * 60 * 1000 
        res.cookie('cartId', cart.id, {
            expires: new Date(Date.now() + expiresCookie)
        })
    } else {

    }

    next();
}

module.exports = {
    cartId
}