# frontend

From the root of this folder, running `docker-compose up --build` will start up a the Vue development server, as well as the API docker image and Postgres database.

Source files are not copied into the docker image (see Dockerfile in this directory and line 9 is the tag used). They are instead mounted as a volume, and as you develop locally on your machine with code editor of choice, the docker image recompiles the code as you'd expect. 

## Try it without running npm install
Seriously. You can not have a node_modules folder, and modify the frontend. It... kinda sucks because without that folder a lot of things in VS Code and the like can't give hints... but it works! One of my to-do's is to check into VS Code's remote debugging they introduced, as it can mount folders from docker images for development. It'd finish it off!

## Things clearly missing
- I didn't even wire up Category edits or deletes. Technically they exist in the vuex store, and would connect to the backend. I just stopped.
- There could be column totals for any or all of these columns, table filtering... tons of stuff. Sorry.

## Things to notice
- Vuex store follows patterns of using actions for asynchronous changes, getters and mutations for synchronous changes.
- Bootstrap theming is customizeable
- Componentize what I could.