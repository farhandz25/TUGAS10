import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// Impor CSS global
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'vue3-toastify/dist/index.css';
import './style.css'; 
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');