# Laravel Backend Deployment Guide

## 🚀 Deploy to Railway (Recommended)

Railway is the best platform for Laravel applications. Follow these steps:

### 1. **Go to Railway Dashboard**
- Visit [railway.app](https://railway.app)
- Sign in with your GitHub account
- Click "New Project"

### 2. **Deploy from GitHub Repository**
- Select "Deploy from GitHub repo"
- Choose your repository: `UKRx/resturant-finder-nuxt-laravel`
- Set the **Root Directory** to: `backend`
- Click "Deploy"

### 3. **Add a PostgreSQL Database**
- In your Railway project dashboard
- Click "New" → "Database" → "Add PostgreSQL"
- Railway will automatically create the database

### 4. **Configure Environment Variables**
Go to your backend service → Variables tab and add these:

```bash
APP_NAME=Restaurant Finder API
APP_ENV=production
APP_DEBUG=false
LOG_CHANNEL=errorlog

# Database (Railway will auto-populate these from PostgreSQL service)
DB_CONNECTION=pgsql
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_DATABASE=${{Postgres.PGDATABASE}}
DB_USERNAME=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}

# Google Maps API Key (same as your Vercel one)
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Session & Cache
SESSION_DRIVER=file
CACHE_DRIVER=file
QUEUE_CONNECTION=sync

# Generate this using: php artisan key:generate --show
APP_KEY=base64:your_generated_app_key_here
```

### 5. **Generate APP_KEY**
Run this locally in your backend folder:
```bash
cd backend
php artisan key:generate --show
```
Copy the generated key and add it to Railway variables.

### 6. **Deploy Configuration**
Railway should automatically detect Laravel. If needed, add these deploy settings:

**Build Command:**
```bash
composer install --no-dev --optimize-autoloader && php artisan config:cache && php artisan route:cache && php artisan view:cache
```

**Start Command:**
```bash
php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=$PORT
```

### 7. **Generate Railway Domain**
- Go to your backend service → Settings → Networking
- Click "Generate Domain"
- Copy the generated URL (e.g., `https://your-app-name.up.railway.app`)

### 8. **Update Frontend Configuration**
Add this environment variable to your **Vercel** project:
```bash
NUXT_PUBLIC_API_BASE_URL=https://your-railway-backend-url.up.railway.app/api
```

---

## 🔄 Alternative: Deploy to Heroku

If Railway doesn't work, use Heroku:

### 1. **Install Heroku CLI**
```bash
npm install -g heroku
heroku login
```

### 2. **Create Heroku App**
```bash
cd backend
heroku create restaurant-finder-api
heroku addons:create heroku-postgresql:mini
```

### 3. **Configure Environment Variables**
```bash
heroku config:set APP_NAME="Restaurant Finder API"
heroku config:set APP_ENV=production
heroku config:set APP_DEBUG=false
heroku config:set LOG_CHANNEL=errorlog
heroku config:set GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
# Generate and set APP_KEY
php artisan key:generate --show
heroku config:set APP_KEY=base64:your_generated_key_here
```

### 4. **Create Procfile**
```bash
echo "web: php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=\$PORT" > Procfile
```

### 5. **Deploy**
```bash
git add .
git commit -m "Configure for Heroku deployment"
git push heroku main
```

---

## 🧪 Test Your Backend API

Once deployed, test these endpoints:

### Health Check
```bash
curl https://your-backend-url.com/api/health
```

### Restaurant Search
```bash
curl "https://your-backend-url.com/api/restaurants/search?keyword=restaurant&location=Bangkok"
```

---

## 🔗 Connect Frontend to Backend

### Update Vercel Environment Variables
1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add:
   ```bash
   NUXT_PUBLIC_API_BASE_URL=https://your-backend-url.com/api
   ```
4. Redeploy your frontend

### Test Full Integration
Visit your Vercel app and try searching for restaurants. The frontend should now communicate with your deployed backend!

---

## 🛠️ Troubleshooting

### Common Issues:

1. **CORS Error**
   - Add this to `backend/config/cors.php`:
   ```php
   'allowed_origins' => ['https://your-vercel-app.vercel.app'],
   ```

2. **Database Connection Error**
   - Verify all database environment variables are set correctly
   - Check that PostgreSQL service is running

3. **Google Maps API Error**
   - Ensure your API key is valid and has the right permissions
   - Enable required APIs: Places API, Maps JavaScript API, Geocoding API

4. **App Key Error**
   - Generate a new key: `php artisan key:generate --show`
   - Add it to your environment variables

---

## 🎯 Final Steps

Once everything is deployed:

1. ✅ **Backend deployed** (Railway/Heroku)
2. ✅ **Database connected** (PostgreSQL)
3. ✅ **Frontend updated** with backend URL
4. ✅ **Environment variables set** (Google Maps API Key)
5. ✅ **Test the application** end-to-end

Your Restaurant Finder application should now be fully functional with both frontend and backend deployed! 🎉 