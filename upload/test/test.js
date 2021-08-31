'use strict';
const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');

const MODEL = require('../models/model');

const api = supertest(app);


beforeEach(async (done) => {
  try {

    await MODEL.deleteMany({}, function(err, result) {
      if (err) {
        //console.log(err)
      } else {
        //console.log(result)
      }
    });

    done();

  } catch (err) {
      console.log(err);
    }
});

afterEach(async (done) => {
   try {

    await MODEL.deleteMany({}, function(err, result) {
    if (err) {
      //console.log(err)
    } else {
      //console.log(result)
    }
  });
    done();
   }catch (err) {
    console.log(err);
  }
});


afterAll( async done => {
  mongoose.connection.close();
  mongoose.disconnect()
  done();
  console.log("End of Test !!")
});




/** ==========================================
 
                POST TESTING
 
==========================================**/

test('POST /csv, Should try send NULL file get response that, please upload a csv file!!!!', 
  async () => {
    try{

      let data = null;
      let responseMessage = 'Please upload a csv file!!!!';

      await api
        .post('/csv')
        .send(data)
        .expect(400)
        .then(async (response) => {
          expect(response.body).toBeTruthy();
          expect(response.body.message).toBe(responseMessage);
        });
    }catch(err){
      console.log(err);
    }
});

test('POST /csv, Should try upload a .txt file get response that the type of file is not correct; "please upload a csv file"', 
  async () => {
    try{
      const file = 'test.txt';
      const type = 'text/plain';
      const filePath = process.cwd() + `/fixture/${file}`;

      let response = {
        message: 'Please upload a csv file!!!',
        error: `Please upload only csv file! ${file} is ${type} not .csv file`
      }
      
      await api
        .post('/csv')
        .attach('file', filePath)
        .expect(406) 
        .then(async (res) => {
          expect(res.body).toBeTruthy();
          expect(res.body.message).toBe(response.message);
          expect(res.body.error).toBe(response.error);
        }); 
    }catch(err){
      console.log(err);
    }
});

test('POST /csv, Should try send .csv file but with wrong model. Response that, please upload a csv file and the validation mongoose model-schema failed.', 
  async () => {
    try{
      const file = 'test.csv';
      const filePath = process.cwd() + `/fixture/${file}`;

      let response = {
        message: 'Fail to upload data into db, file is .csv but not correct model',
        error: 'prodSchema validation failed: Sector: Path `Sector` is required., Country: Path `Country` is required.'
      }
    
      await api
        .post('/csv')
        .attach('file', filePath)
        .expect(401)
        .then(async (res) => {
          expect(res.body).toBeTruthy();
          expect(res.body.message).toBe(response.message);
          expect(res.body.error).toBe(response.error);
        }); 
    }catch(err){
      console.log(err);
    }
});




test('POST /csv, will save the file in server, post the data in db of emissions.csv', 
  async () => {
    try{
      const file = 'emissions.csv'
      const filePath = process.cwd() + `/fixture/${file}`;
      let response = {
        message: `upload csv data into db successfully. ${file} saved.`
      }
      await supertest(app)
        .post('/csv')
        .attach('file', filePath)
        .expect(201)
        .then((res) => {
          expect(res.body).toBeTruthy();
          expect(res.body.message).toBe(response.message);
        });
    }catch(err){
      console.log(err);
    }
},24000);


/** ==========================================
 
                GET TESTING
 
==========================================**/

// 404 

test('GET /test, test 404 the response of the Service for unknowns url', 
  async () => {
    try{

    await api
      .get('/test')
      .expect(404)
      .then((response) => {
        expect(response.body.error).toEqual('404: Not Found');
      });

    }catch(err){
      console.log(err);
    } 
});