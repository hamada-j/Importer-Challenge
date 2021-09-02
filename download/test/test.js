const supertest = require('supertest');
const mongoose = require('mongoose');
const csv = require("csvtojson");
const fs = require('fs');

const app = require('../app');

const api = supertest(app);

const MODEL = require('../models/model');
const SECTOR = require('../utils/entitySector')
const HEADERS = require('../utils/changeHeader');


const file = 'emissions.csv'
const filePath = process.cwd() + `/fixture/${file}`;
const sectors = SECTOR.sector();
const randomYear = Math.floor(Math.random() * (2014 - 1850 + 1) + 1850);

let jsonData = [];
let random = 0;


// import csv of test
csv().fromFile(filePath).then(function(jsonArrayObj){
    let csvData = HEADERS.changeHeader(jsonArrayObj);
    jsonData = csvData;
    random = Math.floor(Math.random() * (jsonData.length - 0 + 1)) + 0;
});




beforeEach(async (done) => {
  try {

    await MODEL.deleteMany({}, function(err, result) {
      if (err) {
        //console.log(err)
      } else {
        //console.log(result)
      }
    });

    await MODEL.insertMany(jsonData);
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


//"test:watch": "npm run test -- --watchAll --silent --verbose"

/** ==========================================
 
                GET TESTING
 
==========================================**/

// 404 

test('GET /test, test 404 the response of the API for unknowns url', 
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

// BY ID

test('GET /?id=123test, test for incorrect id', 
  async () => {
    try{

      let testId = '123test'
      let text = {
        message: `Fail to get data for this id: ${testId}. Did not exist in db.`,
        error: `Cast to ObjectId failed for value "${testId}" (type string) at path "_id" for model "prodSchema"`
      }
        
    await supertest(app)
      .get(`/?id=${testId}`)
      .expect(500)
      .then((response) => {
        expect(response.body).toBeTruthy();
        expect(response.body.message).toBe(text.message);
        expect(response.body.error).toBe(text.error);
      });
    }catch(err){
      console.log('error /id --i--> ', err);
    } 
});


test('GET /?id=612bf78520ce490c900b780d, test for correct id ', 
  async () => {
    try{
      
      const element = await MODEL.create(jsonData[random])
      .then((doc) => {return doc})
      .catch((error) => { console.log(error);});

    await supertest(app)
      .get(`/?id=${element._id}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {

        expect(response.body).toBeTruthy();
        expect(response.body['1850']).toEqual(element['1850']);
        expect(response.body['2014']).toEqual(element['2014']);
        expect(JSON.stringify(response.body._id)).toBe(JSON.stringify(element._id));
        expect(response.body.Country).toBe(element.Country);

      });
    }catch(err){
      console.log('error /?id --c--> ', err);
    } 
});

// ALL

test('GET /, make call to the API and get data with default params first page and limit to 10 doc per page, but limit in url can be changed to get more.', 
  async () => {
    try{

      // for( let i = 0; i < csvData.length; i++ ) {
      //   const element = await MODEL.create(csvData[i]);
      // }

    //await MODEL.insertMany(jsonData)

    await api
      .get('/')
      .expect(206)
      .then( (response) => {
        expect(response.body).toBeTruthy();
        expect(Array.isArray(response.body.data)).toBeTruthy();
        for( let i = 0; i < 10; i++ ) {
          expect(response.body.data[i].Country).toBe(jsonData[i].Country);
        }
        expect(response.body.next).toBe('http://localhost:3000/?page=1&limit=10');

      }).catch((error) => { console.log(error);});
    } catch(err) {
      console.log('error GET / ---> ', err);
    } 
});


// BY COUNTRY

test(`GET /?country=aia, get all doc in db by country in pagination by default 10 doc per page, but limit can be changed to 1000 per page /?country=aia&page=0&limit=1000.`, 
  async () => {
    try{

    //await MODEL.insertMany(jsonData);
    const country = jsonData[random].Country;

    await api
      .get(`/?country=${country}`)
      .expect(206)
      .then( (response) => {
        expect(response.body).toBeTruthy();
        expect(Array.isArray(response.body.data)).toBeTruthy();
        expect(response.body.data[0].Country).toEqual(country.toUpperCase());
        expect(response.body.next).toEqual(`http://localhost:3000/?country=${country}&page=1&limit=10`);

      }).catch((error) => { console.log(error);});
    } catch(err) {
      console.log('error GET /?country ---> ', err);
    } 
});

test('GET /?country=test, test with wrong value for country', 
  async () => {
    try{

      //await MODEL.insertMany(jsonData);
      const country = 'test';
      let responseExpected = {
      message: 'Incorrect URL',
      urlRecommended: 'http://localhost:3000/?country=aia',
      error: `some query params are wrong; country ${country.toUpperCase()}`
    };

      await api
      .get(`/?country=${country}`)
      .expect(400)
      .then( (response) => {

        expect(response.body).toEqual(responseExpected);

      }).catch((error) => { console.log(error);});
    } catch(err) {
      console.log('error GET /?country --i--> ', err);
    } 
});


test(`GET /?country=aia&year=${randomYear}, get all doc in db by country sort by value of a specific year in pagination by default 10 doc per page, but limit can be changed to more per page /?country=aia&year=${randomYear}&page=1&limit=100.`, 
  async () => {
    try{

     
    
    //await MODEL.insertMany(jsonData); 
    const country = jsonData[random].Country;

    await api
      .get(`/?country=${country}&year=${randomYear}`)
      .expect(206)
      .then( (response) => {
        expect(response.body).toBeTruthy();
        expect(Array.isArray(response.body.data)).toBeTruthy();
        expect(response.body.data[0].Country).toEqual(country.toUpperCase());
        expect(response.body.data[0].randomYear).toEqual(jsonData[random].randomYear);
        expect(response.body.next).toEqual(`http://localhost:3000/?country=${country}&year=${randomYear}&page=1&limit=10`);

      }).catch((error) => { console.log(error);});
    } catch(err) {
      console.log('error GET /?country&year ---> ', err);
    } 
});


// BY SECTOR

test(`GET /?sector=TotalIncludingLULUCF, get all doc in db by sector in pagination by default 10 doc per page, but limit can be changed per page /?sector=TotalIncludingLULUCF&page=1&limit=100.`, 
  async () => {
    try{

  
    const sector = sectors[1];

    await api
      .get(`/?sector=${sector.replace(/\s+/g, '').toLowerCase()}`)
      .expect(206)
      .then( (response) => {
  
        expect(response.body).toBeTruthy();
        expect(Array.isArray(response.body.data)).toBeTruthy();
        expect(response.body.data.length).toBe(10);
        
        for(var i = 0; i < response.body.data.length; i++){
           expect(response.body.data[i].Sector).toEqual(sector);
        }

      }).catch((error) => { console.log(error);});
    } catch(err) {
      console.log('error GET /?sector ---> ', err);
    } 
});

