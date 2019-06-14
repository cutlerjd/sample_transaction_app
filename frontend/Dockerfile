FROM node:12.4.0-alpine as base
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
RUN npm install @vue/cli --save-prod
ENV PATH /app/node_modules/.bin:$PATH
ENV DOCKERIZED=true

FROM base as dev
ENV NODE_ENV=development
CMD ["npm","run-script", "serve"]

FROM base as prod
COPY . .
ENV NODE_ENV=production
CMD ["npm","run-script", "build"]