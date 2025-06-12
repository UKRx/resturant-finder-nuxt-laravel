import { defineComponent, ref, computed, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderComponent, ssrRenderTeleport } from 'vue/server-renderer';
import { d as defineStore, _ as _export_sfc, u as useRuntimeConfig } from './server.mjs';
import { u as useHead } from './v3-CHB0jlcv.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "RestaurantCard",
  __ssrInlineRender: true,
  props: {
    restaurant: {}
  },
  emits: ["click"],
  setup(__props) {
    const getPriceLevel = (level) => {
      return "$".repeat(level);
    };
    const formatRatingsCount = (count) => {
      if (count >= 1e3) {
        return `${(count / 1e3).toFixed(1)}k`;
      }
      return count.toString();
    };
    const getDisplayTypes = (types) => {
      const relevantTypes = types.filter(
        (type) => !["establishment", "point_of_interest", "food"].includes(type)
      );
      return relevantTypes.slice(0, 3);
    };
    const formatType = (type) => {
      return type.replace(/_/g, " ").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "restaurant-card" }, _attrs))} data-v-c320c20e><div class="relative" data-v-c320c20e>`);
      if (_ctx.restaurant.photos && _ctx.restaurant.photos.length > 0) {
        _push(`<img${ssrRenderAttr("src", _ctx.restaurant.photos[0].url)}${ssrRenderAttr("alt", _ctx.restaurant.name)} class="restaurant-image" loading="lazy" data-v-c320c20e>`);
      } else {
        _push(`<div class="restaurant-image bg-gray-200 flex items-center justify-center" data-v-c320c20e><svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c320c20e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-c320c20e></path></svg></div>`);
      }
      _push(`<div class="absolute top-2 left-2 flex gap-2" data-v-c320c20e>`);
      if (((_a = _ctx.restaurant.opening_hours) == null ? void 0 : _a.open_now) === true) {
        _push(`<span class="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium" data-v-c320c20e> Open Now </span>`);
      } else if (((_b = _ctx.restaurant.opening_hours) == null ? void 0 : _b.open_now) === false) {
        _push(`<span class="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium" data-v-c320c20e> Closed </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (_ctx.restaurant.price_level) {
        _push(`<div class="absolute top-2 right-2" data-v-c320c20e><span class="bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full" data-v-c320c20e>${ssrInterpolate(getPriceLevel(_ctx.restaurant.price_level))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mt-4" data-v-c320c20e><div class="flex items-start justify-between mb-2" data-v-c320c20e><h3 class="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 mr-2" data-v-c320c20e>${ssrInterpolate(_ctx.restaurant.name)}</h3></div>`);
      if (_ctx.restaurant.rating) {
        _push(`<div class="flex items-center mb-2" data-v-c320c20e><div class="rating-stars mr-2" data-v-c320c20e><!--[-->`);
        ssrRenderList(5, (star) => {
          _push(`<span class="text-sm" data-v-c320c20e>${ssrInterpolate(star <= Math.floor(_ctx.restaurant.rating) ? "\u2605" : star <= _ctx.restaurant.rating ? "\u2606" : "\u2606")}</span>`);
        });
        _push(`<!--]--></div><span class="text-sm text-gray-600" data-v-c320c20e>${ssrInterpolate(_ctx.restaurant.rating.toFixed(1))}</span>`);
        if (_ctx.restaurant.user_ratings_total) {
          _push(`<span class="text-sm text-gray-500 ml-1" data-v-c320c20e> (${ssrInterpolate(formatRatingsCount(_ctx.restaurant.user_ratings_total))}) </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="text-sm text-gray-600 mb-3 line-clamp-2" data-v-c320c20e> \u{1F4CD} ${ssrInterpolate(_ctx.restaurant.address)}</p><div class="flex flex-wrap gap-1 mb-3" data-v-c320c20e><!--[-->`);
      ssrRenderList(getDisplayTypes(_ctx.restaurant.types), (type) => {
        _push(`<span class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full" data-v-c320c20e>${ssrInterpolate(formatType(type))}</span>`);
      });
      _push(`<!--]--></div><button class="w-full btn-secondary text-sm" data-v-c320c20e> View Details </button></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RestaurantCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-c320c20e"]]);
const useRestaurantsStore = defineStore("restaurants", {
  state: () => ({
    restaurants: [],
    selectedRestaurant: null,
    loading: false,
    error: null,
    searchParams: {
      keyword: "Bang Sue",
      location: "Bang Sue, Bangkok, Thailand",
      radius: 5e3,
      type: "restaurant"
    },
    searchMeta: {
      count: 0,
      lastSearchTime: null
    }
  }),
  getters: {
    /**
     * Get restaurants with ratings
     */
    ratedRestaurants: (state) => {
      return state.restaurants.filter((restaurant) => restaurant.rating && restaurant.rating > 0);
    },
    /**
     * Get open restaurants
     */
    openRestaurants: (state) => {
      return state.restaurants.filter((restaurant) => {
        var _a;
        return ((_a = restaurant.opening_hours) == null ? void 0 : _a.open_now) === true;
      });
    },
    /**
     * Get restaurants sorted by rating
     */
    topRatedRestaurants: (state) => {
      return [...state.restaurants].filter((restaurant) => restaurant.rating && restaurant.rating > 0).sort((a, b) => (b.rating || 0) - (a.rating || 0));
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
    async searchRestaurants(params) {
      this.loading = true;
      this.error = null;
      try {
        if (params) {
          this.searchParams = { ...this.searchParams, ...params };
        }
        const config = useRuntimeConfig();
        const queryParams = new URLSearchParams({
          keyword: this.searchParams.keyword,
          location: this.searchParams.location,
          radius: this.searchParams.radius.toString(),
          type: this.searchParams.type
        });
        const response = await $fetch(`${config.public.apiBaseUrl}/restaurants/search?${queryParams}`);
        if (response.success) {
          this.restaurants = response.data;
          this.searchMeta.count = response.meta.count;
          this.searchMeta.lastSearchTime = /* @__PURE__ */ new Date();
        } else {
          throw new Error("Failed to fetch restaurants");
        }
      } catch (error) {
        console.error("Search error:", error);
        this.error = error instanceof Error ? error.message : "Failed to search restaurants";
        this.restaurants = [];
      } finally {
        this.loading = false;
      }
    },
    /**
     * Get detailed restaurant information
     */
    async getRestaurantDetails(placeId) {
      this.loading = true;
      this.error = null;
      try {
        const config = useRuntimeConfig();
        const response = await $fetch(`${config.public.apiBaseUrl}/restaurants/${placeId}/details`);
        if (response.success) {
          this.selectedRestaurant = response.data;
          return response.data;
        } else {
          throw new Error("Restaurant not found");
        }
      } catch (error) {
        console.error("Details error:", error);
        this.error = error instanceof Error ? error.message : "Failed to fetch restaurant details";
        return null;
      } finally {
        this.loading = false;
      }
    },
    /**
     * Update search keyword
     */
    updateKeyword(keyword) {
      this.searchParams.keyword = keyword;
    },
    /**
     * Update search location
     */
    updateLocation(location) {
      this.searchParams.location = location;
    },
    /**
     * Update search radius
     */
    updateRadius(radius) {
      this.searchParams.radius = radius;
    },
    /**
     * Update search type
     */
    updateType(type) {
      this.searchParams.type = type;
    },
    /**
     * Clear search results
     */
    clearResults() {
      this.restaurants = [];
      this.selectedRestaurant = null;
      this.searchMeta.count = 0;
    },
    /**
     * Clear error state
     */
    clearError() {
      this.error = null;
    },
    /**
     * Reset to default search params
     */
    resetSearch() {
      this.searchParams = {
        keyword: "Bang Sue",
        location: "Bang Sue, Bangkok, Thailand",
        radius: 5e3,
        type: "restaurant"
      };
      this.clearResults();
      this.clearError();
    }
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "RestaurantModal",
  __ssrInlineRender: true,
  props: {
    restaurant: {}
  },
  emits: ["close"],
  setup(__props) {
    useRestaurantsStore();
    ref();
    const details = ref(null);
    ref(null);
    const getPriceLevel = (level) => {
      const labels = ["Free", "Inexpensive", "Moderate", "Expensive", "Very Expensive"];
      return labels[level] || "Unknown";
    };
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        var _a, _b, _c, _d, _e, _f, _g;
        _push2(`<div class="fixed inset-0 z-50 overflow-y-auto" data-v-1bff3dfb><div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" data-v-1bff3dfb></div><div class="flex min-h-full items-center justify-center p-4" data-v-1bff3dfb><div class="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden" data-v-1bff3dfb><div class="flex items-center justify-between p-6 border-b border-gray-200" data-v-1bff3dfb><h2 class="text-2xl font-bold text-gray-900" data-v-1bff3dfb>${ssrInterpolate(_ctx.restaurant.name)}</h2><button class="text-gray-400 hover:text-gray-600 transition-colors" data-v-1bff3dfb><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1bff3dfb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-1bff3dfb></path></svg></button></div><div class="overflow-y-auto max-h-[calc(90vh-120px)]" data-v-1bff3dfb><div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6" data-v-1bff3dfb><div data-v-1bff3dfb>`);
        if (_ctx.restaurant.photos && _ctx.restaurant.photos.length > 0) {
          _push2(`<div class="mb-6" data-v-1bff3dfb><div class="grid grid-cols-2 gap-2" data-v-1bff3dfb><!--[-->`);
          ssrRenderList(_ctx.restaurant.photos.slice(0, 4), (photo, index) => {
            _push2(`<img${ssrRenderAttr("src", photo.url)}${ssrRenderAttr("alt", `${_ctx.restaurant.name} photo ${index + 1}`)} class="w-full h-32 object-cover rounded-lg" loading="lazy" data-v-1bff3dfb>`);
          });
          _push2(`<!--]--></div></div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<div class="space-y-4 mb-6" data-v-1bff3dfb>`);
        if (_ctx.restaurant.rating) {
          _push2(`<div class="flex items-center" data-v-1bff3dfb><div class="rating-stars text-lg mr-3" data-v-1bff3dfb><!--[-->`);
          ssrRenderList(5, (star) => {
            _push2(`<span data-v-1bff3dfb>${ssrInterpolate(star <= Math.floor(_ctx.restaurant.rating) ? "\u2605" : star <= _ctx.restaurant.rating ? "\u2606" : "\u2606")}</span>`);
          });
          _push2(`<!--]--></div><span class="text-lg font-medium text-gray-900" data-v-1bff3dfb>${ssrInterpolate(_ctx.restaurant.rating.toFixed(1))}</span>`);
          if (_ctx.restaurant.user_ratings_total) {
            _push2(`<span class="text-gray-500 ml-2" data-v-1bff3dfb> (${ssrInterpolate(_ctx.restaurant.user_ratings_total)} reviews) </span>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<div class="flex items-start" data-v-1bff3dfb><svg class="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1bff3dfb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-v-1bff3dfb></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-v-1bff3dfb></path></svg><span class="text-gray-700" data-v-1bff3dfb>${ssrInterpolate(_ctx.restaurant.address)}</span></div>`);
        if ((_a = details.value) == null ? void 0 : _a.phone) {
          _push2(`<div class="flex items-center" data-v-1bff3dfb><svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1bff3dfb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" data-v-1bff3dfb></path></svg><a${ssrRenderAttr("href", `tel:${details.value.phone}`)} class="text-primary-600 hover:text-primary-800" data-v-1bff3dfb>${ssrInterpolate(details.value.phone)}</a></div>`);
        } else {
          _push2(`<!---->`);
        }
        if ((_b = details.value) == null ? void 0 : _b.website) {
          _push2(`<div class="flex items-center" data-v-1bff3dfb><svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1bff3dfb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-v-1bff3dfb></path></svg><a${ssrRenderAttr("href", details.value.website)} target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:text-primary-800" data-v-1bff3dfb> Visit Website </a></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (_ctx.restaurant.price_level) {
          _push2(`<div class="flex items-center" data-v-1bff3dfb><svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1bff3dfb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" data-v-1bff3dfb></path></svg><span class="text-gray-700" data-v-1bff3dfb> Price: ${ssrInterpolate(getPriceLevel(_ctx.restaurant.price_level))}</span></div>`);
        } else {
          _push2(`<!---->`);
        }
        if ((_e = (_d = (_c = details.value) == null ? void 0 : _c.opening_hours) == null ? void 0 : _d.weekday_text) == null ? void 0 : _e.length) {
          _push2(`<div class="border-t pt-4" data-v-1bff3dfb><h4 class="font-medium text-gray-900 mb-2" data-v-1bff3dfb>Opening Hours</h4><div class="space-y-1" data-v-1bff3dfb><!--[-->`);
          ssrRenderList(details.value.opening_hours.weekday_text, (hours) => {
            _push2(`<div class="text-sm text-gray-600" data-v-1bff3dfb>${ssrInterpolate(hours)}</div>`);
          });
          _push2(`<!--]--></div></div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div>`);
        if ((_g = (_f = details.value) == null ? void 0 : _f.reviews) == null ? void 0 : _g.length) {
          _push2(`<div class="border-t pt-4" data-v-1bff3dfb><h4 class="font-medium text-gray-900 mb-4" data-v-1bff3dfb>Recent Reviews</h4><div class="space-y-4" data-v-1bff3dfb><!--[-->`);
          ssrRenderList(details.value.reviews.slice(0, 3), (review) => {
            _push2(`<div class="bg-gray-50 rounded-lg p-4" data-v-1bff3dfb><div class="flex items-center justify-between mb-2" data-v-1bff3dfb><span class="font-medium text-gray-900" data-v-1bff3dfb>${ssrInterpolate(review.author_name)}</span><div class="flex items-center" data-v-1bff3dfb><div class="rating-stars text-sm mr-2" data-v-1bff3dfb><!--[-->`);
            ssrRenderList(5, (star) => {
              _push2(`<span data-v-1bff3dfb>${ssrInterpolate(star <= review.rating ? "\u2605" : "\u2606")}</span>`);
            });
            _push2(`<!--]--></div><span class="text-sm text-gray-500" data-v-1bff3dfb>${ssrInterpolate(review.relative_time_description)}</span></div></div><p class="text-sm text-gray-700" data-v-1bff3dfb>${ssrInterpolate(review.text)}</p></div>`);
          });
          _push2(`<!--]--></div></div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div><div data-v-1bff3dfb><div class="sticky top-0" data-v-1bff3dfb><h4 class="font-medium text-gray-900 mb-4" data-v-1bff3dfb>Location</h4><div class="map-container" data-v-1bff3dfb></div><div class="mt-4 space-y-2" data-v-1bff3dfb><button class="w-full btn-primary flex items-center justify-center" data-v-1bff3dfb><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1bff3dfb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-v-1bff3dfb></path></svg> Open in Google Maps </button><button class="w-full btn-secondary flex items-center justify-center" data-v-1bff3dfb><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1bff3dfb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" data-v-1bff3dfb></path></svg> Get Directions </button></div></div></div></div></div></div></div></div>`);
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RestaurantModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1bff3dfb"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Home"
    });
    const restaurantsStore = useRestaurantsStore();
    const searchKeyword = ref("");
    const filterType = ref("all");
    const selectedRestaurant = ref(null);
    const filteredRestaurants = computed(() => {
      switch (filterType.value) {
        case "rated":
          return restaurantsStore.ratedRestaurants;
        case "open":
          return restaurantsStore.openRestaurants;
        default:
          return restaurantsStore.restaurants;
      }
    });
    const selectRestaurant = (restaurant) => {
      selectedRestaurant.value = restaurant;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RestaurantCard = __nuxt_component_0;
      const _component_RestaurantModal = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"><div class="text-center"><h1 class="text-4xl md:text-6xl font-bold mb-6"> Find Amazing Restaurants </h1><p class="text-xl md:text-2xl mb-8 text-primary-100"> Discover the best dining experiences in your area </p><div class="max-w-2xl mx-auto"><form class="bg-white rounded-lg p-4 shadow-lg"><div class="flex flex-col md:flex-row gap-4"><div class="flex-1"><input${ssrRenderAttr("value", searchKeyword.value)} type="text" placeholder="Search for restaurants... (e.g., Bang Sue)" class="input-field text-gray-900" required></div><button type="submit"${ssrIncludeBooleanAttr(unref(restaurantsStore).loading) ? " disabled" : ""} class="btn-primary flex items-center justify-center min-w-[120px]">`);
      if (unref(restaurantsStore).loading) {
        _push(`<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(restaurantsStore).loading) {
        _push(`<span>Search</span>`);
      } else {
        _push(`<span>Searching...</span>`);
      }
      _push(`</button></div></form></div></div></div></section><section class="py-12"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">`);
      if (unref(restaurantsStore).hasResults || unref(restaurantsStore).loading) {
        _push(`<div class="mb-8"><div class="flex flex-col md:flex-row md:items-center md:justify-between"><h2 class="text-2xl font-bold text-gray-900 mb-4 md:mb-0">`);
        if (unref(restaurantsStore).loading) {
          _push(`<span>Searching restaurants...</span>`);
        } else {
          _push(`<span> Found ${ssrInterpolate(unref(restaurantsStore).searchMeta.count)} restaurants <span class="text-primary-600">for &quot;${ssrInterpolate(unref(restaurantsStore).currentKeyword)}&quot;</span></span>`);
        }
        _push(`</h2>`);
        if (!unref(restaurantsStore).loading) {
          _push(`<div class="flex gap-2 flex-wrap"><button class="${ssrRenderClass([
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            filterType.value === "all" ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          ])}"> All (${ssrInterpolate(unref(restaurantsStore).restaurants.length)}) </button><button class="${ssrRenderClass([
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            filterType.value === "rated" ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          ])}"> Rated (${ssrInterpolate(unref(restaurantsStore).ratedRestaurants.length)}) </button><button class="${ssrRenderClass([
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            filterType.value === "open" ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          ])}"> Open Now (${ssrInterpolate(unref(restaurantsStore).openRestaurants.length)}) </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(restaurantsStore).error) {
        _push(`<div class="mb-8"><div class="bg-red-50 border border-red-200 rounded-lg p-4"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg></div><div class="ml-3"><h3 class="text-sm font-medium text-red-800"> Search Error </h3><p class="mt-1 text-sm text-red-700">${ssrInterpolate(unref(restaurantsStore).error)}</p><button class="mt-2 text-sm text-red-600 hover:text-red-800 underline"> Dismiss </button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(restaurantsStore).loading) {
        _push(`<div class="text-center py-12"><div class="loading-spinner mx-auto mb-4"></div><p class="text-gray-500">Finding the best restaurants for you...</p></div>`);
      } else if (filteredRestaurants.value.length > 0) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
        ssrRenderList(filteredRestaurants.value, (restaurant) => {
          _push(ssrRenderComponent(_component_RestaurantCard, {
            key: restaurant.place_id,
            restaurant,
            onClick: ($event) => selectRestaurant(restaurant)
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (!unref(restaurantsStore).loading && searchKeyword.value) {
        _push(`<div class="text-center py-12"><div class="max-w-md mx-auto"><svg class="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg><h3 class="text-lg font-medium text-gray-900 mb-2">No restaurants found</h3><p class="text-gray-500 mb-4"> We couldn&#39;t find any restaurants matching your search. Try a different keyword or location. </p><button class="btn-primary"> Search in Bang Sue </button></div></div>`);
      } else if (!searchKeyword.value) {
        _push(`<div class="text-center py-12"><div class="max-w-md mx-auto"><div class="text-6xl mb-4">\u{1F37D}\uFE0F</div><h3 class="text-lg font-medium text-gray-900 mb-2">Welcome to Restaurant Finder</h3><p class="text-gray-500 mb-4"> Search for restaurants in your area to get started. </p><button class="btn-primary"> Explore Bang Sue Restaurants </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section>`);
      if (selectedRestaurant.value) {
        _push(ssrRenderComponent(_component_RestaurantModal, {
          restaurant: selectedRestaurant.value,
          onClose: ($event) => selectedRestaurant.value = null
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CV7ECIuD.mjs.map
