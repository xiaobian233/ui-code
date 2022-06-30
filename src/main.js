import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/reset.scss'
import 'animate.css'
import "@/assets/font/iconfont.css"
import directives from '@/assets/uilt/directive'
import uiSDK from '@/components/index'
import hooks from "@/hook"
const app = createApp(App).use(store).use(router).use(directives).use(uiSDK).use(hooks).mount('#app')
window.vm = app
