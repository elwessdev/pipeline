## => Builder Stage
FROM node:18-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

## => Production Stage
FROM node:18-slim AS runner

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start"]


# FROM node:18-slim

# WORKDIR /app

# COPY package*.json ./

# RUN npm i

# COPY . .

# EXPOSE 3000

# CMD ["npm", "run start"]