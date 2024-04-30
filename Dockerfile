FROM node:20.12.2

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Next.js runs on (default: 3000)
EXPOSE 3000

# Build the Next.js project
RUN npm run build

# Start the Next.js project in development mode
CMD ["npm", "start"]