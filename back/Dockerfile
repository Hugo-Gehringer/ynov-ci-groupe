# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json to the working directory
COPY package.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY .. .

# Expose the port on which the application runs
EXPOSE 3000

# Define the command to run the application
CMD ["node", "dbConnect.js"]