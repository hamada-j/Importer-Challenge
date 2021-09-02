'use strict';

const sector = function () {

  // Idea: add all sectors dynamically after upload de doc by save them in file in server

  let arraySector = [
    'Waste',
    'Total including LULUCF',
    'Solvent sector',
    'Other Production',
    'Other',
    'Mineral Products',
    'Land-Use Change and Forestry',
    'Industrial process',
    'Fugitive Emissions from Solid Fuels',
    'Energy',
    'Chemical Industries',
    'Agriculture',
    'Total excluding LUCF',
    'Metal Production',
    'Fuel Combustion Activities',
    'Fugitive Emissions from Oil and Gas'
  ];
   
  return arraySector;
}

module.exports = { sector: sector };