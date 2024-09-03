const MainService = require("../../services/setting_service");


const nameController = 'setting'
const linkPrefix = `/admin/${nameController}`
const folderImage = '/sliders'
const path = require('path')
const { asyncHandle } =  require('../../utils/asyncHandle')
const fs = require('fs')

const updateItem = require("../../utils/upload");
const upload = updateItem.uploadImage("sliders","image");
// const uploadFiles = updateItem.upload("sliders", [{ name: 'image', maxCount: 1 }])



class SliderController {
  getAll = async (req, res, next) => {
    const setting = await MainService.getAllSetting()
    res.render(`admin/pages/${nameController}/list`, {setting})
  };

  //direct form put in
  getForm = async (req, res, next) => {
    let title = "Add - Form";
    const {id} = req.params
    const item = req.params.id ? await MainService.findId(id) : {}
    if (id) title = "Edit - Form";
    res.render(`admin/pages/${nameController}/form`, { item, title, alert: [] })
  };

  //save info form (Add or Edit)
  saveForm = [upload , 
    asyncHandle( async (req, res, next) => {
    const { id } = req.params;
    // const item = id ? await MainService.findId(id) : {};

    if (req.file) {
      req.body.image = req.file.filename;
    }
    await MainService.save(req.body)

    // if (!id) {
    //   await MainService.save(req.body)
    // } else {
    //   const { name, ordering, status, image } = req.body;
    //   const updateItem = { name, ordering, status, image };

    //   if (req.file && item.image) {
    //     const imagePath = path.join(`public/uploads${folderImage}`, item.image.replace(`/uploads`, ""))
    //     fs.unlink(imagePath, (err) => {
    //       if (err) {
    //         console.error("Error deleting image:", err);
    //       }
    //     })
    //   }
    //   await MainService.editById(id, updateItem);
    // }

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

module.exports = new SliderController();