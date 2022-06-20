import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/reset.scss'
import 'animate.css'
import directives from '@/assets/uilt/directive'
const app = createApp(App).use(store).use(router).use(directives).mount('#app')
window.vm = app
