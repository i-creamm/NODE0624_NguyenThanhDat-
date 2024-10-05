var express = require('express');
var router = express.Router();
const ProductService = require('../../services/product_service');
const CategoryService = require('../../services/category_service');
const {fetchSlider, fetchProductWithSpecial} = require('../../middleware/Main_Middleware')

router.use(fetchSlider);
router.use(fetchProductWithSpecial);

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
        case 'cart':
            link = 'frontend/pages/cart'
            break;
        case 'checkout':
            link = 'frontend/pages/checkout'
            break;
        default:  
            link = 'frontend/pages/home'
            break;
    }
    res.render(link, {layout: "frontend" })
})

    
module.exports = router;