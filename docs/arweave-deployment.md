# Deploying DAO Watch to Arweave

This document provides step-by-step instructions for deploying the DAO Watch website to Arweave, creating a permanent and decentralized web presence.

## What is Arweave?

Arweave is a decentralized storage network that allows for permanent hosting of websites and applications. Unlike traditional web hosting:

- Content is stored permanently
- No recurring fees (pay once, store forever)
- Content is distributed across the network for resilience
- Censorship resistant

## Prerequisites

Before you can deploy to Arweave, you'll need:

1. An Arweave wallet with enough AR tokens (approximately 0.01-0.05 AR for a typical site)
2. The Bundlr CLI installed globally
3. A static build of the DAO Watch website

## Setup Instructions

### 1. Install Bundlr CLI

Bundlr Network is the recommended way to upload content to Arweave as it provides better pricing and faster uploads:

```bash
npm install -g @bundlr-network/client
```

### 2. Get Arweave Tokens

You'll need AR tokens to fund your deployment. You can get them from:

- Exchange: Purchase AR from cryptocurrency exchanges like Binance, Huobi, or gate.io
- Faucet: For testing you can request a small amount from a faucet (not for mainnet use)

### 3. Create a Wallet

If you don't already have one, create an Arweave wallet:

1. Visit [arweave.app](https://arweave.app) or use [ArConnect browser extension](https://www.arconnect.io/)
2. Download your wallet keyfile (JSON) and store it securely
3. Save the wallet file as `arweave-wallet.json` in a secure location (not in the project directory)
4. NEVER commit this file to version control

## Deployment Process

### 1. Build the Static Site

First, build the DAO Watch website as a static export:

```bash
npm run build
```

This will create a static export in the `out` directory thanks to the `output: 'export'` configuration in `next.config.js`.

### 2. Fund Your Bundlr Account

Fund your Bundlr account with AR tokens:

```bash
bundlr fund 10000000000 -h https://node1.bundlr.network -w /path/to/arweave-wallet.json -c arweave
```

This funds your Bundlr account with 0.01 AR (10000000000 Winston - the smallest unit of AR).

To check your balance:

```bash
bundlr balance <YOUR_ARWEAVE_ADDRESS> -h https://node1.bundlr.network -c arweave
```

### 3. Deploy to Arweave

Deploy the contents of the `out` directory to Arweave:

```bash
bundlr upload-dir ./out -c arweave -h https://node1.bundlr.network -w /path/to/arweave-wallet.json --index-file index.html
```

After a successful upload, you'll receive a transaction ID. Your site will be accessible at:

- `https://arweave.net/{TRANSACTION_ID}`

It may take some time (usually 10-30 minutes) for the transaction to be confirmed and the site to be available.

### 4. Custom Domain (Optional)

For a more user-friendly URL, you can:

1. Use the Arweave Name System (ArNS) for a `.arweave.dev` domain
2. Use a service like [arweave.app](https://arweave.app) to link your transaction to a custom domain

## Testing Locally Before Deployment

You can test how your site will function on Arweave by running it locally in a Docker container that simulates the static file hosting:

### 1. Create Docker Configuration

Create a file named `Dockerfile.arweave`:

```dockerfile
FROM nginx:alpine

# Create directory for the static files
RUN mkdir -p /usr/share/nginx/html

# Copy a custom nginx configuration
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    location / { \
        root /usr/share/nginx/html; \
        try_files $uri $uri.html $uri/ /index.html; \
    } \
    # Handle blog posts with explicit paths \
    location ~ ^/blog/([^/]+)$ { \
        root /usr/share/nginx/html; \
        try_files $uri $uri.html /blog/$1.html /404.html; \
    } \
    # Handle 404s \
    error_page 404 /404.html; \
    location = /404.html { \
        root /usr/share/nginx/html; \
        internal; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
```

And a file named `docker-compose.arweave.yml`:

```yaml
version: '3'

services:
  arweave-static:
    build:
      context: .
      dockerfile: Dockerfile.arweave
    ports:
      - "8080:80"
    container_name: daowatch-arweave
    volumes:
      - ./out:/usr/share/nginx/html
    restart: unless-stopped
    networks:
      - arweave-net

networks:
  arweave-net:
    driver: bridge
```

### 2. Build and Run the Test Container

After building your static site with `npm run build`, run:

```bash
docker-compose -f docker-compose.arweave.yml build
docker-compose -f docker-compose.arweave.yml up -d
```

### 3. Test Your Static Site

Visit `http://localhost:8080` to see what your site will look like when deployed to Arweave.

This local test container:
- Serves static files just like they would be served on Arweave
- Has proper routing for blog posts and other pages
- Properly handles assets like images and JavaScript files

## Dynamic Content Considerations

The DAO Watch website uses the YouTube API for dynamic content. When deployed to Arweave:

1. API calls to YouTube will still work as they're made client-side
2. The API key should still be kept secure (in environment variables)
3. Static fallback content should be implemented in case API calls fail

## Updating the Site

Arweave deployments are permanent. To update your site:

1. Make your changes to the codebase
2. Build a new static export
3. Deploy the updated site to Arweave (new transaction)
4. Update any domain pointers to the new transaction ID

## Resources

- [Arweave Documentation](https://docs.arweave.org)
- [Bundlr Network Documentation](https://docs.bundlr.network)
- [NextJS Static Export Documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports) 