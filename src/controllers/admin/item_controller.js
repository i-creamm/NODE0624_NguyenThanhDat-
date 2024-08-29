const MainService = require("../../services/item_service");
const { ItemValidate } = require("../../validation/item_validates");
const { validationResult } = require("express-validator");
const updateItem = require("../../utils/upload");
const uploadImage = updateItem.uploadImage("items","image");
const nameController = 'item'
const linkPrefix = `/admin/${nameController}`
const folderImage = '/items'
const path = require('path')
const fs = require('fs')


class ItemController {
  getAll = async (req, res, next) => {
    const { status, search, page = 1} = req.query;
    const countStatus = [
      {
        name: "All",
        count: await MainService.countItemWithStatus(),
        value: "all",
        link: `${linkPrefix}`,
        active: status != "inactive" && status != "active",
      },
      {
        name: "Active",
        count: await MainService.countItemWithStatus("active"),
        value: "active",
        link: `${linkPrefix}?status=active`,
        active: status == "active",
      },
      {
        name: "Inactive",
        count: await MainService.countItemWithStatus("inactive"),
        value: "inactive",
        link: `${linkPrefix}?status=inactive`,
        active: status == "inactive",
      },
    ]

    const pageLimit = 10;
    const pageRanges = 5;
    let totalItems = await await MainService.countItemWithStatus(status);
    const pagination = {
      pageLimit: pageLimit,
      totalItems: totalItems,
      totalPages: Math.ceil(totalItems / pageLimit),
      currentPage: parseInt(page),
      pageRanges: pageRanges,
    };
    const pageSkip = (pagination.currentPage - 1) * pageLimit;

    let items = await MainService.getAllItems(status, search, pageSkip, pageLimit);
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


  //save info form (Add or Edit)
  saveForm = [uploadImage , 
    async (req, res, next) => {
    const { id } = req.params;
    await ItemValidate(req);
    const errors = validationResult(req);
    const item = id ? await MainService.findId(id) : {};

    if (!errors.isEmpty()) {
      return res.render(`admin/pages/${nameController}/form`, { item, title: id ? "Edit - Form" : "Add - Form", alert: errors.array()});
    }

    if (req.file) {
      req.body.image = req.file.filename;
    }
    
    if (!id) {
      await MainService.save(req.body)
    } else {
      const { name, ordering, status, image } = req.body;
      const updateItem = { name, ordering, status, image };

      if (req.file && item.image) {
        const imagePath = path.join(__dirname, `../../public/uploads${folderImage}`, item.image.replace(`/uploads/`, ""))
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Error deleting image:", err);
          }
        })
      }
      await MainService.editById(id, updateItem);
    }
    res.redirect(`${linkPrefix}`);
  }];

  //delete item
  deleteItem = async (req, res, next) => {
    const {id} = req.params
    const item = await MainService.findId(id)

    if (item && item.image) {
      const imagePath = path.join(__dirname, `../../public/uploads`, item.image.replace(`/uploads/`, ""))
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image:", err)
        }
      });
    }

    await MainService.deleteById(id)
    res.redirect(`${linkPrefix}`)
  }

}

module.exports = new ItemController();
