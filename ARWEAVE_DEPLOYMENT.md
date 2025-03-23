# Deploying to Arweave

This guide provides instructions for deploying the DAO Watch website to the Arweave permanent web.

## Prerequisites

1. An Arweave wallet with AR tokens
   - You can create a wallet at [arweave.app](https://arweave.app)
   - You can get tokens from [Upbit](https://upbit.com) or [Binance](https://binance.com)

2. Node.js and npm installed on your computer

3. Docker installed for local testing (recommended)

## Setup

1. Export your Arweave wallet to a JSON file and save it securely
   - In arweave.app, click on "Export Key" and save the JSON file
   - Keep this file secure as it contains your private key

2. Install dependencies
   ```
   npm install
   ```

## Build the project for Arweave

The project has been configured for optimal Arweave deployment with:
- Static HTML export
- Relative paths for assets
- Trailing slashes for cleaner URLs
- Unoptimized images to avoid server-side processing
- YouTube API key embedded for the Arweave version

To build the project:

```
npm run build
```

This will create a static site in the `out` directory.

## Testing Before Deployment (Recommended)

Before deploying to Arweave (which is permanent and can't be modified), it's highly recommended to test your build locally using Docker:

1. Install Docker if you haven't already

2. Run the following command to test your site using Nginx:
   ```
   docker run --rm -it -p 8888:80 -v "$(pwd)/out:/usr/share/nginx/html" nginx:alpine
   ```

3. Open your browser and navigate to http://localhost:8888

4. Test all functionality thoroughly, including:
   - Navigation between pages
   - YouTube video loading 
   - Font rendering
   - Responsive behavior
   - Any API integrations

5. If you encounter issues, modify your code, rebuild, and test again before deploying to Arweave

## YouTube API Key and Security

For the Arweave deployment, you need to add your YouTube API key to the build. This is done by creating an environment variable or adding it directly to the code before building (but remember to remove it before pushing to GitHub).

### Setting up YouTube API Key for Arweave

1. Create a YouTube API key in the Google Cloud Console
2. When building for Arweave deployment, add your key using one of these methods:
   - Set as environment variable: `NEXT_PUBLIC_YOUTUBE_API_KEY=your_api_key npm run build`
   - Temporarily add to `src/config/arweave-config.js` (remove before pushing to GitHub)

### Setting up HTTP Referrer Restrictions

To prevent unauthorized use of your YouTube API key, set up HTTP referrer restrictions in the Google Cloud Console:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to "APIs & Services" > "Credentials"
4. Find your YouTube API key and click "Edit"
5. Under "API restrictions", select "HTTP referrers (websites)"
6. Add the following referrer patterns:
   - Your specific Arweave domain, e.g., `5viszrwwotdpby5xpqpruuiwu6dvpqk2dopji3jvtmfzjenzd57a.arweave.net`
   - Optionally, add `*.arweave.net` as a more general fallback

### Security Considerations

- Your specific Arweave domain (like `5viszrwwotdpby5xpqpruuiwu6dvpqk2dopji3jvtmfzjenzd57a.arweave.net`) is unique to your deployment
- No other sites can use this domain, making it safe to restrict your API key to it
- Don't include the full path with transaction ID in your referrer restrictions, just use the base domain
- Consider creating a separate API key specifically for your Arweave deployment

## Deploy to Arweave

### Option 1: Using Dragon Deploy (Recommended)

[Dragon Deploy](https://dragondeploy.xyz) is a user-friendly tool for deploying to Arweave.

1. Connect your Arweave wallet to Dragon Deploy
2. Select the `out` directory for upload
3. Follow the prompts to complete the deployment
4. Once complete, you'll receive a permanent URL for your site (like `https://arweave.net/[TRANSACTION_ID]`)
5. Additionally, you'll get a gateway URL that looks like `https://[SUBDOMAIN].arweave.net/[TRANSACTION_ID]`

### Option 2: Using our custom deployment script

1. Run the deployment script with your wallet file:
   ```
   node deploy-arweave.js path/to/your-wallet.json
   ```

2. Wait for the deployment to complete (this can take some time)

3. Once complete, you'll receive a permanent URL for your site

### Option 3: Using Irys (formerly Bundlr)

1. Install the Irys CLI:
   ```
   npm install -g @irys/sdk
   ```

2. Fund your Irys account:
   ```
   irys fund 5000000 -h https://node1.irys.xyz -w path/to/your-wallet.json -c arweave
   ```

3. Upload your site:
   ```
   irys upload-dir ./out -h https://node1.irys.xyz -w path/to/your-wallet.json -c arweave
   ```

## After Deployment

Once deployed:

1. Update the HTTP referrer restrictions in your Google Cloud Console with your actual Arweave domain
2. Verify all functionality works in the deployed version
3. Store the Arweave transaction ID and URL securely - this is the permanent address of your site

Your site will now be permanently available on Arweave with HTTPS included at no additional cost. The HTTPS certificate is managed by Arweave's infrastructure and will never expire.

You can also register a more user-friendly name using:
- [ArNS](https://ar.io) (Arweave Name System)
- [Permapages](https://permapages.app)

## Important Notes

- Arweave deployments are permanent and cannot be modified after upload
- Always test thoroughly with Docker before final deployment
- Each deployment will create a new permanent instance of your site
- The one-time payment made during deployment covers permanent storage with no renewal fees 