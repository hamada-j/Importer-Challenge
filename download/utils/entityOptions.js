'use strict';
const options = function (op) {

  let l = Math.abs(parseInt(op.limit));
  let p = Math.abs(parseInt(op.page));
  let options;

  if (!isNaN(l) && !isNaN(p)){

    options = {
        limit: l,
        page: p
      };

  } else {

    options = {
      limit: 10,
      page: 0
    };

  }
  
  return options;
}

module.exports = { options: options };
