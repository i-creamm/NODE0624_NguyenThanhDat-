const ProductModel = require('../models/product_model')

class ProductService {

    getProducts = async (productStatus, search) => {
        let query = {}
        if (productStatus){
            query.productStatus = productStatus
        }
        if (search) {
            query.productName = new RegExp(search, 'ig');
        }
        return await ProductModel.find(query).populate('category')
    }

    saveProduct = async ({name, status, ordering}) => {
        return await ProductModel.create({name, status, ordering})
    }

    findId = async (id) => {
        return await ProductModel.findById(id)
    }

    editById = async (id , updateItem) => {
        return await ProductModel.findByIdAndUpdate(id, updateItem) 
    }

    countItemWithStatus = async(productName = "") => {
        let status = {}
        if(productName != "") status = {status: productName}
        return await ProductModel.countDocuments(status)
        
    }
}

module.exports = new ProductService()