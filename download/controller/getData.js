'use strict';
const ALL = require('../services/paginationGetAll');
const ID = require('../services/getById');
const YC = require('../services/paginationGetByCountrySortByYear');
const COUNTRY = require('../services/paginationGetByCountry');
const SECTOR = require('../services/paginationGetSector');
const HR = require('../utils/handleError');

exports.getData = async (req, res, next) =>  {

  const options = req.query;

  if (Object.keys(options).length === 0){ 
    ALL.paginationGetAll(options, req, res)   
  } else {

    switch (true) {
      
      case 'id' in options:
        ID.getById(options, req, res);
      break;

      case 'country' in options && 'year' in options:
        YC.getByCountrySortByYear(options, req, res);
      break;

      case 'country' in options: 
        COUNTRY.getByCountry(options, req, res)
      break;

      case 'sector' in options:
        SECTOR.getBySector(options, req, res)
      break;

      case 'page' in options && 'limit' in options:
        ALL.paginationGetAll(options, req, res)
      break;
      
      case false: 
        HR.handleError(res)
      break; 

      default:
      HR.handleError(res)
    }

  }
 
}