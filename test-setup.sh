#!/bin/bash

echo "🧪 Testing Restaurant Finder Docker Setup..."
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
print_status "Checking Docker status..."
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi
print_success "Docker is running"

# Check if .env file exists
print_status "Checking environment configuration..."
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from template..."
    cp env.example .env
fi

# Check for Google Maps API key
if grep -q "your_google_maps_api_key_here" .env; then
    print_warning "Google Maps API key is not set. The app will work but won't show real restaurant data."
    print_status "To fix this:"
    print_status "1. Get API key from https://console.cloud.google.com/"
    print_status "2. Enable Maps JavaScript API, Places API, and Geocoding API"
    print_status "3. Replace 'your_google_maps_api_key_here' in .env file"
else
    print_success "Google Maps API key is configured"
fi

# Clean up any existing containers
print_status "Cleaning up existing containers..."
docker-compose down -v > /dev/null 2>&1

# Build and start services
print_status "Building and starting Docker containers..."
if docker-compose up --build -d; then
    print_success "Containers started successfully"
else
    print_error "Failed to start containers"
    exit 1
fi

# Wait for services to be ready
print_status "Waiting for services to be ready..."
sleep 10

# Test database connectivity
print_status "Testing database connection..."
if docker-compose exec -T database mysqladmin ping -h localhost --silent; then
    print_success "Database is accessible"
else
    print_error "Database connection failed"
fi

# Test backend API
print_status "Testing backend API..."
max_attempts=30
attempt=1

while [ $attempt -le $max_attempts ]; do
    if curl -s -f http://localhost:8000/api/health > /dev/null; then
        print_success "Backend API is responding"
        break
    else
        if [ $attempt -eq $max_attempts ]; then
            print_error "Backend API failed to start after $max_attempts attempts"
            print_status "Checking backend logs..."
            docker-compose logs backend
        else
            print_status "Waiting for backend API... (attempt $attempt/$max_attempts)"
            sleep 2
            ((attempt++))
        fi
    fi
done

# Test frontend
print_status "Testing frontend..."
max_attempts=30
attempt=1

while [ $attempt -le $max_attempts ]; do
    if curl -s -f http://localhost:3000 > /dev/null; then
        print_success "Frontend is responding"
        break
    else
        if [ $attempt -eq $max_attempts ]; then
            print_error "Frontend failed to start after $max_attempts attempts"
            print_status "Checking frontend logs..."
            docker-compose logs frontend
        else
            print_status "Waiting for frontend... (attempt $attempt/$max_attempts)"
            sleep 2
            ((attempt++))
        fi
    fi
done

# Test API endpoints
print_status "Testing API endpoints..."

# Health check
if curl -s -f http://localhost:8000/api/health | grep -q "ok"; then
    print_success "Health endpoint working"
else
    print_error "Health endpoint failed"
fi

# Restaurant search endpoint
print_status "Testing restaurant search endpoint..."
if curl -s -f "http://localhost:8000/api/restaurants/search?keyword=restaurant" > /dev/null; then
    print_success "Restaurant search endpoint working"
else
    print_warning "Restaurant search endpoint may not be working (could be due to missing API key)"
fi

# Show container status
print_status "Container status:"
docker-compose ps

# Show logs summary
print_status "Recent logs:"
echo "--- Backend Logs (last 10 lines) ---"
docker-compose logs --tail=10 backend
echo ""
echo "--- Frontend Logs (last 10 lines) ---"
docker-compose logs --tail=10 frontend

echo ""
echo "=============================================="
print_success "Setup testing completed!"
echo ""
print_status "Access your application:"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8000"
echo "📊 Health Check: http://localhost:8000/api/health"
echo ""
print_status "To stop the application:"
echo "docker-compose down"
echo ""
print_status "To view real-time logs:"
echo "docker-compose logs -f" 