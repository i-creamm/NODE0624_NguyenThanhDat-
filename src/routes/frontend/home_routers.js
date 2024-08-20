var express = require('express');
var router = express.Router();
const HomeController = require('../../controllers/frontend/home_controller')
const ProductService = require('../../services/product_service');
const category_service = require('../../services/category_service');
const product_service = require('../../services/product_service');

// router.get('/category', require('./category_routers'))

router.get('/:slug', async (req , res , next) => {
    const { slug } = req.params
    const categoriesWithSlug = await category_service.findBySlug(slug)
    if(categoriesWithSlug) {
        const products = await product_service.findByParam({idCategory: categoriesWithSlug._id})
        return res.render('frontend/pages/product', {category : categoriesWithSlug,categories : products, layout: "frontend" })
    }
    next()
})

// router.get('/:slug', async (req , res , next) => {
//     const { slug } = req.params
//     const productWithSlug = await product_service.findBySlug(slug)
//     if(slug == 'sp1') {
//         return res.render('frontend/pages/contact', {layout: "frontend" })
//     }
//     next()
// })

    
router.get('/:slug?', (req , res , next) => {
    const { slug } = req.params
    switch (slug) {
        case 'contact':
            res.render('frontend/pages/contact', {layout: "frontend" })
            break;
        default:
            res.render('frontend/pages/home', {layout: "frontend" })
    }
})
    
module.exports = router;