FROM node:16-alpine AS builder
WORKDIR /app

# Authors
LABEL maintainer="Houssem Tebai <houssem.tebai@esprit.tn>"

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Clean npm cache
RUN npm cache clean --force

# Install dependencies with --legacy-peer-deps flag
RUN npm install --legacy-peer-deps

# Copy the React application code
COPY . .

# Build the React application for production
RUN npm run build:qa

# Stage 2: Production image (Nginx server)
FROM nginx:stable-alpine

# Authors
LABEL maintainer="Houssem Tebai <houssem.tebai@esprit.tn>"

# Copy the built React application from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Replace the default Nginx configuration
COPY nginx/nginx-qa.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx as the foreground process
CMD ["nginx", "-g", "daemon off;"]