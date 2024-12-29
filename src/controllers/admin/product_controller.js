const MainService = require("../../services/product_service");
const CategoryService = require("../../services/category_service");
const BrandService = require('../../services/brand_service')
const {generateCountStatusUser, generatePagination} = require('../../utils/helper')
const { ItemValidate } = require("../../validation/item_validates");
const { validationResult } = require("express-validator");
const { asyncHandle } =  require('../../utils/asyncHandle')
const updateItem = require("../../utils/upload");
const uploadFiles = updateItem.upload("products", [{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 5 }])
const nameController = 'product'
const linkPrefix = `/admin/${nameController}`
const folderImage = '/products'
const path = require('path')
const fs = require('fs');


class ProductController {

  getAll = async (req, res, next) => {
    const {status, search, page = 1} = req.query
    console.log(status)

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
    const objectPagination = await generatePagination(page, 5, 3, countRecords)
    // End Pagination

    const categories = await CategoryService.findAllName()
    const brands = await BrandService.findAllName()

    

    let items = await MainService.getAllItems(status, search, countStatus, objectPagination.limitItems, objectPagination.pageSkip);
    return res.render(`admin/pages/${nameController}/list`, {items,categories, brands, search, countStatus, pagination: objectPagination});

  };
  
  getDetail = async (req, res, next) => {
    const {id} = req.params
    const detailProduct = await MainService.findId(id)
    res.render(`admin/pages/${nameController}/detail`, {detail: detailProduct});
  }

  getForm = async (req, res, next) => {
    let title = "Add - Form";
    const {id} = req.params

    const item = id ? await MainService.findId(id) : { idCategory: null , idBrand: null };
  
    const categories = await CategoryService.findAllName()
    const brands = await BrandService.findAllName()

    if (id) title = "Edit - Form";
    res.render(`admin/pages/${nameController}/form`, { item, categories, brands, title, alert: [] });
  };

  changeStatusOrOrdering = async (req, res, next) => {
    const {id, status, ordering} = req.params

    if(status){
      await MainService.changeStatusById(id, status)
      return res.redirect('back');
    }

    if(ordering){
      await MainService.changeOrderingById(id, parseInt(ordering))
      return res.redirect(`${linkPrefix}`);
    } 
  }

  changeCategoryOrBrand = async (req, res, next) => {
    const{id, idCategory, idBrand} = req.params
    if(idCategory){
      await MainService.changeCategory(id, idCategory)
      return res.redirect(`back`); 
    }

    if(idBrand){
      await MainService.changeBrand(id, idBrand)
      return res.redirect(`back`); 
    }
  }

  showDisplay = async (req, res, next) => {
    const {id} = req.params
    const {isSpecial, newProduct} = req.query

    if(isSpecial){
      await MainService.changeIsSpecial(id, isSpecial)
      return res.redirect(`back`);
    }

    if(newProduct){
      await MainService.changeNewProduct(id, newProduct)
      return res.redirect(`back`);
    }

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
        const {name, ordering, status, image, images, isSpecial, newProduct, price, discount, type_discount, price_discount, detail, idCategory, idBrand } = req.body;
        const updateItem = {name, ordering, status, image, images, isSpecial, newProduct, price, discount, type_discount, price_discount, detail, idCategory, idBrand };

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
