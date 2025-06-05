# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files first for caching dependencies
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application
COPY . .

# Expose your app's port
EXPOSE 3001

# Start the server
CMD ["npm", "run", "dev"]