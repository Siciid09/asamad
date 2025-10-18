<!-- frontend/src/views/AdminDashboard.vue -->
<template>
    <div class="page container mx-auto px-6 py-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard - All Bookings</h1>
        <div class="bg-white rounded-2xl shadow-lg overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="booking in bookings" :key="booking._id">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">{{ booking.user.name }}</div>
                            <div class="text-sm text-gray-500">{{ booking.user.email }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ booking.hotel.name }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ new Date(booking.checkIn).toLocaleDateString() }} - {{ new Date(booking.checkOut).toLocaleDateString() }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                             <span class="px-3 py-1 rounded-full text-xs font-semibold"
                                :class="{
                                    'bg-yellow-100 text-yellow-800': booking.status === 'pending',
                                    'bg-green-100 text-green-800': booking.status === 'confirmed',
                                    'bg-red-100 text-red-800': booking.status === 'rejected'
                                }">
                                {{ booking.status }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button @click="updateStatus(booking._id, 'confirmed')" class="text-green-600 hover:text-green-900" :disabled="booking.status === 'confirmed'">Confirm</button>
                            <button @click="updateStatus(booking._id, 'rejected')" class="text-red-600 hover:text-red-900" :disabled="booking.status === 'rejected'">Reject</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '../api';

export default {
    name: 'AdminDashboard',
    setup() {
        const bookings = ref([]);

        const fetchBookings = async () => {
             try {
                const response = await api.get('/bookings');
                bookings.value = response.data;
            } catch (error) {
                console.error("Failed to fetch bookings:", error);
            }
        };

        const updateStatus = async (id, status) => {
            try {
                await api.put(`/bookings/${id}`, { status });
                fetchBookings(); // Refresh the list
            } catch (error) {
                console.error("Failed to update status:", error);
            }
        };

        onMounted(fetchBookings);

        return { bookings, updateStatus };
    }
}
</script>
