const priceNewProduct = async (product) => {
    const priceNew = (
        (product.price * (100 - product.discount)) / 100
    )

    return parseInt(priceNew)
}


module.exports = {
    priceNewProduct
}