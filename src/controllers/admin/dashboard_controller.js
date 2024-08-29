const MenuService = require('../../services/menu_service')
const CategoryService = require('../../services/category_service')
const ProductService = require('../../services/product_service')
const SliderService = require('../../services/slider_service')

const settingModel = require('../../models/setting_model')

class DashboardController {
    getAll = async (req, res, next) => {
        //luu setting
        // await settingModel.create({name : JSON.stringify(setting)})
        // let data = await settingModel.find({})
        // let setting = JSON.parse(data[0].name)
        // console.log(setting.setting.footer.Social)

        // console.time('Execution Time');
        const [menu, category, product, slider] = await Promise.all([
            MenuService.countAllItems(),
            CategoryService.countAllItems(),
            ProductService.countAllItems(),
            SliderService.countAllItems()
        ])
        // console.timeEnd('Execution Time');
        res.render('admin/pages/dashboard', {menu, category, product, slider})
    }
}

module.exports = new DashboardController()