var express = require('express');
var router = express.Router();
const ProductService = require('../../services/product_service');
const CategoryService = require('../../services/category_service');
const {generatePaginationVer2} = require('../../utils/helper')
const limitPage = 6
const pageRanges = 4
const {fetchSlider, fetchProductWithSpecial} = require('../../middleware/Main_Middleware')


router.use(fetchSlider);
router.use(fetchProductWithSpecial);



router.get('/:slug', async (req , res , next) => {
    const { slug } = req.params
    const {page, brand} = req.query

    //for category
    const categoriesWithSlug = await CategoryService.findBySlug(slug)
    if(categoriesWithSlug) {

        const totalRecord = await ProductService.countProductsWithBrand(categoriesWithSlug._id, brand)

        const objectPagination = await generatePaginationVer2(page, limitPage, pageRanges, totalRecord)

        const products = await ProductService.findByParam(categoriesWithSlug._id, objectPagination.limitItems, objectPagination.pageSkip, brand)
        
        return res.render('frontend/pages/product', {category : categoriesWithSlug, products, pagination: objectPagination, layout: "frontend" })
    }

    // for product detail
    const productWithSlug = await ProductService.findBySlug(slug);
    if (productWithSlug) {
        return res.render('frontend/pages/detail', { products: productWithSlug, layout: "frontend" });
    }

    // Không khớp với category hoặc product, chuyển đến middleware tiếp theo
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
        default:  
            link = 'frontend/pages/home'
            break;
    }
    res.render(link, {layout: "frontend"})
})

    
module.exports = router;