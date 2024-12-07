const MainService = require("../../services/user_service");
const {generateCountStatusUser, generatePaginationVer2} = require('../../utils/helper')
const nameController = 'user'
const linkPrefix = `/admin/${nameController}`



class UserController {

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

  getDetail = async (req, res, next) => {
    const {id} = req.params
    const detailUser = await MainService.detailById(id)
    res.render(`admin/pages/${nameController}/detail`, {detailUser})
  }

  changeStatus = async (req, res, next) => {
    let {id, status} = req.params
    await MainService.changeStatusById(id, status)
    res.redirect(`${linkPrefix}`);
  }

  deleteItem = async (req, res, next) => {
    const {id} = req.params
    await MainService.deleteById(id)
    res.redirect(`${linkPrefix}`)
  }

}

module.exports = new UserController();
