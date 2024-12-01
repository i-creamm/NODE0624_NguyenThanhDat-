var express = require('express');
var router = express.Router();
const ProductService = require('../../services/product_service');
const CategoryService = require('../../services/category_service');
const {fetchSlider, fetchProductWithSpecial} = require('../../middleware/Main_Middleware')
const {cartId} = require('../../middleware/frontend/cart_middleware')


router.use(fetchSlider);
router.use(fetchProductWithSpecial);
router.use(cartId);

router.get('/:slug', async (req , res , next) => {
    const { slug } = req.params

    //for category
    const categoriesWithSlug = await CategoryService.findBySlug(slug)
    if(categoriesWithSlug) {
        const products = await ProductService.findByParam({idCategory: categoriesWithSlug._id})
        return res.render('frontend/pages/product', {category : categoriesWithSlug, products, layout: "frontend" })
    }

    //for product detail
    const productWithSlug = await ProductService.findBySlug(slug);
    if (productWithSlug) {
        return res.render('frontend/pages/detail', { products: productWithSlug, layout: "frontend" });
    }
    next()
})

router.get('/search', async (req, res, next) => {
    const {q} = req.query
    const keyword = await ProductService.searchProductWithKeyword(q)
    res.render(`frontend/pages/search`, {layout: "frontend", keyword})
})

router.get('/filter', async (req, res, next) => {
    const {minPrice, maxPrice} = req.query
    const filterPrice = await ProductService.filterPrice(minPrice, maxPrice)
    res.render(`frontend/pages/filterPrice`, {layout: "frontend", filterPrice})
})


router.get('/:slug?', async (req , res , next) => {
    const { slug } = req.params
    let link;
    switch (slug) {
        case 'contact':
            link = 'frontend/pages/contact'
            break;
        case 'about':
            link = 'frontend/pages/about'
            break;
        case 'blog':
            link = 'frontend/pages/blog'
            break;
        case 'category':
            link = 'frontend/pages/category'
            break;
        default:  
            link = 'frontend/pages/home'
            break;
    }
    res.render(link, {layout: "frontend" })
})

    
module.exports = router;