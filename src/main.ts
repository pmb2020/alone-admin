import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

import 'normalize.css/normalize.css'
import '@/styles/element/index.css'
import '@/styles/al-admin.css'

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.mount('#app')
