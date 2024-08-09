const CategoryModel = require('../models/category_model')

class CategoryService {

    getAllCategory = async (categoryStatus, search) => {
        let query = {}
        if (categoryStatus){
            query.categoryStatus = categoryStatus
        }
        if (search) {
            query.category_name = new RegExp(search, 'ig');
        }
        return await CategoryModel.find(query)
    }

    saveCategory = async ({name, status, ordering}) => {
        return await CategoryModel.create({name, status, ordering})
    }

    findId = async (id) => {
        return await CategoryModel.findById(id)
    }

    editById = async (id , updateItem) => {
        return await CategoryModel.findByIdAndUpdate(id, updateItem) 
    }

    countItemWithStatus = async(categoryName = "") => {
        let status = {}
        if(categoryName != "") status = {status: categoryName}
        return await CategoryModel.countDocuments(status)
    }
}

module.exports = new CategoryService()