#!/bin/bash

echo "🍽️ Starting Restaurant Finder Application..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "⚠️  Please edit .env file and add your Google Maps API key"
    echo "ℹ️  Get your API key from: https://console.cloud.google.com/"
    echo ""
fi

# Check if Google Maps API key is set
if grep -q "your_google_maps_api_key_here" .env; then
    echo "⚠️  WARNING: Please set your Google Maps API key in .env file"
    echo "ℹ️  Current key is still the placeholder value"
    echo ""
fi

echo "🐳 Starting Docker containers..."
docker-compose down
docker-compose up --build -d

echo ""
echo "✅ Application started successfully!"
echo ""
echo "🌐 Frontend (Nuxt.js): http://localhost:3000"
echo "🔧 Backend API: http://localhost:8000"
echo "🔍 API Health Check: http://localhost:8000/api/health"
echo ""
echo "📝 To stop the application, run: docker-compose down"
echo "📋 To view logs, run: docker-compose logs -f" 