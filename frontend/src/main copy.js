import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css'; // Main CSS file for Tailwind

const app = createApp(App);

app.use(router);
app.mount('#app');
