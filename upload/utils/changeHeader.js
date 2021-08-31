'use strict';
const changeHeader = function (arrayJSoN) {
    
    // Change header
    const arrayResultsJSoN = arrayJSoN.map((ele) => {
        ele['parentSector'] = ele["Parent sector"];
        delete ele["Parent sector"];
        return ele;
    });
    
  return arrayResultsJSoN;
}

module.exports = { changeHeader: changeHeader };