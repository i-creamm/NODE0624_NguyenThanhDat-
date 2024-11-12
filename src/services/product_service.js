const MainModel = require('../models/product_model')

class ProductService {

    getAllItems = async (status, category, search, pageSkip, pageLimit) =>{
        const query = {};
        if (status) {
            query.status = status;
        }
        if (search) {
            query.name = new RegExp(search, 'ig');
        }
        if (category) {
            query.idCategory = category;
        }
        return await MainModel.find(query).skip(pageSkip).limit(pageLimit).sort({'createdAt': -1}).populate('idCategory')
    }

    save = async ( { name, ordering, status, image, images, isSpecial, newProduct, price, discount, type_discount, price_discount, detail, idCategory}) => {
           
        const data = await MainModel.create({
            name, ordering, status, image, images, isSpecial, newProduct,  price, discount, type_discount, price_discount, detail, idCategory: idCategory
        })

        return data
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

    findId = async (id) => {
        return await MainModel.findById(id)
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
    findByParam = async (params) => {
        return await MainModel.find(params)
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

    findProductWithStatus = async () => {
        return await MainModel.find({status: 'active'}).sort({ordering: 1})
    }

    //frontend
    searchProductWithKeyword = async (q) => {
        let query = {}
        if (q) {
            query.name = new RegExp(q, 'ig');
        }
        return await MainModel.find(query)
    }

}

module.exports = new ProductService()