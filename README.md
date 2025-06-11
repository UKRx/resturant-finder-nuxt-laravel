# Restaurant Finder Web Application

A full-stack restaurant finder built with Nuxt.js and Laravel, integrated with Google Maps API.

## Quick Start

1. Clone the repository
2. Copy `env.example` to `.env` and add your Google Maps API key
3. Run `./start.sh` or `docker-compose up --build`
4. Visit http://localhost:3000

## Testing the Setup

To validate the Docker setup works correctly:

```bash
# Run the comprehensive test script
./test-setup.sh
```

This will:
- ✅ Check Docker is running
- ✅ Validate environment configuration
- ✅ Build and start all containers
- ✅ Test database connectivity
- ✅ Verify API endpoints are working
- ✅ Confirm frontend is accessible
- ✅ Show container status and logs

## Features

- Restaurant search with Google Maps API
- Interactive map with restaurant markers  
- Detailed restaurant information with photos and reviews
- Responsive design with Tailwind CSS
- Server-side rendering with Nuxt.js
- RESTful API with Laravel backend
- Caching for improved performance

## Tech Stack

- Frontend: Nuxt.js 3, Vue.js 3, TypeScript, Tailwind CSS
- Backend: Laravel 10, PHP 8.2
- Database: MySQL 8.0
- API: Google Maps Places API
- Deployment: Docker & Docker Compose

## API Endpoints

- `GET /api/restaurants/search` - Search restaurants
- `GET /api/restaurants/{placeId}/details` - Get restaurant details
- `GET /api/health` - Health check

## Project Structure

```
├── frontend/          # Nuxt.js application
│   ├── components/    # Vue components
│   ├── pages/         # Application pages
│   ├── stores/        # Pinia state management
│   └── assets/        # CSS and assets
├── backend/           # Laravel API
│   ├── app/           # Application code
│   ├── routes/        # API routes
│   └── config/        # Configuration files
├── docker-compose.yml # Docker configuration
└── README.md         # Documentation
```

## Environment Setup

Create `.env` file:
```
GOOGLE_MAPS_API_KEY=your_api_key_here
```

Get your Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/) and enable:
- Maps JavaScript API
- Places API  
- Geocoding API

## Development

Frontend: `cd frontend && npm run dev`
Backend: `cd backend && php artisan serve`

## Troubleshooting

If you encounter issues:

1. **Docker not running**: Start Docker Desktop
2. **Port conflicts**: Change ports in `docker-compose.yml`
3. **API key issues**: Verify Google Cloud Console setup
4. **Build failures**: Check logs with `docker-compose logs -f`

## Commands

```bash
# Start application
./start.sh

# Test setup
./test-setup.sh

# View logs
docker-compose logs -f

# Stop application
docker-compose down

# Rebuild containers
docker-compose up --build
```

Made with ❤️ using Nuxt.js & Laravel 