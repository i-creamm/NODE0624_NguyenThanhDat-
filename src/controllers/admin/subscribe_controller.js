const MainService = require("../../services/subscribe_service");
const {generateCountStatus, generatePagination} = require('../../utils/helper')

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
    const countStatus = await generateCountStatus(status, linkPrefix, allCount, activeCount, inactiveCount)

    // pagination
    let totalItems = status == 'active' ? activeCount : status == 'inactive' ? inactiveCount : allCount;
    const pagination = generatePagination(totalItems, page, 5);

    let items = await MainService.getAllItems(status, search, pagination.pageSkip, pagination.pageLimit);
    return res.render(`admin/pages/${nameController}/list`, {items, countStatus, status, search, pagination, message: {}});
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
    if(!id) {
      await MainService.Email(req.body)
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