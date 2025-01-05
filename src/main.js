import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap'; // Import Bootstrap JS (optional)


const app = createApp(App);
app.use(createPinia());
app.mount('#app');