// const { readFile} = require("../utils/helper");
// const { writeFile} = require("../utils/helper");
const ItemModel = require('../models/item_model')

class ItemService {

    getAllItems = async (search) =>{
        const query = search ? { name: new RegExp(search, 'i') } : {};
        return await ItemModel.find(query);
    }

    getItemsByStatus = async (status) => {
        return await ItemModel.find({status})
    }

    getItemsByStatusAndSearch = async (status, search) => {
        const query = { status };
        if (search) {
            query.name = new RegExp(search, 'i');
        }
        return await ItemModel.find(query);
    }

    save = async ({name, ordering, status}) => {
        return await ItemModel.create({name, ordering, status})
    }

    findId = async ({id}) => {
        return await ItemModel.findById(id)
    }

    editById = async ({id}, updateItem) => {
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
}

module.exports = new ItemService();