const MainModel = require('../models/order_model')

class OrderService {

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
        return await MainModel.find(query).skip(pageSkip).limit(pageLimit).sort({'createdAt': -1})
    }


    detailById = async (id) => {
        return await MainModel.findById(id)
    }

    changeStatusById = async (id, status) => {
        return await MainModel.findByIdAndUpdate(id, {status})
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

}

module.exports = new OrderService()