import Vue from 'vue';
import { library as fontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core';
import { faBars, faHeart, faCog, faLayerGroup, faExchangeAlt, faInfoCircle, faSearch, faTerminal, faEye, faAdjust, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter, faDiscord, faHtml5, faCss3, faJs, faSass } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

fontAwesomeLibrary.add(faBars);
fontAwesomeLibrary.add(faHeart);
fontAwesomeLibrary.add(faCog);
fontAwesomeLibrary.add(faExchangeAlt);
fontAwesomeLibrary.add(faLayerGroup);
fontAwesomeLibrary.add(faInfoCircle);
fontAwesomeLibrary.add(faSearch);
fontAwesomeLibrary.add(faGithub);
fontAwesomeLibrary.add(faTwitter);
fontAwesomeLibrary.add(faDiscord);
fontAwesomeLibrary.add(faSass);
fontAwesomeLibrary.add(faEye);
fontAwesomeLibrary.add(faHtml5);
fontAwesomeLibrary.add(faCss3);
fontAwesomeLibrary.add(faJs);
fontAwesomeLibrary.add(faTerminal);
fontAwesomeLibrary.add(faAdjust);
fontAwesomeLibrary.add(faGlobe);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);
