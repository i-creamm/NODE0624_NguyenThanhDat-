const MainService = require("../../services/brand_service");
const {generateCountStatusUser, generatePagination} = require('../../utils/helper')

const nameController = 'brand'
const linkPrefix = `/admin/${nameController}`
const folderImage = '/brands'

const path = require('path')
const { asyncHandle } =  require('../../utils/asyncHandle')
const fs = require('fs')

const updateItem = require("../../utils/upload");
const upload = updateItem.uploadImage("brands","image");
// const uploadFiles = updateItem.upload("sliders", [{ name: 'image', maxCount: 1 }])



class BrandController {
  getAll = async (req, res, next) => {
    const { status, search, page = 1} = req.query;

    //filter all, active, inactive
    const [allCount, activeCount, inactiveCount] = await Promise.all([
      MainService.countItemWithStatus(),
      MainService.countItemWithStatus("active"),
      MainService.countItemWithStatus("inactive")
    ])
    const countStatus = await generateCountStatusUser(allCount, activeCount, inactiveCount)

    // pagination
    let countRecords = status == 'active' ? activeCount : status == 'inactive' ? inactiveCount : allCount;
    const objectPagination = await generatePagination(page, 5, 3, countRecords)
    // End Pagination
    
    let items = await MainService.getAllItems(status, search, countStatus, objectPagination.limitItems, objectPagination.pageSkip);
    return res.render(`admin/pages/${nameController}/list`, {items, search, countStatus, pagination: objectPagination});
    
  };

  //direct form put in
  getForm = async (req, res, next) => {
    let title = "Add - Form";
    const {id} = req.params
    const item = req.params.id ? await MainService.findId(id) : {}
    if (id) title = "Edit - Form";
    res.render(`admin/pages/${nameController}/form`, { item, title, alert: [] })
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
  saveForm = [upload , 
    asyncHandle( async (req, res, next) => {
    const { id } = req.params;
    const item = id ? await MainService.findId(id) : {};

    if (req.file) {
      req.body.image = req.file.filename;
    }
    
    if (!id) {
      await MainService.save(req.body)
    } else {
      const { name, ordering, status, image } = req.body;
      const updateItem = { name, ordering, status, image };

      if (req.file && item.image) {
        const imagePath = path.join(`public/uploads${folderImage}`, item.image.replace(`/uploads`, ""))
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Error deleting image:", err);
          }
        })
      }
      await MainService.editById(id, updateItem);
    }
    res.redirect(`${linkPrefix}`);
  })];

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

module.exports = new BrandController();