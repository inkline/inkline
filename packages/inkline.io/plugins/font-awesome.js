import Vue from 'vue'
import { library as fontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core';
import { faBars, faInfoCircle, faSearch, faTerminal, faEye } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter, faDiscord, faHtml5, faCss3, faJs } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

fontAwesomeLibrary.add(faBars);
fontAwesomeLibrary.add(faInfoCircle);
fontAwesomeLibrary.add(faSearch);
fontAwesomeLibrary.add(faGithub);
fontAwesomeLibrary.add(faTwitter);
fontAwesomeLibrary.add(faDiscord);
fontAwesomeLibrary.add(faEye);
fontAwesomeLibrary.add(faHtml5);
fontAwesomeLibrary.add(faCss3);
fontAwesomeLibrary.add(faJs);
fontAwesomeLibrary.add(faTerminal);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);
