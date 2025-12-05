FROM node:24-alpine AS builder
WORKDIR /moeda-estudantil-api
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:24-alpine AS runner
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /moeda-estudantil-api/dist ./dist
COPY --from=builder /moeda-estudantil-api/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/main.js"]
