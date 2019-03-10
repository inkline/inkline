import Vue from 'vue'
import { library as fontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core';
import { faBars, faInfoCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

fontAwesomeLibrary.add(faBars);
fontAwesomeLibrary.add(faInfoCircle);
fontAwesomeLibrary.add(faSearch);
fontAwesomeLibrary.add(faGithub);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);
