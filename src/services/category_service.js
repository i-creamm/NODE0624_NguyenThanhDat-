const MainModel = require('../models/category_model')

class CategoryService {

    getAllItems = async (status, search, countStatus, limitItems, pageSkip) =>{
        const query = {};
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

        return await MainModel.find(query).limit(limitItems).skip(pageSkip).sort({'createdAt': -1}).populate('idMenu')
    }

    save = async ({name, ordering, status, idMenu}) => {
        return await MainModel.create({name, ordering, status, idMenu: idMenu || []})
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

    

    //frontend
    findBySlug = async (slug) => {
        return await MainModel.findOne({slug})
    }

    getCategoryByMenuId = async (idMenu) => {
        return await MainModel.find({
                idMenu: idMenu,
                status: "active",
            }).sort({ordering: 1})
        };

    findCategoryWithStatus = async () => {
        return await MainModel.find({status: 'active'}).sort({ordering: 1})
    }

}

module.exports = new CategoryService();