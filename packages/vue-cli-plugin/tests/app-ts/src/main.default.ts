import Vue from 'vue'
import App from './App.vue'
import '@inkline/inkline/dist/inkline.css'
import Inkline from '@inkline/inkline'

Vue.use(Inkline);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
