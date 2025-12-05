FROM node:24-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]