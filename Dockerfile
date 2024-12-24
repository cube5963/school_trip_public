FROM node:20.18

WORKDIR /app

COPY package*.json /

RUN npm install

COPY . .

EXPOSE 3000

COPY prisma ./prisma
RUN npx prisma generate

RUN npm run build

CMD ["npm", "run", "start"]