<template>
  <div class="restaurant-card" @click="$emit('click')">
    <!-- Restaurant Image -->
    <div class="relative">
      <img
        v-if="restaurant.photos && restaurant.photos.length > 0"
        :src="restaurant.photos[0].url"
        :alt="restaurant.name"
        class="restaurant-image"
        loading="lazy"
      />
      <div
        v-else
        class="restaurant-image bg-gray-200 flex items-center justify-center"
      >
        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      
      <!-- Status Badges -->
      <div class="absolute top-2 left-2 flex gap-2">
        <span
          v-if="restaurant.opening_hours?.open_now === true"
          class="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium"
        >
          Open Now
        </span>
        <span
          v-else-if="restaurant.opening_hours?.open_now === false"
          class="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium"
        >
          Closed
        </span>
      </div>

      <!-- Price Level -->
      <div v-if="restaurant.price_level" class="absolute top-2 right-2">
        <span class="bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
          {{ getPriceLevel(restaurant.price_level) }}
        </span>
      </div>
    </div>

    <!-- Restaurant Info -->
    <div class="mt-4">
      <div class="flex items-start justify-between mb-2">
        <h3 class="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 mr-2">
          {{ restaurant.name }}
        </h3>
      </div>

      <!-- Rating -->
      <div v-if="restaurant.rating" class="flex items-center mb-2">
        <div class="rating-stars mr-2">
          <span v-for="star in 5" :key="star" class="text-sm">
            {{ star <= Math.floor(restaurant.rating) ? '★' : star <= restaurant.rating ? '☆' : '☆' }}
          </span>
        </div>
        <span class="text-sm text-gray-600">
          {{ restaurant.rating.toFixed(1) }}
        </span>
        <span v-if="restaurant.user_ratings_total" class="text-sm text-gray-500 ml-1">
          ({{ formatRatingsCount(restaurant.user_ratings_total) }})
        </span>
      </div>

      <!-- Address -->
      <p class="text-sm text-gray-600 mb-3 line-clamp-2">
        📍 {{ restaurant.address }}
      </p>

      <!-- Restaurant Types -->
      <div class="flex flex-wrap gap-1 mb-3">
        <span
          v-for="type in getDisplayTypes(restaurant.types)"
          :key="type"
          class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
        >
          {{ formatType(type) }}
        </span>
      </div>

      <!-- Action Button -->
      <button class="w-full btn-secondary text-sm">
        View Details
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Restaurant } from '~/stores/restaurants'

// Props
interface Props {
  restaurant: Restaurant
}

defineProps<Props>()

// Emits
defineEmits<{
  click: []
}>()

// Helper functions
const getPriceLevel = (level: number): string => {
  return '$'.repeat(level)
}

const formatRatingsCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`
  }
  return count.toString()
}

const getDisplayTypes = (types: string[]): string[] => {
  // Filter out generic types and limit to 3
  const relevantTypes = types.filter(type => 
    !['establishment', 'point_of_interest', 'food'].includes(type)
  )
  return relevantTypes.slice(0, 3)
}

const formatType = (type: string): string => {
  return type
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 