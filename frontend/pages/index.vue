<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Find Amazing Restaurants
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-primary-100">
            Discover the best dining experiences in your area
          </p>
          
          <!-- Search Form -->
          <div class="max-w-2xl mx-auto">
            <form @submit.prevent="handleSearch" class="bg-white rounded-lg p-4 shadow-lg">
              <div class="flex flex-col md:flex-row gap-4">
                <div class="flex-1">
                  <input
                    v-model="searchKeyword"
                    type="text"
                    placeholder="Search for restaurants... (e.g., Bang Sue)"
                    class="input-field text-gray-900"
                    required
                  />
                </div>
                <button
                  type="submit"
                  :disabled="restaurantsStore.loading"
                  class="btn-primary flex items-center justify-center min-w-[120px]"
                >
                  <svg v-if="restaurantsStore.loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span v-if="!restaurantsStore.loading">Search</span>
                  <span v-else>Searching...</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Search Results Section -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Search Info -->
        <div v-if="restaurantsStore.hasResults || restaurantsStore.loading" class="mb-8">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 class="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
              <span v-if="restaurantsStore.loading">Searching restaurants...</span>
              <span v-else>
                Found {{ restaurantsStore.searchMeta.count }} restaurants
                <span class="text-primary-600">for "{{ restaurantsStore.currentKeyword }}"</span>
              </span>
            </h2>
            
            <!-- Filter Buttons -->
            <div v-if="!restaurantsStore.loading" class="flex gap-2 flex-wrap">
              <button
                @click="filterType = 'all'"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  filterType === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]"
              >
                All ({{ restaurantsStore.restaurants.length }})
              </button>
              <button
                @click="filterType = 'rated'"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  filterType === 'rated' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]"
              >
                Rated ({{ restaurantsStore.ratedRestaurants.length }})
              </button>
              <button
                @click="filterType = 'open'"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  filterType === 'open' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]"
              >
                Open Now ({{ restaurantsStore.openRestaurants.length }})
              </button>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="restaurantsStore.error" class="mb-8">
          <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">
                  Search Error
                </h3>
                <p class="mt-1 text-sm text-red-700">
                  {{ restaurantsStore.error }}
                </p>
                <button
                  @click="restaurantsStore.clearError"
                  class="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="restaurantsStore.loading" class="text-center py-12">
          <div class="loading-spinner mx-auto mb-4"></div>
          <p class="text-gray-500">Finding the best restaurants for you...</p>
        </div>

        <!-- Restaurant Grid -->
        <div v-else-if="filteredRestaurants.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RestaurantCard
            v-for="restaurant in filteredRestaurants"
            :key="restaurant.place_id"
            :restaurant="restaurant"
            @click="selectRestaurant(restaurant)"
          />
        </div>

        <!-- No Results -->
        <div v-else-if="!restaurantsStore.loading && searchKeyword" class="text-center py-12">
          <div class="max-w-md mx-auto">
            <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No restaurants found</h3>
            <p class="text-gray-500 mb-4">
              We couldn't find any restaurants matching your search. Try a different keyword or location.
            </p>
            <button
              @click="handleDefaultSearch"
              class="btn-primary"
            >
              Search in Bang Sue
            </button>
          </div>
        </div>

        <!-- Welcome State -->
        <div v-else-if="!searchKeyword" class="text-center py-12">
          <div class="max-w-md mx-auto">
            <div class="text-6xl mb-4">🍽️</div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Welcome to Restaurant Finder</h3>
            <p class="text-gray-500 mb-4">
              Search for restaurants in your area to get started.
            </p>
            <button
              @click="handleDefaultSearch"
              class="btn-primary"
            >
              Explore Bang Sue Restaurants
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Restaurant Details Modal -->
    <RestaurantModal
      v-if="selectedRestaurant"
      :restaurant="selectedRestaurant"
      @close="selectedRestaurant = null"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRestaurantsStore } from '~/stores/restaurants'
import type { Restaurant } from '~/stores/restaurants'

// Meta
useHead({
  title: 'Home'
})

// Store
const restaurantsStore = useRestaurantsStore()

// Reactive data
const searchKeyword = ref('')
const filterType = ref<'all' | 'rated' | 'open'>('all')
const selectedRestaurant = ref<Restaurant | null>(null)

// Computed
const filteredRestaurants = computed(() => {
  switch (filterType.value) {
    case 'rated':
      return restaurantsStore.ratedRestaurants
    case 'open':
      return restaurantsStore.openRestaurants
    default:
      return restaurantsStore.restaurants
  }
})

// Methods
const handleSearch = async () => {
  if (!searchKeyword.value.trim()) return
  
  await restaurantsStore.searchRestaurants({
    keyword: searchKeyword.value.trim()
  })
}

const handleDefaultSearch = async () => {
  searchKeyword.value = 'Bang Sue'
  await handleSearch()
}

const selectRestaurant = (restaurant: Restaurant) => {
  selectedRestaurant.value = restaurant
}

// Initialize with default search on mount
onMounted(() => {
  searchKeyword.value = restaurantsStore.currentKeyword
  if (restaurantsStore.restaurants.length === 0) {
    handleDefaultSearch()
  }
})
</script> 