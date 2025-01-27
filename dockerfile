FROM node:20.17.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY src/service.proto /app/dist

EXPOSE 50051

CMD ["node", "dist/server.js"]
