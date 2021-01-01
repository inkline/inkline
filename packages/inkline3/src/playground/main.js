import '@/inkline.scss';
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import Inkline from '@/inkline';

import App from '@/playground/App.vue';
import Example from '@/playground/components/Example.vue';

const routes = [
    { name: 'index', path: '/', component: () => import('@/playground/pages/index.vue') },
    { name: 'core-typography', path: '/core/typography', component: () => import('@/playground/pages/core/typography.vue') },
    { name: 'components-alert', path: '/components/alert', component: () => import('@/playground/pages/components/alert.vue') },
    { name: 'utilities-border', path: '/utilities/border', component: () => import('@/playground/pages/utilities/border.vue') },
    { name: 'utilities-clearfix', path: '/utilities/clearfix', component: () => import('@/playground/pages/utilities/clearfix.vue') },
    { name: 'utilities-color', path: '/utilities/color', component: () => import('@/playground/pages/utilities/color.vue') },
    { name: 'utilities-vertical-align', path: '/utilities/vertical-align', component: () => import('@/playground/pages/utilities/vertical-align.vue') },
];

const app = createApp(App);
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

app.use(Inkline);
app.use(router);

[
    Example
].forEach((component) => app.component(component.name, component));

app.mount('#app');
