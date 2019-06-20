import Vue from 'vue';

<% if (!options.treeShaking) { %>
import Inkline from '@inkline/inkline';

Vue.use(Inkline, <%= JSON.stringify(options.inkline.components ? options.inkline : {}, undefined, 2) %>);
<% } %>

<% if (options.treeShaking) { %>
<% if (options.inkline.components) { %>
import {
    <%= ['$form'].concat(options.inkline.components).join(',\n  ') %>
} from '@inkline/inkline/src/index';

Vue.directive('$form', $form);

<%= options.components.map((component) => `Vue.component('${component}', ${component})`).join('\n') %>
<% } %>
<% if (!options.inkline.components) { %>
import Inkline from '@inkline/inkline/src/index';

Vue.use(Inkline, <%= JSON.stringify(options.inkline, undefined, 2) %>);
<% } %>
<% } %>
