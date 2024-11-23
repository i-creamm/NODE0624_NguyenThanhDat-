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
const fs = require('fs');


class ProductController {

  getAll = async (req, res, next) => {
    const { status, category, search, page = 1} = req.query;

    //filter all, active, inactive
    const [allCount, activeCount, inactiveCount] = await Promise.all([
      MainService.countItemWithStatus(),
      MainService.countItemWithStatus("active"),
      MainService.countItemWithStatus("inactive")
    ])
    const countStatus = await generateCountStatus(status, linkPrefix, allCount, activeCount, inactiveCount)

    //filter category
    const categories = await CategoryService.getAllItems()

    // pagination
    let totalItems = status == 'active' ? activeCount : status == 'inactive' ? inactiveCount : allCount;
    const pagination = generatePagination(totalItems, page, 5);

    let items = await MainService.getAllItems(status, category, search, pagination.pageSkip, pagination.pageLimit);
    return res.render(`admin/pages/${nameController}/list`, {items, category, categories, countStatus, status, search, pagination, message: {}});
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

  changeSpecial = async (req, res, next) => {
    let {id} = req.params
    let {isSpecial} = req.query
    await MainService.changeIsSpecial(id, isSpecial)
    res.redirect(`${linkPrefix}`);
  }

  changeNew = async (req, res, next) => {
    let {id} = req.params
    let {newProduct} = req.query
    await MainService.changeNewProduct(id, newProduct)
    res.redirect(`${linkPrefix}`);
  }

  saveForm = [uploadFiles,
    asyncHandle(async (req, res, next) => {
      const { id } = req.params;
      await ItemValidate(req);
      const errors = validationResult(req);
      const item = id ? await MainService.findId(id) : {};

      //calc

      if (req.body.type_discount === '%') {
        req.body.price_discount = 0
        req.body.price_discount = ((req.body.price * (100 - req.body.discount)) / 100)
      } else if (req.body.type_discount === 'price') {
        req.body.discount = 0;
        req.body.discount = Math.round(((req.body.price - req.body.price_discount) * 100) / req.body.price, 2) 
      } else {
        req.body.price_discount = 0
        req.body.price_discount = 0
        return res.status(400).json({ message: 'Loại chiết khấu không hợp lệ.' });
      }

      //end calc

      req.body.isSpecial = req.body.isSpecial === 'on';
      req.body.newProduct = req.body.newProduct === 'on';

      if (!errors.isEmpty()) {
        return res.render(`admin/pages/${nameController}/form`, {
          item,
          title: id ? "Edit - Form" : "Add - Form",
          alert: errors.array()
        });
      }

      if (req.files) {
        if (req.files['image']) {
          req.body.image = req.files['image'][0].filename;

        }
        if (req.files['images']) {
          req.body.images = req.files['images'].map(file => file.filename);
        }
      }


      let dataAdd;
      if (!id) {
        dataAdd = await MainService.save(req.body);
        req.flash("success", "Added successfully")
      } else {
        const {name, ordering, status, image, images, isSpecial, newProduct, price, discount, type_discount, price_discount, detail, idCategory } = req.body;
        const updateItem = {name, ordering, status, image, images, isSpecial, newProduct, price, discount, type_discount, price_discount, detail, idCategory };

        if (req.files['image'] && item.image) {
          const imagePath = path.join(`public/uploads${folderImage}`, item.image.replace(`/uploads`, ""));
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error("Lỗi khi xóa ảnh:", err);
            }
          });
        }
  
        await MainService.editById(id, updateItem);
        req.flash("success", "Edited successfully")
      }

      // if(!fs.existsSync(`public/uploads${folderImage}/${id ? id : dataAdd.id}`)) {
      //   fs.mkdirSync(`public/uploads${folderImage}/${id ? id : dataAdd.id}`)
      // }
      // if(req.files.image) {
      //   fs.rename(`public/uploads${folderImage}/${req.files.image[0].filename}`, `public/uploads${folderImage}/${id ? id : dataAdd.id}/${req.files.image[0].filename}` , (e) =>  {
      //     console.log('succ')
      //   })
      // }


      res.redirect(`${linkPrefix}`);
    })
  ];

  //delete item
  deleteItem = async (req, res, next) => {
    const {id} = req.params
    const item = await MainService.findId(id)

    if (item && item.image) {
      const imagePath = path.join(`public/uploads${folderImage}`+ "/" + `${id}`, item.image.replace(`/uploads`, ""))
      console.log(imagePath)
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
