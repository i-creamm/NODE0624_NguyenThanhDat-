const MainModel = require('../models/brand_model')

class BrandService {

    //Backend
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
        return await MainModel.find(query).skip(pageSkip).limit(limitItems).populate([{ path: 'idCategory' }])
    }

    findAllName = async () => {
        return await MainModel.find({status: 'active'})
    }

    save = async ({ name, ordering, status, image, idCategory }) => {     
        const data = await MainModel.create({
            name, ordering, status, image, idCategory
        })
        return data
    }

    changeCategory = async (id, idCategory) => {
        return await MainModel.findByIdAndUpdate(id, {idCategory}).populate('idCategory')
    }

    changeStatusById = async (id, status) => {
        return await MainModel.findByIdAndUpdate(id, {status})
    }

    changeOrderingById = async (id, ordering) => {
        return await MainModel.findByIdAndUpdate(id, {ordering})
    }

    findId = async (id) => {
        return await MainModel.findById(id).populate('idCategory')
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

    getBrandByIdCategory = async (idCategory) => {
        return await MainModel.find({
            idCategory: idCategory,
            status: "active",
        }).sort({ordering: 1})
    };

}

module.exports = new BrandService()