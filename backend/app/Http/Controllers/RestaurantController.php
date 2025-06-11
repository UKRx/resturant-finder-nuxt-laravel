<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

/**
 * Restaurant Controller
 * 
 * Handles restaurant search functionality using Google Maps Places API
 * Implements caching for better performance and reduced API calls
 */
class RestaurantController extends Controller
{
    private string $googleMapsApiKey;
    private string $placesApiUrl = 'https://maps.googleapis.com/maps/api/place';

    public function __construct()
    {
        $this->googleMapsApiKey = config('services.google_maps.api_key');
    }

    /**
     * Search for restaurants based on keyword and location
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function search(Request $request): JsonResponse
    {
        try {
            // Validate request parameters
            $request->validate([
                'keyword' => 'string|max:255',
                'location' => 'string|max:255',
                'radius' => 'integer|min:100|max:50000',
                'type' => 'string|in:restaurant,cafe,food,meal_takeaway'
            ]);

            // Set default values
            $keyword = $request->get('keyword', 'Bang Sue');
            $location = $request->get('location', 'Bang Sue, Bangkok, Thailand');
            $radius = $request->get('radius', 5000);
            $type = $request->get('type', 'restaurant');

            // Create cache key for this search
            $cacheKey = 'restaurants:' . md5($keyword . $location . $radius . $type);

            // Try to get cached results first
            $restaurants = Cache::remember($cacheKey, 1800, function () use ($keyword, $location, $radius, $type) {
                return $this->searchRestaurants($keyword, $location, $radius, $type);
            });

            return response()->json([
                'success' => true,
                'data' => $restaurants,
                'meta' => [
                    'keyword' => $keyword,
                    'location' => $location,
                    'radius' => $radius,
                    'count' => count($restaurants)
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Restaurant search failed: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to search restaurants',
                'error' => app()->environment('local') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Get detailed information about a specific restaurant
     * 
     * @param Request $request
     * @param string $placeId
     * @return JsonResponse
     */
    public function details(Request $request, string $placeId): JsonResponse
    {
        try {
            $cacheKey = 'restaurant_details:' . $placeId;

            $details = Cache::remember($cacheKey, 3600, function () use ($placeId) {
                return $this->getRestaurantDetails($placeId);
            });

            if (!$details) {
                return response()->json([
                    'success' => false,
                    'message' => 'Restaurant not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $details
            ]);

        } catch (\Exception $e) {
            Log::error('Restaurant details fetch failed: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch restaurant details',
                'error' => app()->environment('local') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Search restaurants using Google Places API
     * 
     * @param string $keyword
     * @param string $location
     * @param int $radius
     * @param string $type
     * @return array
     */
    private function searchRestaurants(string $keyword, string $location, int $radius, string $type): array
    {
        // First, geocode the location to get coordinates
        $coordinates = $this->geocodeLocation($location);
        
        if (!$coordinates) {
            throw new \Exception('Unable to geocode location: ' . $location);
        }

        // Search for restaurants using Places API
        $response = Http::get($this->placesApiUrl . '/nearbysearch/json', [
            'location' => $coordinates['lat'] . ',' . $coordinates['lng'],
            'radius' => $radius,
            'type' => $type,
            'keyword' => $keyword,
            'key' => $this->googleMapsApiKey
        ]);

        if (!$response->successful()) {
            throw new \Exception('Google Places API request failed');
        }

        $data = $response->json();

        if ($data['status'] !== 'OK' && $data['status'] !== 'ZERO_RESULTS') {
            throw new \Exception('Google Places API error: ' . $data['status']);
        }

        return $this->formatRestaurants($data['results'] ?? []);
    }

    /**
     * Get detailed restaurant information
     * 
     * @param string $placeId
     * @return array|null
     */
    private function getRestaurantDetails(string $placeId): ?array
    {
        $response = Http::get($this->placesApiUrl . '/details/json', [
            'place_id' => $placeId,
            'fields' => 'name,rating,formatted_phone_number,formatted_address,opening_hours,photos,reviews,website,price_level,geometry',
            'key' => $this->googleMapsApiKey
        ]);

        if (!$response->successful()) {
            throw new \Exception('Google Places Details API request failed');
        }

        $data = $response->json();

        if ($data['status'] !== 'OK') {
            return null;
        }

        return $this->formatRestaurantDetails($data['result']);
    }

    /**
     * Geocode location to get coordinates
     * 
     * @param string $location
     * @return array|null
     */
    private function geocodeLocation(string $location): ?array
    {
        $response = Http::get('https://maps.googleapis.com/maps/api/geocode/json', [
            'address' => $location,
            'key' => $this->googleMapsApiKey
        ]);

        if (!$response->successful()) {
            return null;
        }

        $data = $response->json();

        if ($data['status'] !== 'OK' || empty($data['results'])) {
            return null;
        }

        $location = $data['results'][0]['geometry']['location'];

        return [
            'lat' => $location['lat'],
            'lng' => $location['lng']
        ];
    }

    /**
     * Format restaurant data for consistent API response
     * 
     * @param array $restaurants
     * @return array
     */
    private function formatRestaurants(array $restaurants): array
    {
        return array_map(function ($restaurant) {
            return [
                'place_id' => $restaurant['place_id'],
                'name' => $restaurant['name'],
                'address' => $restaurant['vicinity'] ?? $restaurant['formatted_address'] ?? '',
                'rating' => $restaurant['rating'] ?? null,
                'price_level' => $restaurant['price_level'] ?? null,
                'user_ratings_total' => $restaurant['user_ratings_total'] ?? 0,
                'business_status' => $restaurant['business_status'] ?? 'OPERATIONAL',
                'opening_hours' => [
                    'open_now' => $restaurant['opening_hours']['open_now'] ?? null
                ],
                'geometry' => [
                    'location' => [
                        'lat' => $restaurant['geometry']['location']['lat'],
                        'lng' => $restaurant['geometry']['location']['lng']
                    ]
                ],
                'photos' => $this->formatPhotos($restaurant['photos'] ?? []),
                'types' => $restaurant['types'] ?? []
            ];
        }, $restaurants);
    }

    /**
     * Format detailed restaurant information
     * 
     * @param array $restaurant
     * @return array
     */
    private function formatRestaurantDetails(array $restaurant): array
    {
        return [
            'name' => $restaurant['name'],
            'rating' => $restaurant['rating'] ?? null,
            'phone' => $restaurant['formatted_phone_number'] ?? null,
            'address' => $restaurant['formatted_address'] ?? '',
            'website' => $restaurant['website'] ?? null,
            'price_level' => $restaurant['price_level'] ?? null,
            'opening_hours' => [
                'open_now' => $restaurant['opening_hours']['open_now'] ?? null,
                'weekday_text' => $restaurant['opening_hours']['weekday_text'] ?? []
            ],
            'geometry' => [
                'location' => [
                    'lat' => $restaurant['geometry']['location']['lat'],
                    'lng' => $restaurant['geometry']['location']['lng']
                ]
            ],
            'photos' => $this->formatPhotos($restaurant['photos'] ?? []),
            'reviews' => $this->formatReviews($restaurant['reviews'] ?? [])
        ];
    }

    /**
     * Format photo URLs
     * 
     * @param array $photos
     * @return array
     */
    private function formatPhotos(array $photos): array
    {
        return array_map(function ($photo) {
            return [
                'photo_reference' => $photo['photo_reference'],
                'width' => $photo['width'],
                'height' => $photo['height'],
                'url' => 'https://maps.googleapis.com/maps/api/place/photo?' . http_build_query([
                    'photo_reference' => $photo['photo_reference'],
                    'maxwidth' => 400,
                    'key' => $this->googleMapsApiKey
                ])
            ];
        }, array_slice($photos, 0, 5)); // Limit to 5 photos
    }

    /**
     * Format reviews
     * 
     * @param array $reviews
     * @return array
     */
    private function formatReviews(array $reviews): array
    {
        return array_map(function ($review) {
            return [
                'author_name' => $review['author_name'],
                'rating' => $review['rating'],
                'text' => $review['text'],
                'time' => $review['time'],
                'relative_time_description' => $review['relative_time_description']
            ];
        }, array_slice($reviews, 0, 5)); // Limit to 5 reviews
    }
} 