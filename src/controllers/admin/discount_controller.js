const MainService = require("../../services/discount_service");
const {generateCountStatusUser, generatePaginationVer2} = require('../../utils/helper')
const updateItem = require("../../utils/upload");
const nameController = 'discount'
const linkPrefix = `/admin/${nameController}`



class DiscountController {

  getAll = async (req, res, next) => {
    const {status, search, page = 1} = req.query

    //Filter
    const [allCount, activeCount, inactiveCount] = await Promise.all([
      MainService.countItemWithStatus(),
      MainService.countItemWithStatus("active"),
      MainService.countItemWithStatus("inactive")
    ])
    const countStatus = await generateCountStatusUser(allCount, activeCount, inactiveCount)
    //End Filter

    // Pagination
    let countRecords = status == 'active' ? activeCount : status == 'inactive' ? inactiveCount : allCount;
    const objectPagination = await generatePaginationVer2(page, 4, 2, countRecords)
    // End Pagination

    let items = await MainService.getAllItems(status, search, countStatus, objectPagination.limitItems, objectPagination.pageSkip);
    res.render(`admin/pages/${nameController}/list`, {items, search, countStatus, pagination: objectPagination});

  };

  getForm = async (req, res, next) => {
    let title = "Add - Form";
    const {id} = req.params
    const item = req.params.id ? await MainService.findId(id) : {};
    if (id) title = "Edit - Form";
    res.render(`admin/pages/${nameController}/form`, { item, title, alert: [] });
  };

  getDetail = async (req, res, next) => {
    const {id} = req.params
    const detailProduct = await MainService.detailById(id)
    res.render(`admin/pages/${nameController}/detail`, {detailProduct})
  }

  changeStatus = async (req, res, next) => {
    let {id, status} = req.params
    await MainService.changeStatusById(id, status)
    res.redirect(`${linkPrefix}`);
  }

}

module.exports = new DiscountController();
