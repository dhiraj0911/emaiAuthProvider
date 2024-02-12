# service2/Dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "main.js"]
EXPOSE 4000