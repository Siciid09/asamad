<template>
    <div class="page container mx-auto px-6 py-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-8">Explore Amazing Places</h1>
        <div v-if="places.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <PlaceCard v-for="place in places" :key="place._id" :place="place" />
        </div>
        <div v-else class="text-center text-gray-500 py-16">
            Loading places...
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import PlaceCard from '../components/PlaceCard.vue';

export default {
  name: 'Places',
  components: {
    PlaceCard
  },
  setup() {
    const places = ref([]);
    onMounted(async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/places');
        places.value = res.data;
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    });
    return { places };
  }
}
</script>
