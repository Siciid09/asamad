<!-- frontend/src/views/UserDashboard.vue -->
<template>
    <div class="page container mx-auto px-6 py-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-8">My Bookings</h1>
        <div v-if="bookings.length > 0" class="space-y-8">
            <div v-for="booking in bookings" :key="booking._id" class="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
                <img :src="booking.hotel.images[0]" class="w-full md:w-1/3 h-56 object-cover" :alt="booking.hotel.name">
                <div class="p-6 flex flex-col justify-between">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-800">{{ booking.hotel.name }}</h2>
                        <p class="text-gray-500 my-2 flex items-center gap-2"><i data-lucide="map-pin" class="w-4 h-4"></i>{{ booking.hotel.location }}</p>
                        <p class="text-gray-700 font-medium">Room: {{ booking.roomType }}</p>
                        <p class="text-gray-600">Check-in: {{ new Date(booking.checkIn).toLocaleDateString() }}</p>
                        <p class="text-gray-600">Check-out: {{ new Date(booking.checkOut).toLocaleDateString() }}</p>
                    </div>
                    <div class="mt-4">
                        <span class="px-3 py-1 rounded-full text-sm font-semibold"
                            :class="{
                                'bg-yellow-100 text-yellow-800': booking.status === 'pending',
                                'bg-green-100 text-green-800': booking.status === 'confirmed',
                                'bg-red-100 text-red-800': booking.status === 'rejected'
                            }">
                            Status: {{ booking.status }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="text-center py-20">
            <p class="text-gray-500 text-lg">You have no bookings yet.</p>
            <router-link to="/hotels" class="mt-4 inline-block bg-[#0164E5] text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                Explore Hotels
            </router-link>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import api from '../api';
import { createIcons, icons } from 'lucide';

export default {
    name: 'UserDashboard',
    setup() {
        const bookings = ref([]);

        onMounted(async () => {
            try {
                const response = await api.get('/bookings/my-bookings');
                bookings.value = response.data;
                 nextTick(() => {
                    createIcons({ icons });
                });
            } catch (error) {
                console.error("Failed to fetch bookings:", error);
            }
        });

        return { bookings };
    }
}
</script>
