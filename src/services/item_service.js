const ItemModel = require('../models/item_model')


class ItemService {

    getAllItems = async (status , search, pageSkip, pageLimit) =>{
        const query = {};
        if (status) {
            query.status = status;
        }
        if (search) {
            query.name = new RegExp(search, 'ig');
        }
        return await ItemModel.find(query).skip(pageSkip).limit(pageLimit)
    }

    save = async ({name, ordering, status, image}) => {
        return await ItemModel.create({name, ordering, status, image})
    }

    changeStatusById = async (id, status) => {
        return await ItemModel.findByIdAndUpdate(id, {status})
    }

    findId = async ({id}) => {
        return await ItemModel.findById(id)
    }

    editById = async (id , updateItem) => {
        return await ItemModel.findByIdAndUpdate(id, updateItem) 
    }

    deleteById = async ({id}) => {
        return await ItemModel.findByIdAndDelete(id)
    }

    countItemWithStatus = async(name = "") => {
        let status = {}
        if(name != "") status = {status: name}
        return await ItemModel.countDocuments(status)
    }

    countAllItems = async () => {
        return await ItemModel.countDocuments()
    }
}

module.exports = new ItemService();