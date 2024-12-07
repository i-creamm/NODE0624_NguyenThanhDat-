const MainModel = require('../models/discount_model')

class DiscountService {

    getAllItems = async (status, search, countStatus, limitItems, pageSkip) => {
        const query = {
            deleted: "false"
        }

        if(status){
            query.status = status
            const index = countStatus.findIndex(item => item.status == status)
            countStatus[index].class = 'info'
        } else {
            const index = countStatus.findIndex(item => item.status == '')
            countStatus[index].class = 'info' 
        }

        if(search){
            query.name = new RegExp(search, 'ig');
        }

        return await MainModel.find(query).limit(limitItems).skip(pageSkip).sort({'createdAt': -1})
    }

    findId = async (id) => {
        return await MainModel.findById(id)
    }

    detailById = async (id) => {
        return await MainModel.findById(id)
    }

    changeStatusById = async (id, status) => {
        return await MainModel.findByIdAndUpdate(id, {status})
    }

    countItemWithStatus = async(name = "") => {
        let status = {}
        if(name != "") status = {status: name}
        return await MainModel.countDocuments(status)
    }

}

module.exports = new DiscountService()