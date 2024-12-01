const MainService = require("../../services/contact_service");
const {generateCountStatus, generatePagination} = require('../../utils/helper')

const nameController = 'contact'
const linkPrefix = `/admin/${nameController}`


class ContactController {
  getContact = async (req, res, next) => {
    let items = await MainService.getAll();
    return res.render(`admin/pages/${nameController}/list`, {items});
  };

  save = async (req, res, next) => {

    await MainService.saveContact(req.body)
    res.redirect('back')
  }

  detailContact = async (req, res, next) => {
    const {id} = req.params
    const detailContact = await MainService.detailContact(id)
    res.render(`admin/pages/${nameController}/detail`, {detailContact})
  }
}

module.exports = new ContactController();