'use strict';
const MODEL = require('../models/model');
const SECTOR = require('../utils/entitySector');
const SIMILAR = require('../utils/similarString');
const OPTIONS = require('../utils/entityOptions')

exports.getBySector = async (options, req, res) => {

    const sectors = SECTOR.sector();
    const arraySectors = [];
    let sector;
    

    // percent of similarities sector and position
    for(let i = 0; i < sectors.length; i++){  
        arraySectors.push(
            sectors[i], 
            parseInt(
                SIMILAR.similarString(
                    sectors[i].replace(/\s+/g, '').toLowerCase(),
                    options.sector.toLowerCase()
                )
            )
        )      
    };

    let temp = 0;
    let position;

    arraySectors.forEach((element,i) => {
        if (temp < element) {
            temp = element;
            position = i
        }
    });
     
    sector = arraySectors[position - 1];

    const otherOptions = OPTIONS.options(options);
    const skipData = otherOptions.limit * otherOptions.page;  

    try{
        
        await MODEL
            .aggregate([
                    {
                        $match: {
                        Sector: sector,
                        },
                    },
                    {
                        $sort: {
                        Country: 1,
                        },
                    },
                    {
                        $limit: skipData + otherOptions.limit,
                    },
                    { $skip : skipData }

            ]).then((docArray) => {

                if ( docArray.length === 0) {

                    res.status(202).json({
                        status: 204,
                        message: 'No more data.',
                        previous: `${process.env.URL}?sector=${sector.replace(/\s+/g, '').toLowerCase()}&page=${otherOptions.page - 1}&limit=${otherOptions.limit}`                        
                    });
        
                } else {

                     res.status(206).json({
                        next: `${process.env.URL}?sector=${sector.replace(/\s+/g, '').toLowerCase()}&page=${otherOptions.page + 1}&limit=${otherOptions.limit}`, 
                        data: docArray 
                    });
                }

            }).catch((error) => {     
                // Fail
                res.status(500).json({ 
                    message: 'Fail to get data from db!!', 
                    error: error.message});
            });

    } catch (error) {
        res.status(501).json({ message: `Could not get data from db!`, error: error})
    }

}


            
