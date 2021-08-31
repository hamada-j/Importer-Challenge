'use strict';
const express = require('express');
const router = express.Router();
const getController = require("../controller/getData");

router.get('/', getController.getData);

module.exports = router;
