'use strict';

exports.getData = async (req, res, next) =>  {

    let options = req.query;
    res.send({ option: options })
 
}