'use strict';
const mongoose = require('mongoose');

console.log(`Before connect --> \n\n\n\n`);

const { DB_NAME, DB_TEST, NODE_ENV, DB_URL_DEV, DB_URL_PROD } = process.env;
const connectingURL = NODE_ENV === 'test' ? DB_TEST : DB_NAME;
let HOST = DB_URL_DEV
let state = 'dev'

if (NODE_ENV === "production") { HOST = DB_URL_PROD; state = 'prod'; }

mongoose.connect(
  `mongodb://${HOST}/${connectingURL}`, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    //autoIndex: false

}).then((res) => {

  console.log(`\n\n\nConnected to MongoDB in ${NODE_ENV}\n\n${res.STATES.connected}\n\n` );
  //console.log(`Connected to MongoDB` );

}).catch((err) => {

  console.log(`DesConnect from MongoDB \n${err}\n`);
  //console.log(`DesConnect from MongoDB`);


});;

