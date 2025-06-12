import { _ as __nuxt_component_0 } from "./nuxt-link-CFmwd33e.js";
import { defineComponent, ref, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderSlot } from "vue/server-renderer";
import { u as useHead } from "./v3-CHB0jlcv.js";
import "/Users/ukrit.p/Desktop/TEST/resturant-finder-nuxt-laravel/node_modules/ufo/dist/index.mjs";
import "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "/Users/ukrit.p/Desktop/TEST/resturant-finder-nuxt-laravel/node_modules/hookable/dist/index.mjs";
import "/Users/ukrit.p/Desktop/TEST/resturant-finder-nuxt-laravel/node_modules/unctx/dist/index.mjs";
import "/Users/ukrit.p/Desktop/TEST/resturant-finder-nuxt-laravel/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/ukrit.p/Desktop/TEST/resturant-finder-nuxt-laravel/node_modules/radix3/dist/index.mjs";
import "/Users/ukrit.p/Desktop/TEST/resturant-finder-nuxt-laravel/node_modules/defu/dist/defu.mjs";
import "/Users/ukrit.p/Desktop/TEST/resturant-finder-nuxt-laravel/node_modules/klona/dist/index.mjs";
import "/Users/ukrit.p/Desktop/TEST/resturant-finder-nuxt-laravel/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const mobileMenuOpen = ref(false);
    useHead({
      titleTemplate: "%s - Restaurant Finder",
      meta: [
        { name: "description", content: "Find the best restaurants near you with our comprehensive restaurant finder app." },
        { name: "viewport", content: "width=device-width, initial-scale=1" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><header class="bg-white shadow-sm border-b border-gray-200"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16"><div class="flex-shrink-0">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-xl font-bold text-primary-600"${_scopeId}> 🍽️ Restaurant Finder </h1>`);
          } else {
            return [
              createVNode("h1", { class: "text-xl font-bold text-primary-600" }, " 🍽️ Restaurant Finder ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><nav class="hidden md:flex space-x-8">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Home `);
          } else {
            return [
              createTextVNode(" Home ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/search",
        class: "text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Search `);
          } else {
            return [
              createTextVNode(" Search ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><div class="md:hidden"><button class="text-gray-500 hover:text-gray-900 p-2"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button></div></div><div style="${ssrRenderStyle(mobileMenuOpen.value ? null : { display: "none" })}" class="md:hidden"><div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium",
        onClick: ($event) => mobileMenuOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Home `);
          } else {
            return [
              createTextVNode(" Home ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/search",
        class: "text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium",
        onClick: ($event) => mobileMenuOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Search `);
          } else {
            return [
              createTextVNode(" Search ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></header><main class="flex-1">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="bg-white border-t border-gray-200 mt-auto"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="text-center"><p class="text-gray-500 text-sm"> © 2024 Restaurant Finder. Made with ❤️ using Nuxt.js &amp; Laravel </p><p class="text-gray-400 text-xs mt-2"> Powered by Google Maps API </p></div></div></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=default-npOCiuUw.js.map
