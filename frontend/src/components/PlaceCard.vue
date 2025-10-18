<template>
    <router-link :to="'/place/' + place._id" class="group block">
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <img :src="place.images[0]" :alt="place.name" class="h-56 w-full object-cover">
            <div class="p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#0164E5] transition-colors">{{ place.name }}</h3>
                <p class="text-gray-600 text-sm mb-4">{{ place.description }}</p>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'PlaceCard',
    props: {
        place: {
            type: Object,
            required: true
        }
    }
}
</script>
