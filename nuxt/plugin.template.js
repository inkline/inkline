import Vue from 'vue';

<% if (!options.treeShaking) { %>
import Inkline from '@inkline/inkline';

Vue.use(Inkline, <%= JSON.stringify(options.components || {}, undefined, 2) %>);
<% } %>

<% if (options.treeShake) { %>
import {
<%= [].concat(
options.config ? 'InklineConfig' : null,
options.componentPlugins,
options.directivePlugins,
options.components,
options.directives
).filter(Boolean).join(',\n  ') %>
} from '@inkline/inkline';

<%   if (options.config) { %>
Vue.use(InjlineConfigPlugin, <%= JSON.stringify(options.config, undefined, 2) %>);
<%   } %>

<%= options.componentPlugins.reduce((acc, plugin) => (acc += `Vue.use(${plugin});\n` ), '') %>
<%= options.directivePlugins.reduce((acc, plugin) => (acc += `Vue.use(${plugin});\n` ), '') %>
<%= options.components.reduce((acc, c) => (acc += `Vue.component('${c}', ${c});\n` ), '') %>
<%= options.directives.reduce((acc, d) => (acc += `Vue.directive('${d.replace(/^VB/, 'B')}', ${d});\n` ), '') %>
<% } %>
