#Stage 1:
# Use the official Node.js image as the base image
FROM node:18-alpine AS buildStage
# Set the working directory inside the container
WORKDIR /app
# Copy package.json and package-lock.json first (for caching dependencies)
COPY package.json package-lock.json ./
# Install dependencies
RUN npm install --production
# Copy the entire Next.js project to the container
COPY . .
# Build the Next.js app
RUN npm run build

#Stage 2:
# Use minimal nginx image
FROM nginx:alpine
# Copy all th static site data
COPY --from=buildStage /app/out /usr/share/nginx/html

#Use default config
#COPY nginx.conf /etc/nginx/conf.d/default.conf
 
# Expose default 80 port bind with desire port
EXPOSE 80

# Start nginx server 
CMD ["nginx", "-g", "daemon off;"]
