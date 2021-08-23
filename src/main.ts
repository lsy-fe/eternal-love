import Vue from 'vue'
import App from './App.vue'
import router from './router'
import CompositionAPI from '@vue/composition-api'
Vue.config.productionTip = false
Vue.use(CompositionAPI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
