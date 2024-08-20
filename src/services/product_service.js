const mongoose = require('mongoose');
const MainModel = require('../models/product_model')

class ProductService {

    getAllItems = async (status , search, pageSkip, pageLimit) =>{
        const query = {};
        if (status) {
            query.status = status;
        }
        if (search) {
            query.name = new RegExp(search, 'ig');
        }
        return await MainModel.find(query).skip(pageSkip).limit(pageLimit).sort({'createdAt': -1}).populate('idCategory')
    }

    save = async ( { name, ordering, status, image , price, detail, isSpecial, idCategory }) => {
        return await MainModel.create({
            name, ordering, status, image , price, detail, isSpecial, idCategory: idCategory
        })
    }

    changeStatusById = async (id, status) => {
        return await MainModel.findByIdAndUpdate(id, {status})
    }

    changeOrderingById = async (id, ordering) => {
        return await MainModel.findByIdAndUpdate(id, {ordering})
    }

    findId = async (id) => {
        return await MainModel.findById(id)
    }
    findByParam = async (params) => {
        return await MainModel.find(params)
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
    getProductWithSpecial = async () => {
        return await MainModel.countDocuments()
    }

}

module.exports = new ProductService()