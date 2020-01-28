import Vue from 'vue';

<% if (options.inkline.components) { %>
import {
    Inkline,
    <%= options.inkline.components.join(',\n    ') %>
} from <%= options.treeShaking ? `'@inkline/inkline/src/index.js'` : `'@inkline/inkline/dist/inkline.js'` %>;

Vue.use(Inkline, {
    components: [
        <%= options.inkline.components.join(',\n        ') %>
    ]
});
<% } else { %>
import Inkline from <%= options.treeShaking ? `'@inkline/inkline/src/main.js'` : `'@inkline/inkline/dist/inkline.js'` %>;

Vue.use(Inkline, <%= JSON.stringify(options.inkline ? options.inkline : {}, undefined, 4) %>);
<% } %>
