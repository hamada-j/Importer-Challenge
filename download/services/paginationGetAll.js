'use strict';
const MODEL = require('../models/model');
const OPTIONS = require('../utils/entityOptions')

exports.paginationGetAll = async (options, req, res) => {

    const otherOptions = OPTIONS.options(options);
    const limit = otherOptions.limit;
    const page = otherOptions.page;

    if (!isNaN(limit) && !isNaN(page)) {

        try{

            await MODEL
            .find()
            .limit(limit)
            .skip(limit * page)
            //.countDocuments().then((count) => { console.log(count); })
            .then((docArray) => {

                if( docArray.length === 0){

                    res.status(202).json({
                        status: 204,
                        message: 'No more data.',
                        previous: `${process.env.URL}?page=${page - 1}&limit=${limit}`                   
                    });

                } else {
                
                    res.status(206).json({ 
                        next: `${process.env.URL}?page=${page + 1}&limit=${limit}`, 
                        data: docArray 
                    });
                }

            }).catch((error) => {     
                // Fail
                res.status(500).json({ 
                    message: 'Fail to get data from db', 
                    error: error.message});
            });

        } catch (error) {
            res.status(501).json({ message: `Could not get data from db!`, error: error})
        }

    }else {
      
        res.status(400).json({
            message: 'Incorrect URL',
            urlRecommended: `${process.env.URL}?page=0&limit=10`, 
            error: `some query params are wrong; ${options.limit} or ${options.page}`
        });
    }

}