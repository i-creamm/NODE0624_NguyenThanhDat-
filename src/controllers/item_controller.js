const ItemService = require("../services/item_service");
const ItemModel = require('../models/item_model');


class ItemController {

    getAll = async (req, res, next) => {
        const {status = 'all', search = ''} = req.query
        const countStatus = [
            {
                name : "All",
                count: await ItemService.countItemWithStatus(),
                value: "all",
                class: "default"
            },
            {
                name : "Active",
                count: await ItemService.countItemWithStatus('active'),
                value: "active",
                class: "default"
            },
            {
                name : "Inactive",
                count: await ItemService.countItemWithStatus('inactive'),
                value: "inactive",
                class: "default"
            }
        ]

        let items;
        if (status !== 'all') {
            items = await ItemService.getItemsByStatusAndSearch(status, search);
        } else {
            items = await ItemService.getAllItems(search);
        }
        return res.render('admin/pages/item/list', { items, countStatus, status, search });
    }


    //direct form put in
    getForm = async (req, res, next) => {
        const item = req.params.id ? await ItemService.findId(req.params) : {}
        res.render('admin/pages/item/form', {item})
    }

    //save info form (Add or Edit)
    saveForm = async (req, res, next) => {
        const item = req.params.id 
        if (!item){
            await ItemService.save(req.body)
        } else {
            const {name, ordering, status} = req.body
            const updateItem = {name, ordering, status}
            await ItemService.editById(req.params, updateItem)
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