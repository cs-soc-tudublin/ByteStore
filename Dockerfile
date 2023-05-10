FROM ubuntu
WORKDIR /app
COPY . .
CMD ["node", "src/index.js"]
EXPOSE 3000
