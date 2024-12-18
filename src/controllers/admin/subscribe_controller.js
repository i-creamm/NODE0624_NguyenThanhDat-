const MainService = require("../../services/subscribe_service");
const {generateCountStatusUser, generatePagination} = require('../../utils/helper')
const helperSendMail = require('../../utils/helperSendMail')

const nameController = 'subscribe'
const linkPrefix = `/admin/${nameController}`

class SubscribeClass {

  getAllEmail = async (req, res, next) => {
    const { status, search, page = 1} = req.query;

    //filter all, active, inactive
    const [allCount, activeCount, inactiveCount] = await Promise.all([
      MainService.countItemWithStatus(),
      MainService.countItemWithStatus("active"),
      MainService.countItemWithStatus("inactive")
    ])
    const countStatus = await generateCountStatusUser(allCount, activeCount, inactiveCount)

    // Pagination
    let countRecords = status == 'active' ? activeCount : status == 'inactive' ? inactiveCount : allCount;
    const objectPagination = await generatePagination(page, 5, 3, countRecords)
    // End Pagination

    let items = await MainService.getAllItems(status, search, countStatus, objectPagination.limitItems, objectPagination.pageSkip);
    return res.render(`admin/pages/${nameController}/list`, { items, search, countStatus, pagination: objectPagination });

  }

  getForm = async (req, res, next) => {
    let title = "Add - Form";
    const {id} = req.params
    const item = req.params.id ? await MainService.findId(id) : {}
    if (id) title = "Edit - Form";
    res.render(`admin/pages/${nameController}/form`, { item, title})
  };


  saveEmailAndSendIt = async (req, res, next) => {
    const {id} = req.params
    const {email} = req.body
    const subject = `Thanks For Subscribe`
    const html = `<b>Thank you for Subscribe <3</b>`
    if(!id) {
      await MainService.saveEmail(email)
      helperSendMail.sendEmail(email, subject, html)
      return res.redirect("/")
    } else {
      await MainService.sendEmailIsSaved(id, req.body)
      res.redirect(`${linkPrefix}`)
    }
  };

  deleteItem = async (req, res, next) => {
    const {id} = req.params
    await MainService.deleteById(id)
    res.redirect(`${linkPrefix}`)
  }

}

module.exports = new SubscribeClass();