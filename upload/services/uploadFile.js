'use strict';
const fs = require('fs');
const { NODE_ENV } = process.env;


exports.uploadFileToDB = async (arrayJSoN, model, req, res) => {

    const filePath = process.cwd() + '/uploads/' + req.file.filename;

    try {

        // Save
        await model.insertMany(arrayJSoN).then(() => {
            // Success
            res.status(201).send({ message: `upload csv data into db successfully. ${req.file.originalname} saved.`});
            
            //remove test file
            if(NODE_ENV === 'test'){ fs.unlinkSync(filePath) }

        }).catch((error) => {     
            // Fail
            try {
                //file removed  
                fs.unlinkSync(filePath);
                res.status(401).send({ 
                    message: 'Fail to upload data into db, file is .csv but not correct model', 
                    error: error.message
                });

            } catch(err) {
                res.status(501).send({ 
                    message: 'Fail to upload data into db', 
                    error: err
                });
            }
        });

    } catch (error) {
        res.status(500).send({ message: `Could not get upload file`, error: error})
    }

}