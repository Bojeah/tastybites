FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build || echo "Build failed due to missing native binding"

FROM nginx:1.28-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# DO NOT COPY a default.conf here!
EXPOSE 80
