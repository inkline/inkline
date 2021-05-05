import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import { Inkline } from '../plugin';
import * as components from '../components';
import '@inkline/inkline/src/inkline.scss';
import '@inkline/inkline/src/playground/main.scss';

import App from '@inkline/inkline/src/playground/App.vue';
import Example from '@inkline/inkline/src/playground/components/Example.vue';

const routes = [
    { name: 'index', path: '/', component: {}, meta: { path: '' } },
    { name: 'docs-core-grid', path: '/docs/core/grid', component: () => import('../components/IContainer/docs/en.md') },
    { name: 'docs-core-layout', path: '/docs/core/layout', component: () => import('../components/ILayout/docs/en.md') },
    { name: 'docs-core-typography', path: '/docs/core/typography', component: () => import('../docs/core/typography/en.md') },
    { name: 'docs-core-images', path: '/docs/core/images', component: () => import('../docs/core/images/en.md') },
    { name: 'docs-core-tables', path: '/docs/core/tables', component: () => import('../components/ITable/docs/en.md') },
    { name: 'docs-core-code', path: '/docs/core/code', component: () => import('../docs/core/code/en.md') },
    { name: 'docs-forms-form', path: '/docs/forms/form', component: () => import('../components/IForm/docs/en.md') },
    { name: 'docs-forms-input', path: '/docs/forms/input', component: () => import('../components/IInput/docs/en.md') },
    { name: 'docs-forms-number-input', path: '/docs/forms/number-input', component: () => import('../components/INumberInput/docs/en.md') },
    { name: 'docs-forms-textarea', path: '/docs/forms/textarea', component: () => import('../components/ITextarea/docs/en.md') },
    { name: 'docs-components-alert', path: '/docs/components/alert', component: () => import('../components/IAlert/docs/en.md') },
    { name: 'docs-components-badge', path: '/docs/components/badge', component: () => import('../components/IBadge/docs/en.md') },
    { name: 'docs-components-breadcrumb', path: '/docs/components/breadcrumb', component: () => import('../components/IBreadcrumb/docs/en.md') },
    { name: 'docs-components-button', path: '/docs/components/button', component: () => import('../components/IButton/docs/en.md') },
    { name: 'docs-components-button-group', path: '/docs/components/button-group', component: () => import('../components/IButtonGroup/docs/en.md') },
    { name: 'docs-components-card', path: '/docs/components/card', component: () => import('../components/ICard/docs/en.md') },
    { name: 'docs-components-collapsible', path: '/docs/components/collapsible', component: () => import('../components/ICollapsible/docs/en.md') },
    { name: 'docs-components-datatable', path: '/docs/components/datatable', component: () => import('../components/IDatatable/docs/en.md') },
    { name: 'docs-components-dropdown', path: '/docs/components/dropdown', component: () => import('../components/IDropdown/docs/en.md') },
    { name: 'docs-components-hamburger-menu', path: '/docs/components/hamburger-menu', component: () => import('../components/IHamburgerMenu/docs/en.md') },
    { name: 'docs-components-header', path: '/docs/components/header', component: () => import('../components/IHeader/docs/en.md') },
    { name: 'docs-components-icon', path: '/docs/components/icon', component: () => import('../components/IIcon/docs/en.md') },
    { name: 'docs-components-list-group', path: '/docs/components/list-group', component: () => import('../components/IListGroup/docs/en.md') },
    { name: 'docs-components-loader', path: '/docs/components/loader', component: () => import('../components/ILoader/docs/en.md') },
    { name: 'docs-components-media', path: '/docs/components/media', component: () => import('../components/IMedia/docs/en.md') },
    { name: 'docs-components-modal', path: '/docs/components/modal', component: () => import('../components/IModal/docs/en.md') },
    { name: 'docs-components-nav', path: '/docs/components/nav', component: () => import('../components/INav/docs/en.md') },
    { name: 'docs-components-navbar', path: '/docs/components/navbar', component: () => import('../components/INavbar/docs/en.md') },
    { name: 'docs-components-pagination', path: '/docs/components/pagination', component: () => import('../components/IPagination/docs/en.md') },
    { name: 'docs-components-popover', path: '/docs/components/popover', component: () => import('../components/IPopover/docs/en.md') },
    { name: 'docs-components-progress', path: '/docs/components/progress', component: () => import('../components/IProgress/docs/en.md') },
    { name: 'docs-components-sidebar', path: '/docs/components/sidebar', component: () => import('../components/ISidebar/docs/en.md') },
    { name: 'docs-components-tabs', path: '/docs/components/tabs', component: () => import('../components/ITabs/docs/en.md') },
    { name: 'docs-components-tooltip', path: '/docs/components/tooltip', component: () => import('../components/ITooltip/docs/en.md') },
    { name: 'docs-utilities-border', path: '/docs/utilities/border', component: () => import('../docs/utilities/border/en.md') },
    { name: 'docs-utilities-clearfix', path: '/docs/utilities/clearfix', component: () => import('../docs/utilities/clearfix/en.md') },
    { name: 'docs-utilities-color', path: '/docs/utilities/color', component: () => import('../docs/utilities/color/en.md') },
    { name: 'docs-utilities-display', path: '/docs/utilities/display', component: () => import('../docs/utilities/display/en.md') },
    { name: 'docs-utilities-embed', path: '/docs/utilities/embed', component: () => import('../docs/utilities/embed/en.md') },
    { name: 'docs-utilities-flex', path: '/docs/utilities/flex', component: () => import('../docs/utilities/flex/en.md')  },
    { name: 'docs-utilities-float', path: '/docs/utilities/float', component: () => import('../docs/utilities/float/en.md')  },
    { name: 'docs-utilities-overflow', path: '/docs/utilities/overflow', component: () => import('../docs/utilities/overflow/en.md')  },
    { name: 'docs-utilities-overlay', path: '/docs/utilities/overlay', component: () => import('../docs/utilities/overlay/en.md')  },
    { name: 'docs-utilities-position', path: '/docs/utilities/position', component: () => import('../docs/utilities/position/en.md')  },
    { name: 'docs-utilities-sizing', path: '/docs/utilities/sizing', component: () => import('../docs/utilities/sizing/en.md')  },
    { name: 'docs-utilities-spacing', path: '/docs/utilities/spacing', component: () => import('../docs/utilities/spacing/en.md')  },
    { name: 'docs-utilities-text', path: '/docs/utilities/text', component: () => import('../docs/utilities/text/en.md')  },
    { name: 'docs-utilities-vertical-align', path: '/docs/utilities/vertical-align', component: () => import('../docs/utilities/vertical-align/en.md')  },
    { name: 'docs-utilities-visibility', path: '/docs/utilities/visibility', component: () => import('../docs/utilities/visibility/en.md')  },
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
