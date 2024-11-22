const MainService = require("../../services/order_service");
const CategoryService = require("../../services/category_service");

const {generateCountStatus, generatePagination} = require('../../utils/helper')

const updateItem = require("../../utils/upload");
const uploadFiles = updateItem.upload("products", [{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 5 }])

const nameController = 'order'
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

  //delete item
//   deleteItem = async (req, res, next) => {
//     const {id} = req.params
//     const item = await MainService.findId(id)

//     if (item && item.image) {
//       const imagePath = path.join(`public/uploads${folderImage}`+ "/" + `${id}`, item.image.replace(`/uploads`, ""))
//       console.log(imagePath)
//       fs.unlink(imagePath, (err) => {
//         if (err) {
//           console.error("Error deleting image:", err)
//         }
//       });
//     }

//     await MainService.deleteById(id)
//     res.redirect(`${linkPrefix}`)
//   }

}

module.exports = new ProductController();
