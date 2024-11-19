# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port on which the application runs
EXPOSE 3000

# Define the command to run the application
CMD ["node", "server.js"]

# Use the official MongoDB image as the base image for MongoDB
FROM mongo:latest

# Copy the MongoDB initialization script to the appropriate directory
COPY init-mongo.js /docker-entrypoint-initdb.d/