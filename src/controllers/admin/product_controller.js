const ProductService = require('../../services/product_service')

class ProductController {

    getAllProduct = async (req, res, next) => {
        const { status, search} = req.query
        const countStatus = [
            {
              name: "All",
              count: await ProductService.countItemWithStatus(),
              value: "all",
              link: "/admin/product",
              active: status != "inactive" && status != "active",
            },
            {
              name: "Active",
              count: await ProductService.countItemWithStatus("active"),
              value: "active",
              link: "/admin/product?status=active",
              active: status == "active",
            },
            {
              name: "Inactive",
              count: await ProductService.countItemWithStatus("inactive"),
              value: "inactive",
              link: "/admin/product?status=inactive",
              active: status == "inactive",
            },
        ]
        let products = await ProductService.getProducts(status, search);
        res.render('admin/pages/product/listProduct', {products, countStatus})
    }

    getFormProduct = async (req, res, next) => {
      let title = "Add - Form";
      const { id } = req.params
      const product = req.params.id ? await ProductService.findId(id) : {};
      if (id) title = "Edit - Form";
      res.render("admin/pages/product/formProduct", { product, title, alert: [] });
    }

    saveFormProduct = async (req, res, next) => {

      const { id } = req.params;
      if (!id) {
        await ProductService.saveProduct(req.body)
      } else {
        const { name, status, ordering } = req.body;
        const updateItem = { name, status, ordering };
        await ProductService.editById(id, updateItem);
      }
      res.redirect("/admin/item");
    }
}

module.exports = new ProductController()