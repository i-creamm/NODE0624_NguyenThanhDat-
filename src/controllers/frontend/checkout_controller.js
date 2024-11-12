const Cart = require('../../models/cart_model')
const ProductModel = require('../../models/product_model')
const idCartPrefix = '6708e681645e3efe6b966461'
const Order = require('../../models/order_model')
const ProductService = require('../../services/product_service')



class CheckoutController {

    getCheckout = async (req, res, next) => {
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

        cart.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0)

        cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0)

        res.render('frontend/pages/checkout/index', {
            layout: "frontend",
            cartDetail: cart
        })
    }

    // order = async (req, res, next) => {
    //     const cartId = idCartPrefix
    //     const userInfo = req.body

    //     const cart = await Cart.findOne({
    //         _id: cartId
    //     })

    //     const products = []
    //     for (const product of cart.products) {
    //         const objectProduct = {
    //             product_id: product.product_id,
    //             priceAtTime: product.priceAtTime,
    //             quantity: product.quantity
    //         }

    //         products.push(objectProduct)
    //     }
        
    //     const orderInfo = {
    //         cart_id: cartId,
    //         userInfo: userInfo,
    //         products: products
    //     }

    //     const order = new Order(orderInfo)
    //     await order.save()

    //     await Cart.updateOne({
    //         _id: cartId
    //     },{
    //         products: []
    //     })

    //     res.redirect(`/checkout/success/${order.id}`)
    // }

    orderDetail = async (req, res, next) => {
        const { item , info } = req.body;
        const userInfo = info

    
        const products = []
        let total = 0;
        for (const product of item) {
            let piceProductNow = await ProductService.findId(product.productID)
            if(product.price != piceProductNow.price) {
                console.log('error')
                throw new Error('piceProductNow')
            }

            const objectProduct = {
                product_id: product.productID,
                priceAtTime: product.price,
                quantity: product.quantity,
                name: product.name,
                image: product.image
            }

            products.push(objectProduct)

            total += product.price * product.quantity;
        }

        

        const orderInfo = {
            userInfo : userInfo,
            products : products,
            total: total
        }

        console.log(orderInfo)

        const order = new Order(orderInfo)
        await order.save()


        res.json({ redirectUrl: `/checkout/success/${order.id}`});
    }

    success = async (req, res, next) => {
        const {orderId} = req.params
        const order = await Order.findOne({
            _id: orderId
        })

        for (const product of order.products) {
            product.totalPrice = product.priceAtTime * product.quantity
        }

        res.render("frontend/pages/checkout/success", {
            layout: "frontend",
            orderDetail: order
        })
    }

}

module.exports = new CheckoutController()