<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <NuxtLink to="/" class="flex items-center">
              <h1 class="text-xl font-bold text-primary-600">
                🍽️ Restaurant Finder
              </h1>
            </NuxtLink>
          </div>
          
          <!-- Navigation -->
          <nav class="hidden md:flex space-x-8">
            <NuxtLink 
              to="/" 
              class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </NuxtLink>
            <NuxtLink 
              to="/search" 
              class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Search
            </NuxtLink>
          </nav>
          
          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="text-gray-500 hover:text-gray-900 p-2"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Mobile menu -->
        <div v-show="mobileMenuOpen" class="md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NuxtLink 
              to="/" 
              class="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              @click="mobileMenuOpen = false"
            >
              Home
            </NuxtLink>
            <NuxtLink 
              to="/search" 
              class="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              @click="mobileMenuOpen = false"
            >
              Search
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <p class="text-gray-500 text-sm">
            © 2024 Restaurant Finder. Made with ❤️ using Nuxt.js & Laravel
          </p>
          <p class="text-gray-400 text-xs mt-2">
            Powered by Google Maps API
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Mobile menu state
const mobileMenuOpen = ref(false)

// Set page title
useHead({
  titleTemplate: '%s - Restaurant Finder',
  meta: [
    { name: 'description', content: 'Find the best restaurants near you with our comprehensive restaurant finder app.' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
})
</script> 