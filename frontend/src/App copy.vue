<template>
  <div id="app-container" class="bg-slate-50">
    <!-- Header & Navigation -->
    <header id="header" class="bg-white/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50 shadow-sm transition-all duration-300"
      :class="{ 'py-2': isScrolled, 'py-4': !isScrolled }">
      <div class="container mx-auto px-6 flex justify-between items-center">
        <router-link to="/" class="text-2xl font-extrabold text-[#0164E5]">Dalxiis</router-link>
        <nav id="main-nav" class="hidden md:flex items-center space-x-8">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/hotels" class="nav-link">Hotels</router-link>
          <router-link to="/places" class="nav-link">Places</router-link>
          <router-link to="/about" class="nav-link">About Us</router-link>
          <router-link to="/contact" class="nav-link">Contact</router-link>
        </nav>
        <div class="flex items-center space-x-4">
          <a href="#" class="bg-[#0164E5] text-white font-bold py-2 px-5 rounded-lg text-sm hover:bg-blue-700 transition-colors">Dashboard</a>
          <button @click="toggleMobileMenu" class="md:hidden text-gray-700">
            <i data-lucide="menu"></i>
          </button>
        </div>
      </div>
      <!-- Mobile Menu -->
      <div id="mobile-menu" :class="{'hidden': !isMobileMenuOpen}" class="md:hidden px-6 pb-4 space-y-3">
        <router-link to="/" class="block text-gray-600 hover:text-[#0164E5] font-medium transition-colors" @click="closeMobileMenu">Home</router-link>
        <router-link to="/hotels" class="block text-gray-600 hover:text-[#0164E5] font-medium transition-colors" @click="closeMobileMenu">Hotels</router-link>
        <router-link to="/places" class="block text-gray-600 hover:text-[#0164E5] font-medium transition-colors" @click="closeMobileMenu">Places</router-link>
        <router-link to="/about" class="block text-gray-600 hover:text-[#0164E5] font-medium transition-colors" @click="closeMobileMenu">About Us</router-link>
        <router-link to="/contact" class="block text-gray-600 hover:text-[#0164E5] font-medium transition-colors" @click="closeMobileMenu">Contact</router-link>
      </div>
    </header>

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
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import lucide from 'lucide-vue-next';

export default {
  name: 'App',
  setup() {
    const isScrolled = ref(false);
    const isMobileMenuOpen = ref(false);
    const route = useRoute();

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50;
    };

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    const closeMobileMenu = () => {
        isMobileMenuOpen.value = false;
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      lucide.createIcons();
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });
    
    // Watch for route changes to re-render icons
    watch(route, () => {
        nextTick(() => {
            lucide.createIcons();
        });
    });

    return {
      isScrolled,
      isMobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu
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

/* Page transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
