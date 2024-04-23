FROM node:20.12.2

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Expose the port Next.js runs on (default: 3000)
EXPOSE 3000

# Start the Next.js project in development mode
CMD ["npm", "run", "dev"]