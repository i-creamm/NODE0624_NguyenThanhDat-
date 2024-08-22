var express = require('express');
var router = express.Router();
const ProductService = require('../../services/product_service');
const CategoryService = require('../../services/category_service');


router.get('/:slug', async (req , res , next) => {
    const { slug } = req.params

    //for category
    const categoriesWithSlug = await CategoryService.findBySlug(slug)
    if(categoriesWithSlug) {
        const products = await ProductService.findByParam({idCategory: categoriesWithSlug._id})
        return res.render('frontend/pages/product', {category : categoriesWithSlug, categories : products, layout: "frontend" })
    }

    //for product detail
    const productWithSlug = await ProductService.findBySlug(slug);
    if (productWithSlug) {
        return res.render('frontend/pages/detail', { products: productWithSlug, layout: "frontend" });
    }

    next()
})


router.get('/:slug', (req , res , next) => {
    const { slug } = req.params
    switch (slug) {
        case 'contact':
            res.render('frontend/pages/contact', {layout: "frontend" })
            break;
        case 'about':
            res.render('frontend/pages/about', {layout: "frontend" })
            break;
        case 'blog':
            res.render('frontend/pages/blog', {layout: "frontend" })
            break;
        default:
            res.render('frontend/pages/home', {layout: "frontend" })
            break;
    }
})
    
module.exports = router;