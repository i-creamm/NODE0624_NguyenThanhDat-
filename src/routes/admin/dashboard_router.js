var express = require('express');
var router = express.Router();

const DashboardController = require('../../controllers/dashboard_controller');

router.get('/', DashboardController.getAll)

module.exports = router

