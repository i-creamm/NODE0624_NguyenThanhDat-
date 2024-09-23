const MainService = require("../../services/setting_service");
const nameController = 'setting'

const folderImage = '/settings'
const path = require('path')
const { asyncHandle } =  require('../../utils/asyncHandle')
const fs = require('fs')

const updateItem = require("../../utils/upload");
const upload = updateItem.uploadImage("settings","logo");

class SettingController {
  getAll = async (req, res, next) => {

    const setting = await MainService.getAllSetting()
    let stringParse = JSON.parse(setting.name)
    res.render(`admin/pages/${nameController}/list`, {setting : stringParse})
    
  };
  
  setting =[upload, asyncHandle(async (req, res, next) => {

    req.file ? req.body.image = req.file.filename : req.body.image = req.body.old_image

    const setting = await MainService.getAllSetting()
    let item = JSON.parse(setting.name)

    if (req.file && item.image) {
      const imagePath = path.join(`public/uploads${folderImage}`, item.image.replace(`/uploads`, ""))
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image:", err);
        }
      })
    }

    await MainService.update(JSON.stringify(req.body))
    res.redirect('/admin/setting')
  })]
}

module.exports = new SettingController();