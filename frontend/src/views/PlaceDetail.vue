<template>
    <div class="page" v-if="place">
        <div class="relative w-full h-[50vh] min-h-[400px]">
            <img :src="mainImage" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-8 text-white"><h1 class="text-5xl font-extrabold">{{ place.name }}</h1></div>
        </div>
        <div class="bg-white flex justify-center p-2 shadow-md">
             <img v-for="(img, i) in place.images" :key="i" :src="img" class="w-24 h-16 object-cover cursor-pointer mx-1 border-2 border-transparent hover:border-blue-500" @click="changeImage(img)">
        </div>

        <div class="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div class="lg:col-span-2">
                <h2 class="text-3xl font-bold text-gray-800 mb-4">About {{ place.name }}</h2>
                <p class="text-gray-600 leading-relaxed">{{ place.longDescription }}</p>
            </div>
            <div>
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Stay Nearby</h3>
                <HotelCard v-if="nearbyHotel" :hotel="nearbyHotel" />
                <p v-else>No nearby hotels listed.</p>
            </div>
        </div>
    </div>
    <div v-else class="text-center py-20">Loading place details...</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import HotelCard from '../components/HotelCard.vue';

export default {
    name: 'PlaceDetail',
    components: { HotelCard },
    setup() {
        const place = ref(null);
        const nearbyHotel = ref(null);
        const mainImage = ref('');
        const route = useRoute();

        const fetchPlace = async () => {
            try {
                const placeRes = await axios.get(`http://localhost:5000/api/places/${route.params.id}`);
                place.value = placeRes.data;
                mainImage.value = placeRes.data.images[0];

                if (placeRes.data.nearbyHotelId) {
                    const hotelRes = await axios.get(`http://localhost:5000/api/hotels/${placeRes.data.nearbyHotelId}`);
                    nearbyHotel.value = hotelRes.data;
                }

            } catch (error) {
                console.error("Error fetching place details:", error);
            }
        };

        const changeImage = (src) => {
            mainImage.value = src;
        };

        onMounted(fetchPlace);

        return { place, nearbyHotel, mainImage, changeImage };
    }
}
</script>
