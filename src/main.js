import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
//alternativa se da router.js usate "export default router":
//import router from './router'

createApp(App).use(router).mount('#app')
