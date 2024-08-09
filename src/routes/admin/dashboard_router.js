var express = require('express');
var router = express.Router();

const DashboardController = require('../../controllers/admin/dashboard_controller');

router.get('/', DashboardController.getAll)

module.exports = router

