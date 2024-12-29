const MainModel = require('../models/product_model')
const BrandModel = require('../models/brand_model')

class ProductService {

    getAllItems = async (status, search, countStatus, limitItems, pageSkip) => {
        const query = {}
        if(status){
            query.status = status
            const index = countStatus.findIndex(item => item.status == status)
            countStatus[index].class = 'success'
        } else {
            const index = countStatus.findIndex(item => item.status == '')
            countStatus[index].class = 'success' 
        }

        if (search) {
            query.name = new RegExp(search, 'ig');
        }
        return await MainModel.find(query)
        .limit(limitItems)
        .skip(pageSkip)
        .sort({ 'createdAt': -1 }).populate([{ path: 'idCategory' }, { path: 'idBrand' }]);
    }
    
    save = async ({ name, ordering, status, image, images, isSpecial, newProduct, price, discount, type_discount, price_discount, detail, idCategory, idBrand}) => {
           
        const data = await MainModel.create({
            name, ordering, status, image, images, isSpecial, newProduct,  price, discount, type_discount, price_discount, detail, idCategory: idCategory, idBrand: idBrand
        })

        return data
    }

    changeCategory = async (id, idCategory) => {
        return await MainModel.findByIdAndUpdate(id, {idCategory}).populate('idCategory')
    }

    changeBrand = async (id, idBrand) => {
        return await MainModel.findByIdAndUpdate(id, {idBrand}).populate('idBrand')
    }

    changeStatusById = async (id, status) => {
        return await MainModel.findByIdAndUpdate(id, {status})
    }

    changeOrderingById = async (id, ordering) => {
        return await MainModel.findByIdAndUpdate(id, {ordering})
    }

    changeIsSpecial = async (id, isSpecial) => {
        return await MainModel.findByIdAndUpdate(id, {isSpecial})
    }

    changeNewProduct = async (id, newProduct) => {
        return await MainModel.findByIdAndUpdate(id, {newProduct})
    }

    findIdGetForm = async (id) => {
        return await MainModel.findById(id)
    }
    
    findId = async (id) => {
        return await MainModel.findById(id).populate([{ path: 'idCategory' }, { path: 'idBrand' }]);
    }

    editById = async (id , updateItem) => {
        return await MainModel.findByIdAndUpdate(id, updateItem) 
    }

    deleteById = async (id) => {
        return await MainModel.findByIdAndDelete(id)
    }

    countItemWithStatus = async(name = "") => {
        let status = {}
        if(name != "") status = {status: name}
        return await MainModel.countDocuments(status)
    }

    countAllItems = async () => {
        return await MainModel.countDocuments()
    }


    //Frontend
    findByParam = async (idCategory, limitItems, pageSkip, brand) => {
        let params = {}
        if(idCategory){
            params.idCategory = idCategory
        }

        if (brand) {
            const brandRecord = await BrandModel.findOne({ slug: brand })
            if (brandRecord) {
                params.idBrand = brandRecord._id
            }
        }
        return await MainModel.find(params).limit(limitItems).skip(pageSkip).populate('idBrand')
    }

    countProductsWithCategory = async(idCategory) => {
        return await MainModel.countDocuments({idCategory})
    }

    countProductsWithBrand = async (idCategory, brand) => {
        let query = {}
        if(brand){
            const brandRecord = await BrandModel.findOne({slug: brand })
            if(brandRecord){
                query.idBrand = brandRecord._id
            }
        }
        if(idCategory){
            query.idCategory = idCategory 
        }
        return await MainModel.countDocuments(query)
    }


    findBySlug = async (slug) => {
        return await MainModel.findOne({slug}).populate('idCategory')
    }

    getProductWithSpecial = async () => {
        return await MainModel.find({status: 'active', isSpecial: true}).sort({ordering: 1})
    }

    getProductWithNewProduct = async () => {
        return await MainModel.find({status: 'active', newProduct: true}).sort({ordering: 1})
    }

    findProductWithStatus = async (limitItems, pageSkip) => {
        return await MainModel.find({status: 'active'}).limit(limitItems).skip(pageSkip).sort({ordering: 1})
    }

    searchProductWithKeyword = async (q) => {
        let query = {}
        if (q) {
            query.name = new RegExp(q, 'ig');
        }
        return await MainModel.find(query)
    }

    filterPrice = async (minPrice, maxPrice) => {
        const results = await MainModel.find({
            price: {
                $gte: minPrice, // Giá >= minPrice
                $lte: maxPrice  // Giá <= maxPrice
            }
        });
        return results
    }

}

module.exports = new ProductService()