const MainModel = require('../models/setting_model')

class SettingService {

    //Backend
    getAllSetting = async () => {
        let id = '66cd8f8868b596b19fcdd0dc'
        return await MainModel.findById(id)
    }

    update = async (data) => {
        let id = '66cd8f8868b596b19fcdd0dc'
        return await MainModel.findByIdAndUpdate(id,{name : data})
    }

    //frontend
    findIdAndChangeInfo = async () => {
        let id = '66cd8f8868b596b19fcdd0dc'
        return await MainModel.findById(id)
    }

}

module.exports = new SettingService()