const MainService = require("../../services/category_service");
const MenuService = require("../../services/menu_service");
const {generateCountStatus, generatePagination} = require('../../utils/helper')
const { ItemValidate } = require("../../validation/item_validates");
const { validationResult } = require("express-validator");
const nameController = 'category'
const linkPrefix = `/admin/${nameController}`



class CategoryController {
  getAll = async (req, res, next) => {
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
  };

  //direct form put in
  getForm = async (req, res, next) => {
    let title = "Add - Form";
    const {id} = req.params
    const item = req.params.id ? await MainService.findId(id) : {};
    const items = await MenuService.getAllItems()
    if (id) title = "Edit - Form";
    res.render(`admin/pages/${nameController}/form`, { item, items, title, alert: [] });
  };

  changeStatus = async (req, res, next) => {
    let {id, status} = req.params
    await MainService.changeStatusById(id, status)
    res.redirect(`${linkPrefix}`);
  }

  changeOrdering = async (req, res, next) => {
    let {id, ordering} = req.params
    await MainService.changeOrderingById(id, parseInt(ordering))
    res.redirect(`${linkPrefix}`);
  }


  //save info form (Add or Edit)
  saveForm = async (req, res, next) => {
    const { id } = req.params;
    await ItemValidate(req);
    const errors = validationResult(req);
    const item = id ? await MainService.findId(id) : {};

    if (!errors.isEmpty()) {
      return res.render(`admin/pages/${nameController}/form`, { item, title: id ? "Edit - Form" : "Add - Form", alert: errors.array()});
    }

    if (!id) {
      await MainService.save(req.body)
    } else {
      const { name, ordering, status, idMenu} = req.body;
      const updateItem = { name, ordering, status, idMenu}
      await MainService.editById(id, updateItem);
    }
    req.flash('info', 'them moi thanh cong');

    res.redirect(`${linkPrefix}`);
  };

  //delete item
  deleteItem = async (req, res, next) => {
    const {id} = req.params
    const item = await MainService.findId(id)
    await MainService.deleteById(id)
    res.redirect(`${linkPrefix}`)
  }


}

module.exports = new CategoryController();
