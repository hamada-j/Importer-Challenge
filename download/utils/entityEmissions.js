'use strict';

var entityEmissions = {
    columns : ['Country', 'Sector', 'parentSector'],
}

for(let year = 1850 ; year < 2015; year++ ){
    entityEmissions.columns.push(year.toString())
}

exports.entity = {entityEmissions: entityEmissions}