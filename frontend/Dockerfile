# Stage 1: Build the Vite app
FROM node:current-alpine AS build
# Set working directory in the container
WORKDIR /app
# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the files and build the app
COPY . .
RUN npm run build

# Stage 2: Serve the built Vite app with Nginx
FROM nginx:alpine

# Copy the build folder from the first stage to the Nginx container and the nginx config file
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to serve the app
EXPOSE 5173

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
