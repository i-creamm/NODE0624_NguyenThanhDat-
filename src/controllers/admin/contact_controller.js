const MainService = require("../../services/contact_service");
const nameController = 'contact'
const {sendEmail} = require('../../utils/helperSendMail')
const linkPrefix = `/admin/${nameController}`


class ContactController {
  getContact = async (req, res, next) => {
    let items = await MainService.getAll();
    res.render(`admin/pages/${nameController}/list`, {items});
  };

  save = async (req, res, next) => {
    const {name, email, phone, content} = req.body
    await MainService.saveContact(name, email, phone, content)
    const subject = 'Contact'
    const html = `<b>Thank you contact me - Customer: ${name}</b>`
    await sendEmail(email, subject, html)
    res.redirect('back')
  }

  detailContact = async (req, res, next) => {
    const {id} = req.params
    const detailContact = await MainService.detailContact(id)
    res.render(`admin/pages/${nameController}/detail`, {detailContact})
  }
}

module.exports = new ContactController();