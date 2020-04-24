import Vue from 'vue'
import App from './App.vue'
import '@inkline/inkline/src/inkline.scss'
import { Inkline } from '@inkline/inkline/src'
import * as components from '@inkline/inkline/src/components'

Vue.use(Inkline, { components });

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
