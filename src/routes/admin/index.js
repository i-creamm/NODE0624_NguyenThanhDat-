var express = require('express');
var router = express.Router();

router.use('/item',require('./item_routers'))
router.use('/',require('./dashboard_router'))

module.exports = router