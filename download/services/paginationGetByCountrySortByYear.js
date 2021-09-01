'use strict';
const MODEL = require('../models/model');
const OPTIONS = require('../utils/entityOptions')

exports.getByCountrySortByYear = async (options, req, res) => {
 
    let year = Math.abs(parseInt(options.year));
    let country = options.country.toUpperCase() 
    let otherOptions = OPTIONS.options(options);

    if (!isNaN(year) && year >= 1850 && year <= 2014){

         try {

          await MODEL
          .find( { Country: country})
          .sort({ year: 1 })
          .limit(otherOptions.limit)
          .skip(otherOptions.limit * otherOptions.page)
          .then((docArray) => {

            if( docArray.length === 0){

                res.status(202).json({
                    status: 204,
                    message: 'No more data.',
                    previous: `${process.env.URL}?country=${country}&year=${year}&page=${otherOptions.page - 1}&limit=${otherOptions.limit}`
                    
                });

            } else {

                res.status(206).json({
                    next: `${process.env.URL}?country=${country}&year=${year}&page=${otherOptions.page + 1}&limit=${otherOptions.limit}`, 
                    data: docArray
                });
            }       

          }).catch((error) => {     
              // Fail
              res.status(500).json({ 
                  message: 'Fail to get data from db', 
                  error: error.message
            });

          });

        } catch (error) {
            res.status(501).json({ message: `Could not get data from db!`, error: error})
        }
    }else{
        res.status(400).json({
            message: 'Incorrect URL',
            urlRecommended: `${process.env.URL}?country=aia&year=2000`, 
            error: `some query params are wrong; ${options.country} or ${options.year}` });
    }

}