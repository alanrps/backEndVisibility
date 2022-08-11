FROM node:16.14.2-alpine

WORKDIR /

COPY package*.json ./
RUN npm install 

COPY . .

# RUN npm run migrate
# RUN npm run seed

EXPOSE 3000

CMD ["npm", "start"]