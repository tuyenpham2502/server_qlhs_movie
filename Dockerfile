FROM node:latest

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g pm2

EXPOSE 80

CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]

