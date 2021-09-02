'use strict';
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
require("./db/mongoDB");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = require('./libs/swagger');
/** ==========================================
 
                  ROUTING
 
==========================================**/
const indexRouter = require('./routes/index');
const app = express();
/** ==========================================
 
                  Swagger
 
==========================================**/
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
/** ==========================================
 
                  Data Base
 
==========================================**/
mongoose.Promise = global.Promise;
/** ==========================================
              HEADERS --- CORS   /  PARSE   
          
==========================================**/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authoritation"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT,PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});
/** ==========================================
 
                Route
 
==========================================**/
app.use('/', indexRouter);
/** ==========================================
 
                Error handler
 
==========================================**/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404).send({ 
      error: '404: Not Found',
      message: 'post your file in http://localhost:3001/api-docs'
    });
});

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // send the error
  res.status(err.status || 500);
});
/** ==========================================
 
                App
 
==========================================**/
module.exports = app;
