# Use the official Node.js image as the base image
FROM node:20-alpine

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .
# Expose the port the app runs on
EXPOSE 5173

# Command to run the application
CMD ["pnpm", "dev"]