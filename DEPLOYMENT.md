# Deployment Guide for Vercel

This guide will help you deploy the Restaurant Finder application to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. A Google Maps API key
3. A deployed backend API (Laravel) on a service like Railway, Heroku, or similar

## Step 1: Deploy the Backend (Laravel)

Since Vercel is primarily for frontend applications, you'll need to deploy your Laravel backend separately. Here are some recommended services:

### Option A: Railway
1. Go to https://railway.app
2. Create a new project
3. Connect your GitHub repository
4. Set the root directory to `backend`
5. Add environment variables for your Laravel app

### Option B: Heroku
1. Create a Heroku app
2. Set buildpack to PHP
3. Deploy the `backend` folder
4. Configure environment variables

### Option C: DigitalOcean App Platform
1. Create a new app
2. Connect your repository
3. Set source directory to `backend`
4. Configure environment variables

## Step 2: Prepare for Vercel Deployment

1. **Update the API URL**: Once your backend is deployed, update the API URL in your environment variables.

2. **Set up environment variables**: You'll need to set these in Vercel:
   - `NUXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Your Google Maps API key
   - `NUXT_PUBLIC_API_BASE_URL`: Your deployed backend API URL (e.g., `https://your-backend.railway.app/api`)

## Step 3: Deploy to Vercel

### Method 1: Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. From your project root, run:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - Set up and deploy? `Y`
   - Which scope? Select your account
   - Link to existing project? `N`
   - What's your project's name? `restaurant-finder`
   - In which directory is your code located? `./`

5. Set environment variables:
   ```bash
   vercel env add NUXT_PUBLIC_GOOGLE_MAPS_API_KEY
   vercel env add NUXT_PUBLIC_API_BASE_URL
   ```

6. Deploy:
   ```bash
   vercel --prod
   ```

### Method 2: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your Git repository
4. Configure project settings:
   - Framework Preset: `Nuxt.js`
   - Root Directory: `./` (leave default)
   - Build Command: `cd frontend && npm run build`
   - Output Directory: `frontend/.output/public`
   - Install Command: `cd frontend && npm install`

5. Add environment variables in the "Environment Variables" section:
   - `NUXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Your Google Maps API key
   - `NUXT_PUBLIC_API_BASE_URL`: Your backend API URL

6. Click "Deploy"

## Step 4: Configure Custom Domain (Optional)

1. In your Vercel project dashboard, go to "Settings" > "Domains"
2. Add your custom domain
3. Configure DNS records as instructed by Vercel

## Step 5: Set up Continuous Deployment

Vercel automatically sets up continuous deployment from your Git repository. Every push to your main branch will trigger a new deployment.

## Troubleshooting

### Common Issues:

1. **Build fails**: Check that all dependencies are listed in `frontend/package.json`
2. **Environment variables not working**: Ensure they're prefixed with `NUXT_PUBLIC_` for client-side access
3. **API calls failing**: Verify your backend is deployed and the API URL is correct
4. **Google Maps not loading**: Check your API key and ensure the Maps JavaScript API is enabled

### Debug Commands:

```bash
# Check build locally
cd frontend && npm run build

# Test locally with production build
cd frontend && npm run preview

# Check Vercel logs
vercel logs
```

## Post-Deployment Checklist

- [ ] Frontend is accessible and loads correctly
- [ ] Google Maps integration works
- [ ] Restaurant search functionality works
- [ ] API calls to backend are successful
- [ ] All environment variables are set correctly
- [ ] SSL certificate is active (https)

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify backend API is accessible
3. Test Google Maps API key in Google Cloud Console
4. Review Nuxt.js deployment documentation

Your Restaurant Finder app should now be live on Vercel! 🎉 