# Stage 1: Build the application
FROM node:20.10.0-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run the application
FROM node:20.10.0-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app .

RUN npm install --only=production

CMD ["node", "dist/main"]
