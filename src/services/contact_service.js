const MainModel = require('../models/contact_model')

class ContactService {

    getAll = async () => {
        return await MainModel.find()
    }
   
    saveContact = async ({name, email, phone, content}) => {
        return await MainModel.create({name, email, phone, content})
    }

    detailContact = async (id) => {
        return await MainModel.findById(id)
    }

}

module.exports = new ContactService()