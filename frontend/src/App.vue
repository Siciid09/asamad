<!-- frontend/src/App.vue -->
<template>
  <div id="app-container" class="bg-slate-50 font-sans">
    <!-- Header -->
    <header id="header" class="bg-white/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50 shadow-sm transition-all duration-300" :class="{ 'py-2': isScrolled, 'py-4': !isScrolled }">
      <div class="container mx-auto px-6 flex justify-between items-center">
        <router-link to="/" class="text-2xl font-extrabold text-[#0164E5]">Dalxiis</router-link>
        
        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center space-x-8">
            <router-link to="/" class="nav-link">Home</router-link>
            <router-link to="/hotels" class="nav-link">Hotels</router-link>
            <router-link to="/places" class="nav-link">Places</router-link>
            <router-link to="/about" class="nav-link">About Us</router-link>
            <router-link to="/contact" class="nav-link">Contact</router-link>
        </nav>

        <!-- Auth Buttons -->
        <div class="flex items-center space-x-4">
            <!-- Show these buttons if the user is NOT logged in -->
            <template v-if="!isAuthenticated">
                <router-link to="/login" class="bg-[#0164E5] text-white font-bold py-2 px-5 rounded-lg text-sm hover:bg-blue-700 transition-colors">Login</router-link>
                 <router-link to="/register" class="hidden sm:block text-gray-600 font-medium hover:text-blue-600">Sign Up</router-link>
            </template>
            <!-- Show these buttons if the user IS logged in -->
            <template v-else>
                 <router-link v-if="isAdmin" to="/admin-dashboard" class="bg-red-600 text-white font-bold py-2 px-5 rounded-lg text-sm hover:bg-red-700 transition-colors">Admin</router-link>
                 <router-link v-else to="/user-dashboard" class="bg-[#0164E5] text-white font-bold py-2 px-5 rounded-lg text-sm hover:bg-blue-700 transition-colors">My Dashboard</router-link>
                 <button @click="handleLogout" class="hidden sm:block text-gray-600 hover:text-red-500 font-medium">Logout</button>
            </template>
            <button @click="toggleMobileMenu" class="md:hidden text-gray-700">
                <i data-lucide="menu"></i>
            </button>
        </div>
      </div>
      <!-- Mobile Menu -->
      <div :class="{'hidden': !isMobileMenuOpen}" class="md:hidden px-6 pb-4 space-y-3">
        <router-link to="/" class="block text-gray-600 hover:text-[#0164E5] font-medium" @click="closeMobileMenu">Home</router-link>
        <router-link to="/hotels" class="block text-gray-600 hover:text-[#0164E5] font-medium" @click="closeMobileMenu">Hotels</router-link>
        <router-link to="/places" class="block text-gray-600 hover:text-[#0164E5] font-medium" @click="closeMobileMenu">Places</router-link>
        <router-link to="/about" class="block text-gray-600 hover:text-[#0164E5] font-medium" @click="closeMobileMenu">About Us</router-link>
        <router-link to="/contact" class="block text-gray-600 hover:text-[#0164E5] font-medium" @click="closeMobileMenu">Contact</router-link>
        <div class="border-t border-gray-200 pt-3">
             <button v-if="isAuthenticated" @click="handleLogout" class="w-full text-left text-red-500 font-medium">Logout</button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="pt-20">
       <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white">
        <div class="container mx-auto px-6 py-12">
            <!-- Your existing footer code is fine -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-xl font-bold mb-4">Dalxiis</h3>
                    <p class="text-gray-400">Your guide to discovering Somalia.</p>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Quick Links</h4>
                    <ul class="space-y-2">
                        <li><router-link to="/hotels" class="text-gray-400 hover:text-white">Hotels</router-link></li>
                        <li><router-link to="/places" class="text-gray-400 hover:text-white">Places</router-link></li>
                        <li><router-link to="/about" class="text-gray-400 hover:text-white">About Us</router-link></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Support</h4>
                    <ul class="space-y-2">
                        <li><router-link to="/contact" class="text-gray-400 hover:text-white">Contact</router-link></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">FAQ</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Terms of Service</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Connect With Us</h4>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-400 hover:text-white"><i data-lucide="facebook"></i></a>
                        <a href="#" class="text-gray-400 hover:text-white"><i data-lucide="twitter"></i></a>
                        <a href="#" class="text-gray-400 hover:text-white"><i data-lucide="instagram"></i></a>
                    </div>
                </div>
            </div>
            <div class="mt-12 border-t border-gray-700 pt-8 text-center text-gray-500">
                &copy; {{ new Date().getFullYear() }} Dalxiis. All Rights Reserved.
            </div>
        </div>
    </footer>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, ref, watch, nextTick } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { createIcons, icons } from 'lucide';

export default {
  name: 'App',
  setup() {
    const isScrolled = ref(false);
    const isMobileMenuOpen = ref(false);
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    // Reactive getters for checking login status
    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    const isAdmin = computed(() => store.getters.isAdmin);

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50;
    };
    const toggleMobileMenu = () => isMobileMenuOpen.value = !isMobileMenuOpen.value;
    const closeMobileMenu = () => isMobileMenuOpen.value = false;

    // Logout function
    const handleLogout = () => {
        closeMobileMenu();
        store.dispatch('logout');
        router.push('/');
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      createIcons({ icons });
    });
    onUnmounted(() => window.removeEventListener('scroll', handleScroll));
    
    watch(route, () => {
        nextTick(() => {
            createIcons({ icons });
        });
    }, { immediate: true, deep: true });

    return {
      isScrolled,
      isMobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu,
      isAuthenticated,
      isAdmin,
      handleLogout
    };
  }
};
</script>

<style>
/* Style for active nav links */
.nav-link.router-link-exact-active {
  color: #0164E5;
  font-weight: 700;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

