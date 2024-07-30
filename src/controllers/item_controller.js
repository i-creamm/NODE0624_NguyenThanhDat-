const ItemService = require("../services/item_service");
const { ItemValidate } = require("../validation/item_validates");
const { validationResult } = require("express-validator");
const updateItem = require("../utils/upload");
const uploadImage = updateItem.upload("image");

class ItemController {
  getAll = async (req, res, next) => {
    const { status, search, page = 1 } = req.query;
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
    ];

    const pageLimit = 3;
    const pageRanges = 3;
    let allItems = await ItemService.getAllItemsByStatus(status);
    const totalItems = allItems.length;
    const pagination = {
      pageLimit: pageLimit,
      totalItems: totalItems,
      totalPages: Math.ceil(totalItems / pageLimit),
      currentPage: parseInt(page),
      pageRanges: pageRanges,
    };
    const pageSkip = (pagination.currentPage - 1) * pageLimit;
    let items = await ItemService.getAllItems(
      status,
      search,
      pageSkip,
      pageLimit
    );
    return res.render("admin/pages/item/list", {
      items,
      countStatus,
      status,
      search,
      pagination,
    });
  };

  //direct form put in
  getForm = async (req, res, next) => {
    let title = "Add - Form";
    const item = req.params.id ? await ItemService.findId(req.params) : {};
    if (req.params.id) title = "Edit - Form";
    res.render("admin/pages/item/form", { item, title });
  };

  //save info form (Add or Edit)
  saveForm = [
    uploadImage,
    async (req, res, next) => {
      await ItemValidate(req);
      const result = validationResult(req);
      if (result) {
        res.send(result.array());
        return;
      }

      if (req.file) {
        req.body.image = req.file.filename;
      }
      const { id } = req.params;
      if (!id) {
        await ItemService.save(req.body);
      } else {
        const { name, ordering, status, image } = req.body;
        const updateItem = { name, ordering, status, image };
        await ItemService.editById(id, updateItem);
      }
      res.redirect("/admin/item");
    },
  ];

  //delete item
  deleteItem = async (req, res, next) => {
    await ItemService.deleteById(req.params);
    res.redirect("/admin/item");
  };
}

module.exports = new ItemController();
