import Vue from 'vue';


<% if (!options.treeShaking) { %>
import Inkline from '@inkline/inkline';

Vue.use(Inkline, <%= JSON.stringify(options.inkline.components ? options.inkline : {}, undefined, 2) %>);
<% } else { %>
<% if (options.inkline.components) { %>
import {
    <%= ['$form'].concat(options.inkline.components).join(',\n    ') %>
} from '@inkline/inkline/src/index';
<% if (options.validation) { %>
import InklineValidation from '@inkline/inkline/dist/validation';
import InklineValidation from '@inkline/inkline/src/validation';
<% } %>

Vue.prototype.$form = $form;

<%= options.components.map((component) => `Vue.component('${component}', ${component})`).join('\n') %>
<% } else { %>
import Inkline from '@inkline/inkline/src/index';
<% if (options.validation) { %>
import InklineValidation from '@inkline/inkline/dist/validation';
import InklineValidation from '@inkline/inkline/src/validation';
<% } %>

Vue.use(Inkline, <%= JSON.stringify(options.inkline, undefined, 2) %>);
<% } %>
<% } %>

<% if (options.validation) { %>
Vue.use(InklineValidation);
<% } %>
