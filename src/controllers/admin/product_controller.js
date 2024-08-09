const MainService = require('../../services/product_service')
const CategoryService = require('../../services/category_service')
const nameController = 'product'
const updateItem = require("../../utils/upload");
const uploadImage = updateItem.upload(nameController,"image");
const path = require('path')
const fs = require('fs')

class ProductController {

    getAllProduct = async (req, res, next) => {
        const { status, search} = req.query
        const countStatus = [
            {
              name: "All",
              count: await MainService.countItemWithStatus(),
              value: "all",
              link: `/admin/${nameController}`,
              active: status != "inactive" && status != "active",
            },
            {
              name: "Active",
              count: await MainService.countItemWithStatus("active"),
              value: "active",
              link: "/admin/product?status=active",
              active: status == "active",
            },
            {
              name: "Inactive",
              count: await MainService.countItemWithStatus("inactive"),
              value: "inactive",
              link: "/admin/product?status=inactive",
              active: status == "inactive",
            },
        ]
        let products = await MainService.getProducts(status, search);
        res.render('admin/pages/product/listProduct', {products, countStatus})
    }

    getFormProduct = async (req, res, next) => {
      let title = "Add - Form";
      const { id } = req.params
      const product = req.params.id ? await MainService.findId(id) : {};
      if (id) title = "Edit - Form";
      const categories = await CategoryService.getALl();
      res.render("admin/pages/product/formProduct", { product, title, alert: [] , categories });
    }

    saveForm = [uploadImage , 
      async (req, res, next) => {
      const { id } = req.params;
      const item = id ? await MainService.findId(id) : {};
      // if (!errors.isEmpty()) {
      //   return res.render(`admin/pages/${nameController}/formProduct`, { item, title: id ? "Edit - Form" : "Add - Form", alert: errors.array()});
      // }
  
      if (req.file) {
        req.body.image = req.file.filename;
      }
      
      if (!id) {
        await MainService.save(req.body)
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
        await MainService.editById(id, updateItem);
      }
      res.redirect(`/admin/${nameController}`);
    }];
  
}

module.exports = new ProductController()