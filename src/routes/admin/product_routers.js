var express = require('express');
var router = express.Router();
const MainController = require('../../controllers/admin/product_controller')
const { asyncHandle } =  require('../../utils/asyncHandle')

    router.get('/', asyncHandle(MainController.getAll))

    router.get('/form/:id?', asyncHandle(MainController.getForm))

    router.get('/detail/:id', asyncHandle(MainController.getDetail))

    router.get('/changeStatus/:id/:status', asyncHandle(MainController.changeStatusOrOrdering))

    router.get('/changeCategory/:id/:idCategory', asyncHandle(MainController.changeCategoryOrBrand))

    router.get('/changeBrand/:id/:idBrand', asyncHandle(MainController.changeCategoryOrBrand))

    router.get('/changeOrdering/:id/:ordering', asyncHandle(MainController.changeStatusOrOrdering))

    router.get('/changeIsSpecial/:id', asyncHandle(MainController.showDisplay))
    
    router.get('/changeNewProduct/:id', asyncHandle(MainController.showDisplay))

    router.post('/form/:id?', MainController.saveForm)

    router.get('/delete/:id', asyncHandle(MainController.deleteItem))
    
module.exports = router;