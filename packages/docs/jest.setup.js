import Vue from 'vue';
import { Inkline } from '@inkline/inkline/src/plugin';
import * as components from '@inkline/inkline/src/components';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.use(Inkline, { components });
Vue.component('FontAwesomeIcon', FontAwesomeIcon);
