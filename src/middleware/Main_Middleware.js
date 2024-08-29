const MainService = require('../services/menu_service')
const CategoryService = require('../services/category_service')
const SliderService = require('../services/slider_service')
const ProductService = require('../services/product_service')

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
            next()
        } catch (error) {
            next(error)
        }
    }

module.exports = {
    fetchMenusAndCategories,
    fetchSlider,
    fetchProductWithSpecial
}