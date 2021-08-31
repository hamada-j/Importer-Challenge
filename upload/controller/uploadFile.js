'use strict';
const fs = require('fs');
const multer = require('multer');


const csv = require("csvtojson");
//const CSV = require('fast-csv');

const DB = require('../services/uploadFile');
const HEADERS = require('../utils/changeHeader');
const MODEL = require('../models/model');

// multer upload Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  }
})
// filter for csv file
const csvFilter = (req, file, cb) => {
  if (file.mimetype.includes('csv')){
    cb(null, true)
  }else {
    cb(`Please upload only csv file! ${file.originalname} is ${file.mimetype} not .csv file`, false)
  }
}

// Multer 
const multerUploader = multer({ storage: storage, fileFilter: csvFilter});
const upload = multerUploader.single('file');


exports.uploadFile = async (req, res) => {
  
  upload(req, res, function (err) {

    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log('err multer', err);
      return res.status(402).send({ 
          message: 'Please upload a csv file!!', error: err
        })
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(406).send({ 
          message: 'Please upload a csv file!!!', error: err
        }) 
    }

    const file = req.file;

    try {
      // Other errors occurred
      if (file == undefined || !file ){
        return res.status(400).send({ 
          message: 'Please upload a csv file!!!!'
        })
      }

      // Everything went fine.
      let csvData = [];
      let filePath = process.cwd() + '/uploads/' + req.file.filename;

      // First option with 'csvtojson' ----> time 11000 ms
      csv().fromFile(filePath).then(async  (jsonArrayOfObjects) => {

        csvData = HEADERS.changeHeader(jsonArrayOfObjects);
        await DB.uploadFileToDB(csvData, MODEL, req, res);

      }).catch((error) => { 

        res.status(500).send({ message: `Could not upload the file: ${ req.file.originalname }`, error: error })
      
      });;

      // Second option with 'fast-csv' ----> time 13000 ms
      // fs.createReadStream(filePath)
      //   .pipe(CSV.parse({headers: true}))
      //   .on('error', (error)=> { throw error.message})
      //   .on('data', (row) => { csvData.push(row)})
      //   .on('end', async () => { 
      //     let jsonData = HEADERS.changeHeader(csvData);
      //     await DB.uploadFileToDB(jsonData, MODEL, req, res);
      //   });

    } catch (error){
      console.log('catch error: ', error)
      res.status(500).send({ message: `Could not upload the file: ${ req.file.originalname }`, error: error })
    }

  });

}