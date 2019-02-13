import Vue from 'vue'
import { library as fontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

fontAwesomeLibrary.add(faInfoCircle);
fontAwesomeLibrary.add(faGithub);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);
