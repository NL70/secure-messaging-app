FROM node:21.7.0
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./app/ ./app/
COPY ./prisma/ ./prisma/
COPY ./public/ ./public/

EXPOSE 3000

RUN npx prisma generate 

CMD ["npm", "run", "dev"]
