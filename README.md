# Transaction App - No Need for local NPM!

This is a crude transaction app, that actually is meant to more show how to utilize Docker and the docker-compose toolkit to develop multi-tier applications locally, all while tightly controlling the build environment by running node development in local containers!

## Get started

First, if all you want to do is see the app:
- You may be disappointed, it's crude and I stopped before finishing out all capabilities.
- You need Docker installed.
- You need this repo cloned locally.

Run `docker-compose up --build`

Wait for all the build processes to finish, and then go to `http://localhost` in a browser! That's it!

## What's under the hood

1. Nginx proxy
- Hosts the built html and javascript files from a Vue project.
- Allows correct browser history and loading a Vue single page web app
- Directs traffic on `/api/v1/` to the correct docker service
2. Vue Single Page App
- Uses vue-cli and basic template and their build tools to compile production image.
- Integrates a Bootstrap 4 theme, and set up for custom theming.
- Development specifics are in that directories README.
3. Node API
- Express node app with Typescript and TypeORM.
- Not exposed externally from docker engine, only from nginx proxy.
- Development specifics are in that directories README.
4. Postgres DB
- Will remain persisent data based on each docker-compose run (will change when running docker-compose in different folders).

## Where to look for fun stuff

The docker-compose file shows how they're all launched. Things like `target` in the build command is where a Dockerfile can be used in multiple ways and I have the root docker-compose trigger all production builds. Links allow for DNS entries to be inserted in docker images instead of IP's. Health checks allow for the api to hold off from launching till the database is ready.

### Who am I?

An idiot. I spent way too long playing with the docker stuff because I love repeatable builds and developer tooling. Sorry it didn't meet all the requirements.

Jase Cutler
