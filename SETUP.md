# Quick Setup Guide

## Prerequisites
- Docker and Docker Compose installed
- Google Maps API key

## Setup Steps

### 1. Get Google Maps API Key
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable these APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Create an API key

### 2. Configure Environment
```bash
# Copy environment template
cp env.example .env

# Edit .env file and replace the placeholder with your actual API key
GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### 3. Start Application
```bash
# Option 1: Use the startup script
./start.sh

# Option 2: Use Docker Compose directly
docker-compose up --build
```

### 4. Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Health Check**: http://localhost:8000/api/health

## Troubleshooting

### Common Issues

**1. API Key Error**
- Ensure your Google Maps API key is correct
- Check that required APIs are enabled in Google Cloud Console
- Verify billing is enabled for your Google Cloud project

**2. Port Already in Use**
- Change ports in `docker-compose.yml` if 3000 or 8000 are taken
- Stop other applications using these ports

**3. Docker Issues**
- Ensure Docker is running
- Try `docker-compose down` then `docker-compose up --build`

### Logs
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f frontend
docker-compose logs -f backend
```

### Reset
```bash
# Stop and remove containers
docker-compose down

# Remove volumes (will reset database)
docker-compose down -v

# Rebuild everything
docker-compose up --build
```

## Development Mode

For development with hot reload:

```bash
# Frontend development
cd frontend
npm install
npm run dev

# Backend development  
cd backend
composer install
php artisan serve
```

## Features

- 🔍 Search restaurants by keyword (defaults to "Bang Sue")
- 🗺️ Interactive Google Maps with restaurant markers
- 📱 Responsive design for mobile and desktop
- ⭐ Restaurant ratings and reviews
- 📍 Detailed restaurant information
- 🧭 Get directions to restaurants
- ⚡ Fast performance with caching

## Support

If you encounter issues:
1. Check this troubleshooting guide
2. View application logs
3. Ensure all prerequisites are met
4. Check Google Maps API setup 