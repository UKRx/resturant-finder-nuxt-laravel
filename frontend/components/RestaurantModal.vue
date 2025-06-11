<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        @click="$emit('close')"
      ></div>
      
      <!-- Modal -->
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 class="text-2xl font-bold text-gray-900">
              {{ restaurant.name }}
            </h2>
            <button
              @click="$emit('close')"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="overflow-y-auto max-h-[calc(90vh-120px)]">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
              <!-- Left Column - Info -->
              <div>
                <!-- Photos -->
                <div v-if="restaurant.photos && restaurant.photos.length > 0" class="mb-6">
                  <div class="grid grid-cols-2 gap-2">
                    <img
                      v-for="(photo, index) in restaurant.photos.slice(0, 4)"
                      :key="index"
                      :src="photo.url"
                      :alt="`${restaurant.name} photo ${index + 1}`"
                      class="w-full h-32 object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>
                </div>

                <!-- Basic Info -->
                <div class="space-y-4 mb-6">
                  <!-- Rating -->
                  <div v-if="restaurant.rating" class="flex items-center">
                    <div class="rating-stars text-lg mr-3">
                      <span v-for="star in 5" :key="star">
                        {{ star <= Math.floor(restaurant.rating) ? '★' : star <= restaurant.rating ? '☆' : '☆' }}
                      </span>
                    </div>
                    <span class="text-lg font-medium text-gray-900">
                      {{ restaurant.rating.toFixed(1) }}
                    </span>
                    <span v-if="restaurant.user_ratings_total" class="text-gray-500 ml-2">
                      ({{ restaurant.user_ratings_total }} reviews)
                    </span>
                  </div>

                  <!-- Address -->
                  <div class="flex items-start">
                    <svg class="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="text-gray-700">{{ restaurant.address }}</span>
                  </div>

                  <!-- Phone -->
                  <div v-if="details?.phone" class="flex items-center">
                    <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a :href="`tel:${details.phone}`" class="text-primary-600 hover:text-primary-800">
                      {{ details.phone }}
                    </a>
                  </div>

                  <!-- Website -->
                  <div v-if="details?.website" class="flex items-center">
                    <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <a :href="details.website" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:text-primary-800">
                      Visit Website
                    </a>
                  </div>

                  <!-- Price Level -->
                  <div v-if="restaurant.price_level" class="flex items-center">
                    <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span class="text-gray-700">
                      Price: {{ getPriceLevel(restaurant.price_level) }}
                    </span>
                  </div>

                  <!-- Opening Hours -->
                  <div v-if="details?.opening_hours?.weekday_text?.length" class="border-t pt-4">
                    <h4 class="font-medium text-gray-900 mb-2">Opening Hours</h4>
                    <div class="space-y-1">
                      <div
                        v-for="hours in details.opening_hours.weekday_text"
                        :key="hours"
                        class="text-sm text-gray-600"
                      >
                        {{ hours }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Reviews -->
                <div v-if="details?.reviews?.length" class="border-t pt-4">
                  <h4 class="font-medium text-gray-900 mb-4">Recent Reviews</h4>
                  <div class="space-y-4">
                    <div
                      v-for="review in details.reviews.slice(0, 3)"
                      :key="review.time"
                      class="bg-gray-50 rounded-lg p-4"
                    >
                      <div class="flex items-center justify-between mb-2">
                        <span class="font-medium text-gray-900">{{ review.author_name }}</span>
                        <div class="flex items-center">
                          <div class="rating-stars text-sm mr-2">
                            <span v-for="star in 5" :key="star">
                              {{ star <= review.rating ? '★' : '☆' }}
                            </span>
                          </div>
                          <span class="text-sm text-gray-500">{{ review.relative_time_description }}</span>
                        </div>
                      </div>
                      <p class="text-sm text-gray-700">{{ review.text }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Column - Map -->
              <div>
                <div class="sticky top-0">
                  <h4 class="font-medium text-gray-900 mb-4">Location</h4>
                  <div 
                    ref="mapContainer" 
                    class="map-container"
                  ></div>
                  
                  <!-- Action Buttons -->
                  <div class="mt-4 space-y-2">
                    <button
                      @click="openInGoogleMaps"
                      class="w-full btn-primary flex items-center justify-center"
                    >
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Open in Google Maps
                    </button>
                    
                    <button
                      @click="getDirections"
                      class="w-full btn-secondary flex items-center justify-center"
                    >
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRestaurantsStore } from '~/stores/restaurants'
import type { Restaurant, RestaurantDetails } from '~/stores/restaurants'

// Props
interface Props {
  restaurant: Restaurant
}

const props = defineProps<Props>()

// Emits
defineEmits<{
  close: []
}>()

// Store
const restaurantsStore = useRestaurantsStore()

// Reactive data
const mapContainer = ref<HTMLElement>()
const details = ref<RestaurantDetails | null>(null)
const map = ref<google.maps.Map | null>(null)

// Fetch detailed restaurant information
onMounted(async () => {
  // Get detailed information
  const restaurantDetails = await restaurantsStore.getRestaurantDetails(props.restaurant.place_id)
  if (restaurantDetails) {
    details.value = restaurantDetails
  }

  // Initialize map
  await nextTick()
  initializeMap()
})

// Cleanup
onUnmounted(() => {
  map.value = null
})

// Helper functions
const getPriceLevel = (level: number): string => {
  const labels = ['Free', 'Inexpensive', 'Moderate', 'Expensive', 'Very Expensive']
  return labels[level] || 'Unknown'
}

const initializeMap = () => {
  if (!mapContainer.value || !window.google) return

  const location = props.restaurant.geometry.location

  map.value = new google.maps.Map(mapContainer.value, {
    center: { lat: location.lat, lng: location.lng },
    zoom: 16,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  })

  // Add marker
  new google.maps.Marker({
    position: { lat: location.lat, lng: location.lng },
    map: map.value,
    title: props.restaurant.name,
    icon: {
      url: 'https://maps.google.com/mapfiles/ms/icons/restaurant.png'
    }
  })
}

const openInGoogleMaps = () => {
  const location = props.restaurant.geometry.location
  const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}&query_place_id=${props.restaurant.place_id}`
  window.open(url, '_blank')
}

const getDirections = () => {
  const location = props.restaurant.geometry.location
  const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}&destination_place_id=${props.restaurant.place_id}`
  window.open(url, '_blank')
}
</script>

<style scoped>
/* Custom styles for the modal */
.map-container {
  height: 300px;
}

@media (max-width: 1024px) {
  .map-container {
    height: 250px;
  }
}
</style> 