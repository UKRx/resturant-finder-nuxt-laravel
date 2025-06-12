export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  // Load Google Maps API script dynamically
  if (process.client && config.public.googleMapsApiKey) {
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${config.public.googleMapsApiKey}&libraries=places&loading=async`
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }
}) 