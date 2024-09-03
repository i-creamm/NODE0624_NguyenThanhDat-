const MainModel = require('../models/setting_model')

class SettingService {

    //Backend
    getAllSetting = async () => {
        return await MainModel.find()
    }

    save = async ({name}) => {
        return await MainModel.create({name})
    }

    findId = async (id) => {
        return await MainModel.findById(id)
    }

}

module.exports = new SettingService()