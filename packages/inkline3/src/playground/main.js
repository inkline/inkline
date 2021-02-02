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
    { name: 'components-loader', path: '/components/loader', component: () => import('@inkline/inkline/src/playground/pages/components/loader.vue') },
    { name: 'utilities-border', path: '/utilities/border', component: () => import('@inkline/inkline/src/playground/pages/utilities/border.vue') },
    { name: 'utilities-clearfix', path: '/utilities/clearfix', component: () => import('@inkline/inkline/src/playground/pages/utilities/clearfix.vue') },
    { name: 'utilities-color', path: '/utilities/color', component: () => import('@inkline/inkline/src/playground/pages/utilities/color.vue') },
    { name: 'utilities-vertical-align', path: '/utilities/vertical-align', component: () => import('@inkline/inkline/src/playground/pages/utilities/vertical-align.vue') },
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
