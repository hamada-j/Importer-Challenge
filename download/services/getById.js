'use strict';
const MODEL = require('../models/model');

exports.getById = async (options, req, res) => {

    try{
        // by id
         await MODEL
         .findById(options.id)
         .then((doc) => {

          // Success
          res.status(200).json(doc); 

        }).catch((error) => {  

          // Fail
          res.status(500).json({ 
            message: `Fail to get data for this id: ${options.id}`, 
            error: error.message});
            
        });

    } catch (error) {
            res.status(501).json({ message: `Could not get data from db!`, error: error})
    }

}