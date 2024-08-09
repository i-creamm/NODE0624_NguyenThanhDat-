const CategoryService = require('../../services/category_service')

class CategoryController {

    getAllCategory = async (req, res, next) => {
        const { categoryStatus, search} = req.query
        const countStatus = [
            {
              name: "All",
              count: await CategoryService.countItemWithStatus(),
              value: "all",
              link: "/admin/category",
              active: categoryStatus != "inactive" && categoryStatus != "active",
            },
            {
              name: "Active",
              count: await CategoryService.countItemWithStatus("active"),
              value: "active",
              link: "/admin/category?status=active",
              active: categoryStatus == "active",
            },
            {
              name: "Inactive",
              count: await CategoryService.countItemWithStatus("inactive"),
              value: "inactive",
              link: "/admin/category?status=inactive",
              active: categoryStatus == "inactive",
            },
        ]
        let categories = await CategoryService.getAllCategory(categoryStatus, search);
        res.render('admin/pages/category/listCategory', {categories, countStatus})
    }

    getFormCategory = async (req, res, next) => {
      let title = "Add - Form";
      const { id } = req.params
      const category = req.params.id ? await CategoryService.findId(id) : {};
      if (id) title = "Edit - Form";
      res.render("admin/pages/category/formCategory", { category, title, alert: [] });
    }

    saveFormCategory = async (req, res, next) => {
        const { id } = req.params
        if (!id) {
            await CategoryService.saveCategory(req.body)
            console.log(req.body)
        } else {
            const {name, status, ordering} = req.body;
            const updateItem = {name, status, ordering};
            await CategoryService.editById(id, updateItem);
        }
        res.redirect("/admin/category");
    }
}

module.exports = new CategoryController()