var express = require('express');
var router = express.Router();

// router.use('/item', require('./item_routers'))
router.use('/admin', require('./admin'))
router.use('/home', require('./frontend'))

module.exports = router;
