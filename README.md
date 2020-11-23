<h1 align="left">
  GoBarber project
</h1>
<p align="left">The best way to schedule your service!</p>

<p align="left">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/henriquemanduca/gobarber?color=blue">


  <img alt="Repository size" src="https://img.shields.io/github/repo-size/henriquemanduca/gobarber?color=blue">

  <a href="https://github.com/henriquemanduca/gobarber/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/henriquemanduca/gobarber?color=blue">  </a>

  <img alt="GitHub" src="https://img.shields.io/github/license/henriquemanduca/gobarber?color=blue">
</p>




- [The whole project](#the-whole-project)
  * [API Express Application](#api-express-application)
  * [Wen Application](#web-application)
  * [Mobile Application](#mobile-application)
- [License](#license)



## The whole project

This api provides everything needed to organize appointments between the barbers and customers.

Customers can choose the best time available to them.

Providers can see all their appointments, manage the times, also see if one client canceled the schedule.



## API Application

### Technologies

Technologies that I used to develop this api

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Multer](https://github.com/expressjs/multer)
- [TypeORM](https://typeorm.io/#/)
- [JWT-token](https://jwt.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Date-fns](https://date-fns.org/)
- [Jest](https://jestjs.io/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)
- [Celebrate](https://github.com/arb/celebrate)



### Requirements

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [Docker](https://docs.docker.com/get-docker/)
- [Insomnia](https://insomnia.rest/download/core/?&ref=https%3A%2F%2Fwww.google.com%2F)



**Follow the steps below**

```bash
# Install the dependencies
$ npm install

# Make a copy of '.env.example' to '.env'
# and set with YOUR environment variables
# The aws variables do not need to be filled for dev environment
$ cp .env.example .env

# Create the instances of postgreSQL, mongo and redis using docker
# This repository has some samples of docker-compose files to create containers
$ git clone https://github.com/henriquemanduca/docker-database.git

# In this repository, there is a docker-compose file for each database
# Firts create a network for the containers 
$ docker network create database-network

# Then
$ docker-compose -f dc-postgres.yml -p postgres up -d
$ docker-compose -f dc-mongo.yml -p mongo up -d
$ docker-compose -f dc-redis.yml -p redis up -d

# Once the services are running, run the migrations
$ npm run typeorm migration:run

# Run the api service
$ npm run dev:server

# To finish, import the 'Insomnia.json' on Insomnia App
```



## Web Application

Almost done.



## Mobile Application

On the way.



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Henrique Manduca 👋 &nbsp;[See my linkedin](https://www.linkedin.com/in/henrique-manduca/)
