const MainService = require("../../services/menu_service");
const { ItemValidate } = require("../../validation/item_validates");
const { validationResult } = require("express-validator");
const {generateCountStatus, generatePagination} = require('../../utils/helper')
const nameController = 'menu'
const linkPrefix = `/admin/${nameController}`



class MenuController {
  getAll = async (req, res, next) => {
    const { status, search, page = 1} = req.query;

    //filter all, active, inactive
    const allCount = await MainService.countItemWithStatus()
    const activeCount = await MainService.countItemWithStatus("active")
    const inactiveCount = await MainService.countItemWithStatus("inactive")
    const countStatus = await generateCountStatus(status, linkPrefix, allCount, activeCount, inactiveCount)

    // pagination
    const totalItems = await MainService.countItemWithStatus(status);
    const pagination = generatePagination(totalItems, page, 5);

    let items = await MainService.getAllItems(status, search, pagination.pageSkip, pagination.pageLimit);
    return res.render(`admin/pages/${nameController}/list`, {items, countStatus, status, search, pagination, message: {}});
  };

  //direct form put in
  getForm = async (req, res, next) => {
    let title = "Add - Form";
    const {id} = req.params
    const item = req.params.id ? await MainService.findId(id) : {};
    if (id) title = "Edit - Form";
    res.render(`admin/pages/${nameController}/form`, { item, title, alert: [] });
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
      const child = req.body.child ==='true'
      const { name, ordering, status } = req.body;
      const updateItem = { name, ordering, status, child}
      await MainService.editById(id, updateItem);
    }
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

module.exports = new MenuController();