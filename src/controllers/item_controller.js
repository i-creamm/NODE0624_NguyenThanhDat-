const ItemService = require("../services/item_service");
const ItemModel = require('../models/item_model');


class ItemController {

    getAll = async (req, res, next) => {
        const {status , search } = req.query
        const countStatus = [
            {
                name : "All",
                count: await ItemService.countItemWithStatus(),
                value: "all",
                class: "default",
                link : '/admin/item',
                active: status != 'inactive' && status != 'active',
            },
            {
                name : "Active",
                count: await ItemService.countItemWithStatus('active'),
                value: "active",
                class: "default",
                link : '/admin/item?status=active',
                active: status == 'active',
            },
            {
                name : "Inactive",
                count: await ItemService.countItemWithStatus('inactive'),
                value: "inactive",
                class: "default",
                link : '/admin/item?status=inactive',
                active: status == 'inactive',
            }
        ]

        let items = await ItemService.getAllItems(status ,search);
        return res.render('admin/pages/item/list', { items, countStatus, status, search });
    }


    //direct form put in
    getForm = async (req, res, next) => {
        const item = req.params.id ? await ItemService.findId(req.params) : {}
        res.render('admin/pages/item/form', {item})
    }

    //save info form (Add or Edit)
    saveForm = async (req, res, next) => {
        const { id } = req.params 
        if (!id){
            await ItemService.save(req.body)
        } else {
            const {name, ordering, status} = req.body
            const updateItem = {name, ordering, status}
            await ItemService.editById(id, updateItem)
        }
        res.redirect('/admin/item')
    }

    //delete item
    deleteItem = async (req, res, next) => {
        await ItemService.deleteById(req.params)
        res.redirect('/admin/item')
    }
}

module.exports = new ItemController();