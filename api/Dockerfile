# a base stage for all future stages
# with only prod dependencies and
# no code yet
FROM node:12 as base
ENV NODE_ENV=production
WORKDIR /node
COPY package*.json ./
RUN npm install --only=production \
    && npm cache clean --force
ENV PATH /node/node_modules/.bin:$PATH
ENV DOCKERIZED=true

# a dev and build-only stage. we don't need to 
# copy in code since we bind-mount it
FROM base as dev
ENV NODE_ENV=development
RUN npm install --only=development
WORKDIR /node/app
CMD ["npm","run-script", "start:watch"]

FROM dev as build
COPY . .
RUN tsc -b
# you would also run your tests here

# this only has minimal deps and files
FROM base as prod
COPY --from=build /node/app/dist/ .
CMD ["node", "app.js"]