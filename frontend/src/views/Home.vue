<template>
  <div class="page">
    <!-- Hero Section -->
    <section class="hero-bg h-screen min-h-[700px] flex items-center justify-center text-white text-center -mt-20">
        <div class="container mx-auto px-6">
            <h1 class="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight leading-tight">Safarkaaga Soomaaliya <br/> Halkan Ka Bilow</h1>
            <p class="text-lg md:text-xl max-w-3xl mx-auto text-slate-200 mb-10">Discover and book amazing hotels and stays across the beautiful landscapes of Somalia.</p>
            <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-4 max-w-4xl mx-auto -mb-32">
                <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 items-center gap-4 text-left">
                    <div class="lg:col-span-2 flex items-center gap-3 px-4 py-2"><i data-lucide="map-pin" class="text-gray-500"></i><div><label class="block text-xs text-gray-500">Destination</label><input type="text" placeholder="e.g., Mogadishu" class="w-full text-sm font-bold text-black bg-transparent focus:outline-none placeholder:text-gray-400"></div></div>
                    <div class="flex items-center gap-3 px-4 py-2 border-t md:border-t-0 md:border-l border-gray-200"><i data-lucide="calendar" class="text-gray-500"></i><div><label class="block text-xs text-gray-500">Dates</label><input type="text" placeholder="Select Dates" class="w-full text-sm font-bold text-black bg-transparent focus:outline-none placeholder:text-gray-400"></div></div>
                    <div class="flex items-center gap-3 px-4 py-2 border-t md:border-t-0 md:border-l border-gray-200"><i data-lucide="users" class="text-gray-500"></i><div><label class="block text-xs text-gray-500">Guests</label><input type="text" placeholder="2 Adults" class="w-full text-sm font-bold text-black bg-transparent focus:outline-none placeholder:text-gray-400"></div></div>
                    <div class="px-2"><button class="w-full bg-[#0164E5] text-white rounded-lg flex items-center justify-center h-12 w-12 mx-auto hover:bg-blue-700 transition-colors"><i data-lucide="search"></i></button></div>
                </div>
            </div>
        </div>
    </section>

    <!-- Find By Type Section -->
    <section class="pt-40 pb-20 bg-white">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold text-black text-center mb-2">Find By Type</h2>
            <p class="text-center text-gray-500 mb-12">Explore different types of stays tailored for you.</p>
            <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                <a v-for="type in propertyTypes" :key="type.name" href="#" class="group flex flex-col items-center justify-center text-center p-4 bg-slate-100 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div class="text-[#0164E5] mb-2 group-hover:scale-110 transition-transform"><i :data-lucide="type.icon"></i></div>
                    <h3 class="font-semibold text-sm text-gray-800">{{ type.name }}</h3>
                </a>
            </div>
        </div>
    </section>
    
    <!-- Featured Hotels Section -->
    <section class="py-20 bg-slate-50">
        <div class="container mx-auto px-6">
            <div class="flex justify-between items-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-800">Featured Hotels</h2>
                <router-link to="/hotels" class="text-[#0164E5] font-semibold hover:underline">View All</router-link>
            </div>
            <div v-if="featuredHotels.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <HotelCard v-for="hotel in featuredHotels" :key="hotel._id" :hotel="hotel" />
            </div>
             <div v-else class="text-center text-gray-500">Loading featured hotels...</div>
        </div>
    </section>

    <!-- Explore Places Section -->
    <section class="py-20 bg-white">
        <div class="container mx-auto px-6">
            <div class="flex justify-between items-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-800">Explore Somalia</h2>
                <router-link to="/places" class="text-[#0164E5] font-semibold hover:underline">View All</router-link>
            </div>
            <div v-if="places.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <PlaceCard v-for="place in places" :key="place._id" :place="place" />
            </div>
            <div v-else class="text-center text-gray-500">Loading places...</div>
        </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted, computed, nextTick } from 'vue';
import axios from 'axios';
import HotelCard from '../components/HotelCard.vue';
// Corrected typo in the line below
import PlaceCard from '../components/PlaceCard.vue';
// Corrected the lucide import below
import * as lucide from 'lucide';


export default {
  name: 'Home',
  components: {
    HotelCard,
    PlaceCard
  },
  setup() {
    const hotels = ref([]);
    const places = ref([]);
    
    const propertyTypes = ref([
        { name: 'Hotel', icon: 'hotel' }, { name: 'Villa', icon: 'home' }, { name: 'Apartment', icon: 'building-2' }, 
        { name: 'House', icon: 'house' }, { name: 'Resort', icon: 'tent' }, { name: 'Guesthouse', icon: 'warehouse' },
    ]);

    const featuredHotels = computed(() => hotels.value.filter(h => h.featured).slice(0, 3));

    onMounted(async () => {
      try {
        const hotelsRes = await axios.get('http://localhost:5000/api/hotels');
        hotels.value = hotelsRes.data;

        const placesRes = await axios.get('http://localhost:5000/api/places');
        places.value = placesRes.data.slice(0, 3);
        
        // Re-render icons after data is loaded
        nextTick(() => {
            lucide.createIcons();
        });

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });

    return {
      featuredHotels,
      places,
      propertyTypes
    };
  }
}
</script>

<style scoped>
.hero-bg {
    background-image: linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1610413264912-81aa853c48a2?q=80&w=2070&auto-format&fit=crop');
}
</style>

