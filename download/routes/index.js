'use strict';
const express = require('express');
const router = express.Router();
const getController = require("../controller/getData");

/**
* @swagger
* tags:
*   name: Importer-Challenge
*   description: Build a small REST API Reads data from database and serves responses as JSON documents.
*/

/**
* @swagger
* /:
*   get:
*     summary: "Get data. Filters on the data are implemented, with query parameters."
*     tags: [Get]
*     produces:
*       - application/json:
*         content:
*           application/json:
*             schema:
*               type: object
*     parameters:
*       - in: query
*         name: page
*         schema:
*           type: integer
*         description: The number of page.
*       - in: query
*         name: limit
*         schema:
*           type: integer
*         description: The number of items to get.
*       - in: query
*         name: id
*         schema:
*           type: string
*         description: ID of a doc in db.
*       - in: query
*         name: country
*         schema:
*           type: string
*         description: Name of the country (USA, AIA ...) to get only for that country.
*       - in: query
*         name: year
*         schema:
*           type: string
*         description: Year for sort data by country.
*       - in: query
*         name: sector
*         schema:
*           type: string
*         description: Sort data by Sector of emissions
*     responses:
*       200:
*         description: Success response.
*       202:
*         description: Success response. No more data.
*       206:
*         description: Success response. Partial data.
*       400:
*         description: Information is missing or invalid. Incorrect URL
*       404:
*         description: Not Found.
*       500:
*         description: Internal Server Error. Fail to get data from DB or Server.
*       501:
*         description: Could not get data from DB or Server
*
*/

router.get('/', getController.getData);

module.exports = router;
