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

## Download

Reads data from that same database and serves responses as JSON documents. Filters on the data are implemented, with query parameters.

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
