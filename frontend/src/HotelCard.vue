<template>
  <router-link :to="'/hotel/' + hotel._id" class="group block">
      <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
          <div class="relative">
              <img :src="hotel.images[0]" :alt="hotel.name" class="h-56 w-full object-cover">
              <div class="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-amber-600 font-bold text-sm">
                  <i data-lucide="star" class="w-4 h-4 fill-current text-amber-500"></i>
                  <span>{{ hotel.rating.toFixed(1) }}</span>
              </div>
          </div>
          <div class="p-5 flex flex-col flex-grow">
              <h3 class="text-lg font-bold text-gray-800 group-hover:text-[#0164E5] transition-colors">{{ hotel.name }}</h3>
              <p class="text-gray-500 my-2 flex items-center gap-2 text-sm">
                  <i data-lucide="map-pin" class="w-4 h-4 text-[#0164E5]"></i>
                  {{ hotel.location }}
              </p>
              <div class="mt-auto pt-4 flex items-center justify-between">
                  <p class="text-xl font-bold text-[#0164E5]">${{ hotel.price }}<span class="text-sm font-normal text-gray-500">/night</span></p>
                  <span class="text-sm font-bold text-[#0164E5]">View Details</span>
              </div>
          </div>
      </div>
  </router-link>
</template>

<script>
export default {
    name: 'HotelCard',
    props: {
        hotel: {
            type: Object,
            required: true
        }
    }
}
</script>
