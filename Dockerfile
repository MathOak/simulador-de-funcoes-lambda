FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --include=dev

COPY . .

EXPOSE 3000

CMD ["npx", "serverless", "offline", "--host", "0.0.0.0", "--httpPort", "3000"]
