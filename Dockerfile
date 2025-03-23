FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV development

# Expose the port Next.js runs on
EXPOSE 3000

# Default command (overridden by docker-compose)
# Adding the "--keepAlive" flag to ensure the container stays running
CMD ["npm", "run", "dev", "--", "--keepAlive"] 