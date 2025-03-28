# Stage 1: Build React App
FROM node:18-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Accept build-time environment variables
ARG VITE_API_URL
ENV VITE_API_URL="http://65.1.1.44/api"

# Copy package.json and package-lock.json first (for efficient caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy all project files
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default Nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy built React files from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx config for React (if needed)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for serving
EXPOSE 80

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]