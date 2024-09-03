const MainModel = require('../models/brand_model')

class SliderService {

    //Backend
    getAllItems = async (status , search, pageSkip, pageLimit) =>{
        const query = {};
        if (status) {
            query.status = status;
        }
        if (search) {
            query.name = new RegExp(search, 'ig');
        }
        return await MainModel.find(query).skip(pageSkip).limit(pageLimit)
    }

    save = async ({ name, ordering, status, image }) => {     
        const data = await MainModel.create({
            name, ordering, status, image
        })
        return data
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


    //Frontend
    findBrandWithStatus = async () => {
        return await MainModel.find({status: 'active'}).sort({ordering: 1})
    }

}

module.exports = new SliderService()