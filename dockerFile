# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching dependencies)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire Next.js project to the container
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the desired port (9000)
EXPOSE 9000

# Start the Next.js server on port 9000
CMD ["npm", "run", "start", "--", "-p", "9000"]
