import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/base.css' //引入公共css

import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'

Vue.component("Aside", Aside);
Vue.component("Footer", Footer);
Vue.component("Header", Header);

Vue.use(ElementUI)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
