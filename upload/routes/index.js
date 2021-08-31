'use strict';
const express = require('express');
const router = express.Router();
const uploadController = require("../controller/uploadFile");


/* POST csv file route. */
router.post('/csv', uploadController.uploadFile);


module.exports = router;