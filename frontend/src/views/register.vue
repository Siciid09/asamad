<!-- frontend/src/views/Register.vue -->
<template>
  <div class="page bg-slate-50 py-20">
    <div class="container mx-auto px-6 max-w-md">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-800 mb-2">Create an Account</h2>
        <p class="text-gray-500">Join Dalxiis and start your adventure.</p>
      </div>
      <div class="bg-white p-8 rounded-2xl shadow-lg">
        <form @submit.prevent="handleRegister" class="space-y-6">
           <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span class="block sm:inline">{{ error }}</span>
          </div>
          <div>
            <label for="name" class="font-medium text-gray-700">Full Name</label>
            <input v-model="name" type="text" id="name" class="w-full mt-2 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" required>
          </div>
          <div>
            <label for="email" class="font-medium text-gray-700">Email Address</label>
            <input v-model="email" type="email" id="email" class="w-full mt-2 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" required>
          </div>
          <div>
            <label for="password" class="font-medium text-gray-700">Password</label>
            <input v-model="password" type="password" id="password" class="w-full mt-2 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" required>
          </div>
          <button type="submit" class="w-full bg-[#0164E5] text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">Create Account</button>
           <p class="text-center text-gray-600">
            Already have an account? <router-link to="/login" class="text-blue-600 hover:underline">Log in</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'Register',
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const error = ref(null);
    const store = useStore();
    const router = useRouter();

    const handleRegister = async () => {
      try {
        error.value = null;
        await store.dispatch('register', { name: name.value, email: email.value, password: password.value });
        router.push('/user-dashboard');
      } catch (err) {
        error.value = 'Failed to register. An account with this email may already exist.';
        console.error(err);
      }
    };

    return { name, email, password, handleRegister, error };
  }
};
</script>
