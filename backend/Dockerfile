# Use the official lightweight Node.js LTS image
FROM node:20-alpine

# Set production environment
ENV NODE_ENV=production

WORKDIR /usr/src/app

# Copy package files and install production-only dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy application source code
COPY . .

# Change ownership of the application directory to the built-in 'node' user
RUN chown -R node:node /usr/src/app

# Switch to the non-root user
USER node

EXPOSE 5000

CMD ["node", "server.js"]