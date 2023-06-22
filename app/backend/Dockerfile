FROM node:16.14-alpine

WORKDIR /app-backend

COPY package*.json ./
COPY .npmrc ./

RUN apk add --no-cache bash && \
    chown -R node:node /app-backend

USER node

COPY . .

USER root

RUN chown -R root:root /app-backend
RUN chmod -R 755 /app-backend

EXPOSE 3001

RUN npm install

ENTRYPOINT ["npm", "start"]
