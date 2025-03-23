# DAO Watch

A comprehensive blog and video series about crypto-based projects, with a focus on Decentralized Autonomous Organizations (DAOs).

## About

DAO Watch is a platform dedicated to providing insights, analysis, and updates on the most innovative DAO projects in the crypto space. Our mission is to educate and inform crypto enthusiasts about the evolving landscape of decentralized governance and community-driven projects.

## Features

- In-depth analysis of emerging DAO projects
- Regular updates on established DAOs
- Expert interviews and insights
- Educational content about DAO governance models
- Video series featuring project showcases

## Technology

This website is built using modern web technologies to provide a responsive and engaging user experience.

## Development

For development guidelines, please refer to our [Roadmap](./roadmap.md).

## Branding

For brand guidelines, please refer to our [Brand Guide](./branding/brandguide.md).
All brand assets (logos, icons, images) are stored in the `branding/` folder of this repository.

## Social Media

- **Twitter (X):** [https://x.com/Crypto_SI](https://x.com/Crypto_SI)
- **GitHub:** [https://github.com/Crypto-SI](https://github.com/Crypto-SI)
- **Website:** [https://www.cryptosi.com/](https://www.cryptosi.com/)
- **Instagram:** [https://www.instagram.com/cryptosi.eth/](https://www.instagram.com/cryptosi.eth/)
- **YouTube:** [https://www.youtube.com/@smartreach5326](https://www.youtube.com/@smartreach5326)

## Resources

### The Ultimate DAO Handbook
Our comprehensive guide to Decentralized Autonomous Organizations:  
[https://www.amazon.co.uk/Ultimate-DAO-Handbook-Decentralized-Organizations-ebook/dp/B0C3J58TCY](https://www.amazon.co.uk/Ultimate-DAO-Handbook-Decentralized-Organizations-ebook/dp/B0C3J58TCY)

## License

[License details]

# DAOWatch Website

A comprehensive platform for everything related to Decentralized Autonomous Organizations.

## Features

- Educational resources about DAOs
- Blog posts from Medium
- YouTube episodes about DAO concepts
- Community integration
- And more!

## Development

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Docker (optional, for containerized development)

### Environment Variables

This project uses environment variables for configuration. To set up the environment:

1. Copy the example environment file:
   ```
   cp .env.example .env.local
   ```

2. Update the values in `.env.local` with your actual configuration:
   ```
   NEXT_PUBLIC_YOUTUBE_API_KEY=your_actual_youtube_api_key
   NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID=your_actual_playlist_id
   ```

**Important**: Never commit `.env.local` to version control. It contains sensitive information and is already included in the `.gitignore` file.

### Installation

#### Standard Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open http://localhost:3000 in your browser

#### Docker Installation

The project includes Docker configuration for easy setup and consistent development environments.

1. Prerequisites:
   - Docker
   - Docker Compose

2. Setup:
   - Copy the environment file:
     ```
     cp .env.example .env.local
     ```
   - Update the values in `.env.local` with your actual configuration

3. Build and run the container:
   ```
   docker compose up -d
   ```
   
   This command:
   - Builds the Docker image using the Dockerfile
   - Starts the container in detached mode
   - Maps port 3002 on your host to port 3000 in the container
   - Mounts the project directory into the container for live code updates

4. Access the application at http://localhost:3002

5. Common Docker commands:
   - Stop the container: `docker compose stop`
   - Restart the container: `docker compose restart`
   - Rebuild and restart: `docker compose up -d --build`
   - View logs: `docker compose logs -f`

### Project Structure

```
daowatch_website/
├── public/           # Static assets
├── src/
│   ├── components/   # React components
│   ├── pages/        # Next.js pages
│   └── styles/       # CSS styles
├── .env.example      # Example environment variables
├── .env.local        # Local environment variables (not in version control)
├── Dockerfile        # Docker configuration
├── docker-compose.yml # Docker Compose configuration
└── README.md         # This documentation
``` 