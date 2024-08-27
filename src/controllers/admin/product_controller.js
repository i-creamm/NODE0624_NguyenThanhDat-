const MainService = require("../../services/product_service");
const CategoryService = require("../../services/category_service");

const {generateCountStatus, generatePagination} = require('../../utils/helper')
const { ItemValidate } = require("../../validation/item_validates");
const { validationResult } = require("express-validator");
const { asyncHandle } =  require('../../utils/asyncHandle')

const updateItem = require("../../utils/upload");
// const uploadImage = updateItem.upload("products","image");
const uploadFiles = updateItem.upload("products", [{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 5 }])


const nameController = 'product'
const linkPrefix = `/admin/${nameController}`
const folderImage = '/products'
const path = require('path')
const fs = require('fs')


class ProductController {
  getAll = async (req, res, next) => {
    const { status, search, page = 1} = req.query;

    //filter all, active, inactive
    const allCount = await MainService.countItemWithStatus()
    const activeCount = await MainService.countItemWithStatus("active")
    const inactiveCount = await MainService.countItemWithStatus("inactive")
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
    const categories = await CategoryService.getAllItems()
    if (id) title = "Edit - Form";
    res.render(`admin/pages/${nameController}/form`, { item, categories, title, alert: [] });
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
  // saveForm = [uploadImage ,
  //   asyncHandle( async (req, res, next) => {

  //   const { id } = req.params;
  //   await ItemValidate(req);
  //   const errors = validationResult(req);
  //   const item = id ? await MainService.findId(id) : {};

  //   if (!errors.isEmpty()) {
  //     return res.render(`admin/pages/${nameController}/form`, { item, title: id ? "Edit - Form" : "Add - Form", alert: errors.array()});
  //   }

  //   if (req.file) {
  //     req.body.image = req.file.filename;
  //   }
    
  //   if (!id) {
  //     await MainService.save(req.body)
  //   } else {
  //     const {name, ordering, status, image , price, detail, idCategory} = req.body;
  //     const updateItem = { name, ordering, status, image , price, detail, idCategory};

  //     if (req.file && item.image) {
  //       const imagePath = path.join(`public/uploads${folderImage}`, item.image.replace(`/uploads`, ""))
  //       fs.unlink(imagePath, (err) => {
  //         if (err) {
  //           console.error("Error deleting image:", err);
  //         }
  //       })
  //     }
  //     await MainService.editById(id, updateItem);
  //   }
  //   res.redirect(`${linkPrefix}`);
  // })];

  saveForm = [uploadFiles,
    asyncHandle(async (req, res, next) => {
      const { id } = req.params;
      await ItemValidate(req);
      const errors = validationResult(req);
      const item = id ? await MainService.findId(id) : {};
  
      if (!errors.isEmpty()) {
        return res.render(`admin/pages/${nameController}/form`, {
          item,
          title: id ? "Edit - Form" : "Add - Form",
          alert: errors.array()
        });
      }

      console.log('Files:', req.files); // Kiểm tra các tệp tin đã được tải lên
  
      if (req.files) {
        if (req.files['image']) {
          req.body.image = req.files['image'][0].filename;
        }
        if (req.files['images']) {
          req.body.images = req.files['images'].map(file => file.filename);
        }
      }
  
      if (!id) {
        await MainService.save(req.body);
      } else {
        const { name, ordering, status, image, images, price, detail, idCategory } = req.body;
        const updateItem = { name, ordering, status, image, images, price, detail, idCategory };
  
        if (req.files['image'] && item.image) {
          const imagePath = path.join(`public/uploads${folderImage}`, item.image.replace(`/uploads`, ""));
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error("Lỗi khi xóa ảnh:", err);
            }
          });
        }
  
        await MainService.editById(id, updateItem);
      }
      res.redirect(`${linkPrefix}`);
    })
  ];

  //delete item
  deleteItem = async (req, res, next) => {
    const {id} = req.params
    const item = await MainService.findId(id)

    if (item && item.image) {
      const imagePath = path.join(`public/uploads${folderImage}`, item.image.replace(`/uploads`, ""))
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

module.exports = new ProductController();
