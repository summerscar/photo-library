import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FullscreenBox from './components/Fullscreen/index.js'
Vue.config.productionTip = false
Vue.use(FullscreenBox)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
