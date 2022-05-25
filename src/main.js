import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/styles/element/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'normalize.css/normalize.css'

const app = createApp(App)

// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }

app.use(router)

app.mount('#app')
