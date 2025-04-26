FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# Start the application in dev mode
CMD ["npm", "run", "start:dev"]