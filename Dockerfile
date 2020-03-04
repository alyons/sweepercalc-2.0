FROM node:12 as base

WORKDIR /app

FROM base as dependencies
COPY package*.json ./
RUN npm ci

FROM dependencies as build
WORKDIR /app
COPY ./ /app
RUN npm run build

FROM node:12-alpine
COPY --from=dependencies /app/package.json ./
RUN npm install --only=production
COPY --from=build /app/dist ./dist
COPY ./server ./

ENTRYPOINT [ "node" ]
CMD [ "index.js" ]
