<template>
  <div class="page" v-if="hotel">
    <!-- Image Gallery Header -->
    <div class="relative w-full h-[50vh] min-h-[400px]">
        <img :src="mainImage" class="w-full h-full object-cover transition-all duration-300">
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div class="absolute bottom-0 left-0 p-8 text-white">
            <h1 class="text-5xl font-extrabold">{{ hotel.name }}</h1>
            <p class="text-lg flex items-center gap-2 mt-2"><i data-lucide="map-pin"></i>{{ hotel.location }}</p>
        </div>
    </div>
    <div class="bg-white flex justify-center p-2 shadow-md">
        <img v-for="(img, i) in hotel.images" :key="i" :src="img" class="w-24 h-16 object-cover cursor-pointer mx-1 border-2 border-transparent hover:border-blue-500" @click="changeImage(img)">
    </div>

    <!-- Details & Booking -->
    <div class="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div class="lg:col-span-2">
            <h2 class="text-3xl font-bold text-gray-800 mb-4">About the Hotel</h2>
            <p class="text-gray-600 leading-relaxed mb-8">{{ hotel.description }}</p>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Amenities</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div v-for="a in hotel.amenities" :key="a" class="flex items-center gap-2 text-gray-700"><i data-lucide="check" class="text-green-500"></i><span class="capitalize">{{ a }}</span></div>
            </div>
        </div>
        <div class="bg-slate-50 p-8 rounded-2xl shadow-lg self-start sticky top-28">
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Book Your Stay</h3>
            <form @submit.prevent="handleBooking">
                <div class="space-y-4">
                    <div><label class="font-medium">Check-in</label><input type="date" class="w-full mt-1 p-2 border rounded-lg"></div>
                    <div><label class="font-medium">Check-out</label><input type="date" class="w-full mt-1 p-2 border rounded-lg"></div>
                    <div><label class="font-medium">Room Type</label>
                        <select class="w-full mt-1 p-2 border rounded-lg">
                            <option v-for="r in hotel.rooms" :key="r.type">${{ r.price }} - {{ r.type }}</option>
                        </select>
                    </div>
                    <p class="text-3xl font-bold text-[#0164E5] text-center">${{ hotel.price }}<span class="text-base font-normal text-gray-500">/night</span></p>
                    <button type="submit" class="w-full bg-[#0164E5] text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">Book Now</button>
                </div>
            </form>
        </div>
    </div>
  </div>
  <div v-else class="text-center py-20">Loading hotel details...</div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import * as lucide from 'lucide';

export default {
    name: 'HotelDetail',
    setup() {
        const hotel = ref(null);
        const mainImage = ref('');
        const route = useRoute();
        const router = useRouter();

        const fetchHotel = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/hotels/${route.params.id}`);
                hotel.value = res.data;
                mainImage.value = res.data.images[0];
                 nextTick(() => {
                    lucide.createIcons();
                });
            } catch (error) {
                console.error("Error fetching hotel details:", error);
            }
        };

        const changeImage = (src) => {
            mainImage.value = src;
        };
        
        const handleBooking = () => {
            router.push(`/booking-confirmed/${encodeURIComponent(hotel.value.name)}`);
        };

        onMounted(fetchHotel);

        return { hotel, mainImage, changeImage, handleBooking };
    }
}
</script>
