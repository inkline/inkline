import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import { Inkline } from '@inkline/inkline/src/plugin';
import * as components from '@inkline/inkline/src/components';
import '@inkline/inkline/src/inkline.scss';
import '@inkline/inkline/src/playground/main.scss';

import App from '@inkline/inkline/src/playground/App.vue';
import Example from '@inkline/inkline/src/playground/components/Example.vue';

const routes = [
    { name: 'index', path: '/', component: () => import('@inkline/inkline/src/playground/pages/index.vue') },
    { name: 'core-grid', path: '/core/grid', component: () => import('@inkline/inkline/src/playground/pages/core/grid.vue') },
    { name: 'core-layout', path: '/core/layout', component: () => import('@inkline/inkline/src/playground/pages/core/layout.vue') },
    { name: 'core-typography', path: '/core/typography', component: () => import('@inkline/inkline/src/playground/pages/core/typography.vue') },
    { name: 'core-images', path: '/core/images', component: () => import('@inkline/inkline/src/playground/pages/core/images.vue') },
    { name: 'core-tables', path: '/core/tables', component: () => import('@inkline/inkline/src/playground/pages/core/tables.vue') },
    { name: 'core-code', path: '/core/code', component: () => import('@inkline/inkline/src/playground/pages/core/code.vue') },
    { name: 'components-alert', path: '/components/alert', component: () => import('@inkline/inkline/src/playground/pages/components/alert.vue') },
    { name: 'components-badge', path: '/components/badge', component: () => import('@inkline/inkline/src/playground/pages/components/badge.vue') },
    { name: 'components-breadcrumb', path: '/components/breadcrumb', component: () => import('@inkline/inkline/src/playground/pages/components/breadcrumb.vue') },
    { name: 'components-button', path: '/components/button', component: () => import('@inkline/inkline/src/playground/pages/components/button.vue') },
    { name: 'components-button-group', path: '/components/button-group', component: () => import('@inkline/inkline/src/playground/pages/components/button-group.vue') },
    { name: 'components-card', path: '/components/card', component: () => import('@inkline/inkline/src/playground/pages/components/card.vue') },
    { name: 'components-collapsible', path: '/components/collapsible', component: () => import('@inkline/inkline/src/playground/pages/components/collapsible.vue') },
    { name: 'components-hamburger-menu', path: '/components/hamburger-menu', component: () => import('@inkline/inkline/src/playground/pages/components/hamburger-menu.vue') },
    { name: 'components-header', path: '/components/header', component: () => import('@inkline/inkline/src/playground/pages/components/header.vue') },
    { name: 'components-icon', path: '/components/icon', component: () => import('@inkline/inkline/src/playground/pages/components/icon.vue') },
    { name: 'components-list-group', path: '/components/list-group', component: () => import('@inkline/inkline/src/playground/pages/components/list-group.vue') },
    { name: 'components-loader', path: '/components/loader', component: () => import('@inkline/inkline/src/playground/pages/components/loader.vue') },
    { name: 'utilities-border', path: '/utilities/border', component: () => import('@inkline/inkline/src/playground/pages/utilities/border.vue') },
    { name: 'utilities-clearfix', path: '/utilities/clearfix', component: () => import('@inkline/inkline/src/playground/pages/utilities/clearfix.vue') },
    { name: 'utilities-color', path: '/utilities/color', component: () => import('@inkline/inkline/src/playground/pages/utilities/color.vue') },
    { name: 'utilities-display', path: '/utilities/display', component: () => import('@inkline/inkline/src/playground/pages/utilities/display.vue') },
    { name: 'utilities-embed', path: '/utilities/embed', component: () => import('@inkline/inkline/src/playground/pages/utilities/embed.vue') },
    { name: 'utilities-flex', path: '/utilities/flex', component: () => import('@inkline/inkline/src/playground/pages/utilities/flex.vue') },
    { name: 'utilities-float', path: '/utilities/float', component: () => import('@inkline/inkline/src/playground/pages/utilities/float.vue') },
    { name: 'utilities-overflow', path: '/utilities/overflow', component: () => import('@inkline/inkline/src/playground/pages/utilities/overflow.vue') },
    { name: 'utilities-overlay', path: '/utilities/overlay', component: () => import('@inkline/inkline/src/playground/pages/utilities/overlay.vue') },
    { name: 'utilities-sizing', path: '/utilities/sizing', component: () => import('@inkline/inkline/src/playground/pages/utilities/sizing.vue') },
    { name: 'utilities-spacing', path: '/utilities/spacing', component: () => import('@inkline/inkline/src/playground/pages/utilities/spacing.vue') },
    { name: 'utilities-text', path: '/utilities/text', component: () => import('@inkline/inkline/src/playground/pages/utilities/text.vue') },
    { name: 'utilities-vertical-align', path: '/utilities/vertical-align', component: () => import('@inkline/inkline/src/playground/pages/utilities/vertical-align.vue') },
    { name: 'utilities-visibility', path: '/utilities/visibility', component: () => import('@inkline/inkline/src/playground/pages/utilities/visibility.vue') },
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
