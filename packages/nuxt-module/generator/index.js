import Vue from 'vue';
import Inkline from <%= options.treeShaking ? `'@inkline/inkline/src'` : `'@inkline/inkline'` %>;

<% if (options.treeShaking) { %>
<% if (options.inkline.components) { %>
import { <%= options.inkline.components.join(',\n    ') %> } from '@inkline/inkline/src/components';
<% } else { %>
import components from '@inkline/inkline/src/components';
<% } %>
<% } %>

<% if (options.treeShaking) { %>
Vue.use(Inkline, {
<% if (options.inkline.components) { %>
    components: <%= options.inkline.components.join(',\n    ') %>
<% } else {%>
    components
<% } %>
});
<% } else { %>
Vue.use(Inkline);
<% } %>
