# Use Node to build the frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build for production
RUN npm run build

# Serve with NGINX
FROM nginx:1.28-alpine

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: Custom nginx.conf (if needed for frontend-only routing)
# COPY ./nginx/frontend.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
