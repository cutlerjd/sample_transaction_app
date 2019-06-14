# api

From the root of this folder, running `docker-compose up --build` will start up a docker image with nodemon running and watching for file changes.

Source files are not copied into the docker image (see Dockerfile in this directory and line 15 is the tag used). They are instead mounted as a volume, and as you develop locally on your machine with code editor of choice, the docker image recompiles the code as you'd expect.

## Try it without running npm install
Seriously. You can not have a node_modules folder, and modify the backen. It... kinda sucks because without that folder a lot of things in VS Code and the like can't give hints... but it works! One of my to-do's is to check into VS Code's remote debugging they introduced, as it can mount folders from docker images for development. It'd finish it off!

## Things clearly missing
- Category delete doesn't check for existing transactions, fails terribly. Spent time trying to get TypeORM to handle this, but this was a new library for me.
- Logging... tests... yep. Not there.

## Things to notice
- Check out the dockerfile! Nodemon is not known to play nice with docker, and it takes some finicky workarounds to get it to build constantly with a mounted volume.
- Typescript has a linter, and builds to a seperate folder.
- Configuration is done via environmental variables. If you were to run this without the docker-compose file, you'd need a .env file or these things set up on your machine.