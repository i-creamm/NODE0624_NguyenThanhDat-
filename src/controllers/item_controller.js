const ItemService = require("../services/item_service");
const { ItemValidate } = require("../validation/item_validates");
const { validationResult } = require("express-validator");
const updateItem = require("../utils/upload");
const uploadImage = updateItem.upload("image");
const path = require('path')
const fs = require('fs')


class ItemController {
  getAll = async (req, res, next) => {
    const { status, search, page = 1} = req.query;
    const countStatus = [
      {
        name: "All",
        count: await ItemService.countItemWithStatus(),
        value: "all",
        link: "/admin/item",
        active: status != "inactive" && status != "active",
      },
      {
        name: "Active",
        count: await ItemService.countItemWithStatus("active"),
        value: "active",
        link: "/admin/item?status=active",
        active: status == "active",
      },
      {
        name: "Inactive",
        count: await ItemService.countItemWithStatus("inactive"),
        value: "inactive",
        link: "/admin/item?status=inactive",
        active: status == "inactive",
      },
    ]

    const pageLimit = 3;
    const pageRanges = 3;
    let totalItems = await await ItemService.countItemWithStatus(status);
    const pagination = {
      pageLimit: pageLimit,
      totalItems: totalItems,
      totalPages: Math.ceil(totalItems / pageLimit),
      currentPage: parseInt(page),
      pageRanges: pageRanges,
    };
    const pageSkip = (pagination.currentPage - 1) * pageLimit;

    let items = await ItemService.getAllItems(status, search, pageSkip, pageLimit);
    return res.render("admin/pages/item/list", {items, countStatus, status, search, pagination});
  };

  //direct form put in
  getForm = async (req, res, next) => {
    let title = "Add - Form";

    const {id} = req.params
    const item = req.params.id ? await ItemService.findId(id) : {};
    if (id) title = "Edit - Form";
    res.render("admin/pages/item/form", { item, title, alert: [] });
  };

  changeStatus = async (req, res, next) => {
    let {id, status} = req.params
    await ItemService.changeStatusById(id, status)
    res.redirect("/admin/item");
  }

  changeOrdering = async (req, res, next) => {

  }

  //save info form (Add or Edit)
  saveForm = [uploadImage , 
    async (req, res, next) => {
    const { id } = req.params;
    await ItemValidate(req);
    const errors = validationResult(req);
    const item = id ? await ItemService.findId(id) : {};

    if (!errors.isEmpty()) {
      return res.render('admin/pages/item/form', { item, title: id ? "Edit - Form" : "Add - Form", alert: errors.array() });
    }

    if (req.file) {
      req.body.image = req.file.filename;
    }
    
    if (!id) {
      await ItemService.save(req.body);
    } else {
      const { name, ordering, status, image } = req.body;
      const updateItem = { name, ordering, status, image };

      if (req.file && item.image) {
        const imagePath = path.join(__dirname, "../../public/uploads", item.image.replace("/uploads/", ""))
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Error deleting image:", err);
          }
        })
      }

      await ItemService.editById(id, updateItem);
    }
    res.redirect("/admin/item");
  }];

  //delete item
  deleteItem = async (req, res, next) => {
    const {id} = req.params
    const item = await ItemService.findId(id)

    if (item && item.image) {
      const imagePath = path.join(__dirname, "../../public/uploads", item.image.replace("/uploads/", ""))
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image:", err)
        }
      });
    }

    await ItemService.deleteById(id)
    res.redirect("/admin/item")
  }
}

module.exports = new ItemController();
