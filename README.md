# Importer-Challenge

Build a small REST API.

> Structure

```
Importer-Challenge
 |
 +-- download
     |
     +--
 +-- upload
     |
     +--
 |
 docker-compose.yml
 LICENSE
 .gitignore
 README.md

```

## Upload

Expects a CSV payload and saves the data to a MongoDB database.
<img width="778" alt="postman" src="https://user-images.githubusercontent.com/57291487/131594839-7512e885-05d5-4c89-8a00-6be77890e2d2.png">


## Download

Reads data from that same database and serves responses as JSON documents. Filters on the data are implemented, with query parameters.
<img width="697" alt="swagger" src="https://user-images.githubusercontent.com/57291487/131594848-85d9e054-10a8-465f-a7fc-780324e3b195.png">

## Installing and Run

### Requirements

- NodeJS
- Git
- NPM
- Docker

### Common setup

Clone the repo and install the dependencies.

git clone https://github.com/hamada-j/Importer-Challenge.git

cd Importer-Challenge

The api has of two small services. These two services are totally independent.
To run them in development mode or pass the tests it is necessary to install the dependencies.

```
cd upload
npm install
```

To run the upload in development mode

```
npm run dev
```

Test upload

```
npm run test
```

For download

```
cd download
npm install
```

To run the download in development mode

```
npm run dev
```

Test upload

```
npm run test
```
