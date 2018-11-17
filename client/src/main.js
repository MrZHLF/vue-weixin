import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "./http";
Vue.config.productionTip = false

//全局配置
Vue.prototype.$axios = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
