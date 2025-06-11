import { defineStore } from 'pinia'

export interface Restaurant {
  place_id: string
  name: string
  address: string
  rating?: number
  price_level?: number
  user_ratings_total: number
  business_status: string
  opening_hours: {
    open_now?: boolean
  }
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
  photos: Array<{
    photo_reference: string
    width: number
    height: number
    url: string
  }>
  types: string[]
}

export interface RestaurantDetails extends Restaurant {
  phone?: string
  website?: string
  opening_hours: {
    open_now?: boolean
    weekday_text: string[]
  }
  reviews: Array<{
    author_name: string
    rating: number
    text: string
    time: number
    relative_time_description: string
  }>
}

export interface SearchParams {
  keyword: string
  location: string
  radius: number
  type: string
}

export const useRestaurantsStore = defineStore('restaurants', {
  state: () => ({
    restaurants: [] as Restaurant[],
    selectedRestaurant: null as RestaurantDetails | null,
    loading: false,
    error: null as string | null,
    searchParams: {
      keyword: 'Bang Sue',
      location: 'Bang Sue, Bangkok, Thailand',
      radius: 5000,
      type: 'restaurant'
    } as SearchParams,
    searchMeta: {
      count: 0,
      lastSearchTime: null as Date | null
    }
  }),

  getters: {
    /**
     * Get restaurants with ratings
     */
    ratedRestaurants: (state) => {
      return state.restaurants.filter(restaurant => restaurant.rating && restaurant.rating > 0)
    },

    /**
     * Get open restaurants
     */
    openRestaurants: (state) => {
      return state.restaurants.filter(restaurant => restaurant.opening_hours?.open_now === true)
    },

    /**
     * Get restaurants sorted by rating
     */
    topRatedRestaurants: (state) => {
      return [...state.restaurants]
        .filter(restaurant => restaurant.rating && restaurant.rating > 0)
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    },

    /**
     * Check if there are any search results
     */
    hasResults: (state) => state.restaurants.length > 0,

    /**
     * Check if currently loading
     */
    isLoading: (state) => state.loading,

    /**
     * Get current search keyword
     */
    currentKeyword: (state) => state.searchParams.keyword
  },

  actions: {
    /**
     * Search for restaurants
     */
    async searchRestaurants(params?: Partial<SearchParams>) {
      this.loading = true
      this.error = null

      try {
        // Update search params
        if (params) {
          this.searchParams = { ...this.searchParams, ...params }
        }

        const config = useRuntimeConfig()
        const queryParams = new URLSearchParams({
          keyword: this.searchParams.keyword,
          location: this.searchParams.location,
          radius: this.searchParams.radius.toString(),
          type: this.searchParams.type
        })

        const response = await $fetch<{
          success: boolean
          data: Restaurant[]
          meta: {
            keyword: string
            location: string
            radius: number
            count: number
          }
        }>(`${config.public.apiBaseUrl}/restaurants/search?${queryParams}`)

        if (response.success) {
          this.restaurants = response.data
          this.searchMeta.count = response.meta.count
          this.searchMeta.lastSearchTime = new Date()
        } else {
          throw new Error('Failed to fetch restaurants')
        }
      } catch (error) {
        console.error('Search error:', error)
        this.error = error instanceof Error ? error.message : 'Failed to search restaurants'
        this.restaurants = []
      } finally {
        this.loading = false
      }
    },

    /**
     * Get detailed restaurant information
     */
    async getRestaurantDetails(placeId: string) {
      this.loading = true
      this.error = null

      try {
        const config = useRuntimeConfig()
        const response = await $fetch<{
          success: boolean
          data: RestaurantDetails
        }>(`${config.public.apiBaseUrl}/restaurants/${placeId}/details`)

        if (response.success) {
          this.selectedRestaurant = response.data
          return response.data
        } else {
          throw new Error('Restaurant not found')
        }
      } catch (error) {
        console.error('Details error:', error)
        this.error = error instanceof Error ? error.message : 'Failed to fetch restaurant details'
        return null
      } finally {
        this.loading = false
      }
    },

    /**
     * Update search keyword
     */
    updateKeyword(keyword: string) {
      this.searchParams.keyword = keyword
    },

    /**
     * Update search location
     */
    updateLocation(location: string) {
      this.searchParams.location = location
    },

    /**
     * Update search radius
     */
    updateRadius(radius: number) {
      this.searchParams.radius = radius
    },

    /**
     * Update search type
     */
    updateType(type: string) {
      this.searchParams.type = type
    },

    /**
     * Clear search results
     */
    clearResults() {
      this.restaurants = []
      this.selectedRestaurant = null
      this.searchMeta.count = 0
    },

    /**
     * Clear error state
     */
    clearError() {
      this.error = null
    },

    /**
     * Reset to default search params
     */
    resetSearch() {
      this.searchParams = {
        keyword: 'Bang Sue',
        location: 'Bang Sue, Bangkok, Thailand',
        radius: 5000,
        type: 'restaurant'
      }
      this.clearResults()
      this.clearError()
    }
  }
}) 