const MainService = require("../../services/order_service");
const {generateCountStatusOrder, generatePaginationVer2} = require('../../utils/helper')
const updateItem = require("../../utils/upload");
const nameController = 'order'
const linkPrefix = `/admin/${nameController}`



class OrderController {

  getAll = async (req, res, next) => {
    const {status, search, page = 1} = req.query

    //Filter
    const [allCount, pendingCount, shippingCount] = await Promise.all([
      MainService.countItemWithStatus(),
      MainService.countItemWithStatus("pending"),
      MainService.countItemWithStatus("shipping")
    ])
    const countStatus = await generateCountStatusOrder(allCount, pendingCount, shippingCount)
    //End Filter

    // Pagination
    let countRecords = status == 'pending' ? pendingCount : status == 'shipping' ? shippingCount : allCount;
    const objectPagination = await generatePaginationVer2(page, 5, 3, countRecords)
    // End Pagination

    let items = await MainService.getAllItems(status, search, countStatus, objectPagination.limitItems, objectPagination.pageSkip);
    return res.render(`admin/pages/${nameController}/list`, {items, search, countStatus, pagination: objectPagination});

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

module.exports = new OrderController();
