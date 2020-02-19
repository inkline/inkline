import Vue from 'vue';
<% if (options.treeShaking) { %>
import { Inkline } from '@inkline/inkline/src';
<% if (options.inkline.components) { %>
import {
    <%= options.inkline.components.join(',\n    ') %>
} from '@inkline/inkline/src/components';
<% } else { %>
import components from '@inkline/inkline/src/components';
<% } %>

Vue.use(Inkline, {
<% if (options.inkline.components) { %>
    components: {
        <%= options.inkline.components.join(',\n        ') %>
    }
<% } else {%>
    components
<% } %>
});
<% } else { %>
import Inkline from '@inkline/inkline';

Vue.use(Inkline);
<% } %>
