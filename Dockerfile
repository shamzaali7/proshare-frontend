# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application for production
RUN npm run build

# Install a lightweight web server to serve the static files
RUN npm install -g serve

# Serve the built application
CMD ["serve", "-s", "build"]

# Expose port 5000 to be accessible outside this container
EXPOSE 5000
