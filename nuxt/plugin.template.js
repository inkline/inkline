import Vue from 'vue';

<% if (options.validation) { %>
import InklineValidation from <%= options.treeShaking ? `'@inkline/inkline/src/validation'` : `'@inkline/inkline/dist/validation'` %>;
<% } %>
<% if (options.inkline.components) { %>
import {
    <%= options.inkline.components.join(',\n    ') %>
} from <%= options.treeShaking ? `'@inkline/inkline/src/index'` : `'@inkline/inkline'` %>;

<%= options.inkline.components.map((component) => `Vue.component('${component}', ${component})`).join('\n') %>
<% } else { %>
import Inkline from <%= options.treeShaking ? `'@inkline/inkline/src/index'` : `'@inkline/inkline'` %>;

Vue.use(Inkline, <%= JSON.stringify(options.inkline ? options.inkline : {}, undefined, 4) %>);
<% } %>
<% if (options.validation) { %>
Vue.use(InklineValidation);
<% } %>
