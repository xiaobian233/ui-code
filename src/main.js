import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/reset.scss'
import 'animate.css'
import "@/assets/font/iconfont.css"
import uiSDK from '@/components/index'
const app = createApp(App).use(store).use(router).use(uiSDK).mount('#app')
window.vm = app
