// frontend/src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store.js'; // Import the store
import './assets/main.css';

createApp(App)
    .use(router)
    .use(store) // Use the store
    .mount('#app');

