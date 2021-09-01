'use strict';

exports.handleError = (res) => {

    res.status(400).json({
        message: 'Incorrect URL',
        urlRecommended: `${process.env.URL}` 
    });

}