#!/bin/bash

echo "🚀 Restaurant Finder - Vercel Deployment Script"
echo "================================================"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if we're logged in to Vercel
echo "🔐 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo "Please login to Vercel:"
    vercel login
fi

# Verify environment variables
echo "🔧 Environment Variables Checklist:"
echo "Please ensure you have set the following environment variables in Vercel:"
echo "  - NUXT_PUBLIC_GOOGLE_MAPS_API_KEY"
echo "  - NUXT_PUBLIC_API_BASE_URL"
echo ""

read -p "Have you set up these environment variables in Vercel? (y/N): " confirm
if [[ $confirm != [yY] && $confirm != [yY][eE][sS] ]]; then
    echo "Please set up environment variables first:"
    echo "  vercel env add NUXT_PUBLIC_GOOGLE_MAPS_API_KEY"
    echo "  vercel env add NUXT_PUBLIC_API_BASE_URL"
    exit 1
fi

# Test build locally first
echo "🔨 Testing build locally..."
cd frontend
if npm run build; then
    echo "✅ Local build successful!"
else
    echo "❌ Local build failed. Please fix errors before deploying."
    exit 1
fi

cd ..

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo ""
echo "🎉 Deployment complete!"
echo "Check your Vercel dashboard for the live URL."
echo ""
echo "Remember to:"
echo "  1. Test your live site"
echo "  2. Verify Google Maps integration"
echo "  3. Check API connectivity"
echo "  4. Set up custom domain (optional)" 