'use strict';

const options = {
    swaggerDefinition: {
        "description": "Build a small REST API Reads data from database and serves responses as JSON documents. Filters on the data are implemented, with query parameters.",
        "contact": {
            name: "Hamada",
            github: "https://github.com/hamada-j/Importer-Challenge.git"
        },
        
        "info": {
            "title": "Importer-Challenge" ,
            "version": "1.0.0"
        },
        servers: [process.env.URL],
        responses: {
            '404': {
                description: "Not Found."
            },
            '200': {
                description: "Success response."
            },
            '202': {
                description: "Success response. Status: 204. No more data."
            },
            '206': {
                description: "Success response. Partial data."
            },
            '400': {
                description: "Information is missing or invalid. Incorrect URL"
            },
            '500': {
                description: "Fail to get data from DB or Server"
            },
            '501': {
                description: "Could not get data from DB or Server"
            }

        }
    },

    "apis": ['./routes/index.js'] // Path to the API docs

};

module.exports = options