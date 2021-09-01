# Importer-Challenge

> Build a small REST API.
> The api has of two small services. These two services are totally independent sharing a MongoDB database.

## Table of contents

- [Installing and Run](#installing-and-run)
- [Upload](#upload)
- [Download](#download)

Structure

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

## Installing and Run

### Requirements

- NodeJS
- MongoDB
- Git
- NPM
- Docker

### Run Images as a containers with Docker

clone the repo and install the dependencies.

```
git clone https://github.com/hamada-j/Importer-Challenge.git
```

```
cd Importer-Challenge
```

```
docker-compose up
```

### Common setup

Clone the repo and install the dependencies.

```
git clone https://github.com/hamada-j/Importer-Challenge.git
```

```
cd Importer-Challenge
```

The api has of two small services. These two services are totally independent. To run them in development mode or pass the tests it is necessary to install the dependencies.

> > > It's necessary to have install and running MongoDB in localhost:27017.

## Upload

Expects a CSV payload and saves the data to a MongoDB database.

The document that the endpoint accepts must have the structure and type [emissions.csv](https://github.com/Vizzuality/coding-challenge-examples/blob/software-engineer/importer/data/emissions.csv).

Navigate to the service folder within the project:

```
cd upload
```

Install the dependencies.

```
npm install
```

To run the upload in development mode.

```
npm run dev
```

Use an interactive and automatic tool for verifying the APIs like Postman or Visit http://localhost:3001/api-docs/ to interact with api ui-swagger doc.
<img width="686" alt="upload" src="https://user-images.githubusercontent.com/57291487/131609931-2432072a-2887-4d04-ab70-0dc224673025.png">

Test upload with Jest-Supertest

```
npm run test
```

## Download

Reads data from that same database and serves responses as JSON documents. Filters on the data are implemented, with query parameters.

Some filters are implemented in query parameters like. By default the limit is 10 doc per page, but the limit can be changed:

- http://localhost:3000/

- http://localhost:3000/?page=0&limit=59

- http://localhost:3000/?sector=industrialprocess&page=1&limit=3

- http://localhost:3000/?sector=Otherproduction

- http://localhost:3000/?country=ABW

- http://localhost:3000/?country=ABW&year=1980&page=30&limit=10

Navigate to the service folder within the project:

```
cd upload
```

Install the dependencies.

```
npm install
```

To run the upload in development mode.

```
npm run dev
```

Use an interactive and automatic tool for verifying the APIs like Postman or Visit http://localhost:3001/api-docs/ to interact with api ui-swagger doc.

<img width="697" alt="swagger" src="https://user-images.githubusercontent.com/57291487/131594848-85d9e054-10a8-465f-a7fc-780324e3b195.png">

Pass the test:

```
npm run test
```
