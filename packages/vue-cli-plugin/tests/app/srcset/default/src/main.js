import Vue from 'vue';
import App from '../../App.vue';
import Inkline from '@inkline/inkline';
import '@inkline/inkline/dist/inkline.css';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
