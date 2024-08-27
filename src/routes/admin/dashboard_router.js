var express = require('express');
var router = express.Router();

const { asyncHandle } = require('../../utils/asyncHandle')

const DashboardController = require('../../controllers/admin/dashboard_controller');

router.get('/', asyncHandle(DashboardController.getAll))

module.exports = router

