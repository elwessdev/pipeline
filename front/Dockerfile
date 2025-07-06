## => Builder Stage
FROM node:22-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV VITE_API_URL='http://localhost:3000'

RUN npm run build

## => Server Stage
FROM nginx:alpine AS runner

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]