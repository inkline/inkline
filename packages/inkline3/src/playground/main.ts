import { createApp } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import { Inkline } from '../plugin';
import * as components from '../components';
import '@inkline/inkline/src/inkline.scss';
import '@inkline/inkline/src/playground/main.scss';

import App from '@inkline/inkline/src/playground/App.vue';
import Example from '@inkline/inkline/src/playground/components/Example.vue';
import DocsRoute from '@inkline/inkline/src/playground/components/DocsRoute.vue';
import ComponentsRoute from '@inkline/inkline/src/playground/components/ComponentsRoute.vue';

const routes: RouteRecordRaw[] = [
    { name: 'index', path: '/', component: DocsRoute, meta: { path: '' } },
    { name: 'docs-core-grid', path: '/docs/core/grid', component: ComponentsRoute, meta: { component: 'IContainer' } },
    { name: 'docs-core-layout', path: '/docs/core/layout', component: ComponentsRoute, meta: { component: 'ILayout' } },
    { name: 'docs-core-typography', path: '/docs/core/typography', component: DocsRoute, meta: { path: 'core/typography' } },
    { name: 'docs-core-images', path: '/docs/core/images', component: DocsRoute, meta: { path: 'core/images' } },
    { name: 'docs-core-tables', path: '/docs/core/tables', component: ComponentsRoute, meta: { component: 'ITable' } },
    { name: 'docs-core-code', path: '/docs/core/code', component: DocsRoute, meta: { path: 'core/code' } },
    { name: 'docs-forms-form', path: '/docs/forms/form', component: ComponentsRoute, meta: { component: 'IForm' } },
    { name: 'docs-forms-input', path: '/docs/forms/input', component: ComponentsRoute, meta: { component: 'IInput' } },
    { name: 'docs-components-alert', path: '/docs/components/alert', component: ComponentsRoute, meta: { component: 'IAlert' } },
    { name: 'docs-components-badge', path: '/docs/components/badge', component: ComponentsRoute, meta: { component: 'IBadge' } },
    { name: 'docs-components-breadcrumb', path: '/docs/components/breadcrumb', component: ComponentsRoute, meta: { component: 'IBreadcrumb' } },
    { name: 'docs-components-button', path: '/docs/components/button', component: ComponentsRoute, meta: { component: 'IButton' } },
    { name: 'docs-components-button-group', path: '/docs/components/button-group', component: ComponentsRoute, meta: { component: 'IButtonGroup' } },
    { name: 'docs-components-card', path: '/docs/components/card', component: ComponentsRoute, meta: { component: 'ICard' } },
    { name: 'docs-components-collapsible', path: '/docs/components/collapsible', component: ComponentsRoute, meta: { component: 'ICollapsible' } },
    { name: 'docs-components-hamburger-menu', path: '/docs/components/hamburger-menu', component: ComponentsRoute, meta: { component: 'IHamburgerMenu' } },
    { name: 'docs-components-header', path: '/docs/components/header', component: ComponentsRoute, meta: { component: 'IHeader' } },
    { name: 'docs-components-icon', path: '/docs/components/icon', component: ComponentsRoute, meta: { component: 'IIcon' } },
    { name: 'docs-components-list-group', path: '/docs/components/list-group', component: ComponentsRoute, meta: { component: 'IListGroup' } },
    { name: 'docs-components-loader', path: '/docs/components/loader', component: ComponentsRoute, meta: { component: 'ILoader' } },
    { name: 'docs-components-media', path: '/docs/components/media', component: ComponentsRoute, meta: { component: 'IMedia' } },
    { name: 'docs-components-modal', path: '/docs/components/modal', component: ComponentsRoute, meta: { component: 'IModal' } },
    { name: 'docs-components-nav', path: '/docs/components/nav', component: ComponentsRoute, meta: { component: 'INav' } },
    { name: 'docs-components-navbar', path: '/docs/components/navbar', component: ComponentsRoute, meta: { component: 'INavbar' } },
    { name: 'docs-utilities-border', path: '/docs/utilities/border', component: DocsRoute, meta: { path: 'utilities/border' } },
    { name: 'docs-utilities-clearfix', path: '/docs/utilities/clearfix', component: DocsRoute, meta: { path: 'utilities/clearfix' } },
    { name: 'docs-utilities-color', path: '/docs/utilities/color', component: DocsRoute, meta: { path: 'utilities/color' } },
    { name: 'docs-utilities-display', path: '/docs/utilities/display', component: DocsRoute, meta: { path: 'utilities/display' } },
    { name: 'docs-utilities-embed', path: '/docs/utilities/embed', component: DocsRoute, meta: { path: 'utilities/embed' } },
    { name: 'docs-utilities-flex', path: '/docs/utilities/flex', component: DocsRoute, meta: { path: 'utilities/flex' }  },
    { name: 'docs-utilities-float', path: '/docs/utilities/float', component: DocsRoute, meta: { path: 'utilities/float' }  },
    { name: 'docs-utilities-overflow', path: '/docs/utilities/overflow', component: DocsRoute, meta: { path: 'utilities/overflow' }  },
    { name: 'docs-utilities-overlay', path: '/docs/utilities/overlay', component: DocsRoute, meta: { path: 'utilities/overlay' }  },
    { name: 'docs-utilities-position', path: '/docs/utilities/position', component: DocsRoute, meta: { path: 'utilities/position' }  },
    { name: 'docs-utilities-sizing', path: '/docs/utilities/sizing', component: DocsRoute, meta: { path: 'utilities/sizing' }  },
    { name: 'docs-utilities-spacing', path: '/docs/utilities/spacing', component: DocsRoute, meta: { path: 'utilities/spacing' }  },
    { name: 'docs-utilities-text', path: '/docs/utilities/text', component: DocsRoute, meta: { path: 'utilities/text' }  },
    { name: 'docs-utilities-vertical-align', path: '/docs/utilities/vertical-align', component: DocsRoute, meta: { path: 'utilities/vertical-align' }  },
    { name: 'docs-utilities-visibility', path: '/docs/utilities/visibility', component: DocsRoute, meta: { path: 'utilities/visibility' }  },
];

const app = createApp(App);
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

app.use(Inkline, { components });
app.use(router);

[
    Example
].forEach((component) => app.component(component.name, component));

app.mount('#app');
