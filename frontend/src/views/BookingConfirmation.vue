<template>
    <div class="page container mx-auto px-6 py-20 text-center max-w-2xl">
        <i data-lucide="check-circle" class="w-24 h-24 text-green-500 mx-auto mb-4"></i>
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
        <p class="text-gray-600 mb-8">Thank you for booking your stay at {{ hotelName }}. An email confirmation has been sent to you.</p>
        <router-link to="/" class="bg-[#0164E5] text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">Back to Home</router-link>
    </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import * as lucide from 'lucide';

export default {
    name: 'BookingConfirmation',
    setup() {
        const route = useRoute();
        const hotelName = ref(decodeURIComponent(route.params.hotelName));

        onMounted(() => {
            nextTick(() => {
                lucide.createIcons();
            });
        });

        return { hotelName };
    }
}
</script>
