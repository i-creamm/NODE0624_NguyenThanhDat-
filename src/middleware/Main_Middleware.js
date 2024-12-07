const MainService = require('../services/menu_service')
const CategoryService = require('../services/category_service')
const SliderService = require('../services/slider_service')
const ProductService = require('../services/product_service')
const BrandService = require('../services/brand_service')
const SettingService = require('../services/setting_service')

    const fetchMenusAndCategories  = async (req, res, next) => {
        try {
            const menus = await MainService.getAllOrderingAndStatus()
            for (let menu of menus) {
                menu.categories = await CategoryService.getCategoryByMenuId(menu._id);
            }
            res.locals.menus = menus
            next()
        } catch (error) {
            next(error)
        }
    }

    const fetchSlider = async (req, res, next) => {
        try {
            const sliders = await SliderService.findSliderWithStatus()
            res.locals.sliders = sliders
            next()
        } catch (error) {
            next(error)
        }
    }

    const fetchProductWithSpecial = async (req, res, next) => {
        try {
            const specials = await ProductService.getProductWithSpecial()
            res.locals.specials = specials

            const news = await ProductService.getProductWithNewProduct()
            res.locals.news = news

            const brands = await BrandService.findBrandWithStatus()
            res.locals.brands = brands

            
            const products = await ProductService.findProductWithStatus()
            const prices = await products.map((product) => product.price)
            const minPrice = Math.min(...prices)
            const maxPrice = Math.max(...prices)
            // res.locals.products = products
            
            res.locals.minPrice = minPrice
            res.locals.maxPrice = maxPrice

            const setting = await SettingService.findIdAndChangeInfo()
            let stringParse = JSON.parse(setting.name)
            res.locals.settings = stringParse

            const categories = await CategoryService.findCategoryWithStatus()
            res.locals.categories = categories

            next()
        } catch (error) {
            next(error)
        }
    }

module.exports = {
    fetchMenusAndCategories,
    fetchSlider,
    fetchProductWithSpecial,
}