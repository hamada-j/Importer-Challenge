'use strict';
const express = require('express');
const router = express.Router();
const uploadController = require("../controller/uploadFile");


/**
* @swagger
* tags:
*   name: Importer-Challenge
*   description: Expects a CSV payload and saves the data to a MongoDB database.
*/

/**
* @swagger
* /csv:
*   post:
*     summary: "CSV payload."
*     tags: [Post]
*     consumes:
*       - multipart/form-data
*     parameters:
*       - in: formData
*         name: file
*         type: file
*         description: Upload a .csv file with model of emission.csv.
*     responses:
*       201:
*         description: Success response. Data created/saved in server/db.
*       401:
*         description: File type .csv but incorrect model.
*       406:
*         description: Information is missing. No file or incorrect file type.
*       404:
*         description: Not Found.
*       500:
*         description: Internal Server Error. Fail to save data in DB or Server.
*       501:
*         description: Could not upload file on Server or data in db.
*
*/

router.post('/csv', uploadController.uploadFile);


module.exports = router;
