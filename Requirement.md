# Restaurant Finder Web Application

Create a full-stack restaurant finder web application using Nuxt.js and Laravel with the following specifications:

## Project Overview
Build a responsive web application that displays a list of restaurants using Google Maps API. Users can search for restaurants with a keyword, with "Bang Sue" as the default search term.

## Tech Stack Requirements
- **Frontend**: Nuxt.js (Vue.js framework)
- **Backend**: Laravel (PHP framework) as API endpoint
- **Styling**: Tailwind CSS and Bootstrap for responsive design
- **API Integration**: Google Maps API for restaurant data
- **Caching**: Implement caching mechanisms for improved performance

## Core Features to Implement

### 1. Restaurant Search Interface
- Create a search input field for keywords
- Set "Bang Sue" as the default search term
- Implement real-time search functionality
- Display search results in a clean, organized layout

### 2. Restaurant List Display
- Show restaurant information including:
  - Restaurant name
  - Address/location
  - Rating (if available)
  - Photos (if available)
  - Opening hours
- Implement responsive grid/list layout
- Add loading states and error handling

### 3. Google Maps Integration
- Integrate Google Maps API for restaurant data
- Display restaurant locations on an interactive map
- Implement map markers for each restaurant
- Add click functionality to view restaurant details

### 4. Backend API (Laravel)
- Create RESTful API endpoints for restaurant data
- Implement Google Maps API communication
- Add caching layer for API responses
- Include proper error handling and validation

## Technical Requirements

### Nuxt.js Implementation
- Use Nuxt 3 with Composition API
- Implement SSR (Server-Side Rendering) for better SEO
- Create reusable Vue components
- Use Pinia for state management
- Implement proper routing structure

### Styling & Responsiveness
- Use Tailwind CSS for utility-first styling
- Integrate Bootstrap components where needed
- Ensure mobile-first responsive design
- Create consistent design system
- Implement dark/light mode toggle (bonus)

### Performance Optimization
- Implement lazy loading for images
- Add caching for API responses
- Optimize bundle size
- Use Nuxt's built-in performance features

## File Structure

project/
├── frontend/ (Nuxt.js)
│ ├── components/
│ ├── pages/
│ ├── composables/
│ ├── assets/
│ └── nuxt.config.ts
└── backend/ (Laravel)
├── app/Http/Controllers/
├── routes/
└── config/


## Code Quality Standards
- Add comprehensive code comments
- Follow Vue.js and Laravel coding conventions
- Implement proper error handling
- Use TypeScript with Nuxt.js
- Add input validation and sanitization
- Include environment configuration for API keys

## Deployment Requirements
- Upload code to any Git server (GitHub, GitLab, etc.)
- Include detailed README with setup instructions
- Provide environment configuration examples
- Document API endpoints and usage

## Evaluation Criteria
- Clean, maintainable code structure
- Proper use of Nuxt.js features
- Effective Laravel API implementation
- Responsive design implementation
- Google Maps API integration quality
- Performance optimization
- Error handling and user experience
- Code documentation and comments
- Git commit history and project organization

## Bonus Features (Optional)
- User favorites/bookmarks functionality
- Restaurant filtering by cuisine type
- Distance calculation from user location
- Restaurant reviews and ratings display
- Progressive Web App (PWA) features

Please create this application with attention to learning capability, code quality, directory structure, and team collaboration potential.
