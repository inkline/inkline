import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import { Inkline } from '../plugin';
import * as components from '../components';
import '@inkline/inkline/inkline.scss';
import '@inkline/inkline/playground/main.scss';
import App from '@inkline/inkline/playground/App.vue';
import Example from '@inkline/inkline/playground/components/Example.vue';
import { useServer } from '@inkline/inkline/playground/server';
import * as icons from '@inkline/icons/packs/inkline';

const routes = [
    { name: 'index', path: '/', component: {}, meta: { path: '' } },
    { name: 'docs-preface', path: '/docs/preface', component: () => import('../docs/preface/en.md') },
    { name: 'docs-preface-concepts', path: '/docs/preface/concepts', component: () => import('../docs/preface/concepts/en.md') },
    { name: 'docs-preface-contribution-guide', path: '/docs/preface/contribution-guide', component: () => import('../docs/preface/contribution-guide/en.md') },
    { name: 'docs-introduction', path: '/docs/introduction', component: () => import('../docs/introduction/en.md') },
    { name: 'docs-introduction-installation-vue-cli', path: '/docs/introduction/installation/vue-cli', component: () => import('../docs/introduction/installation/vue-cli/en.md') },
    { name: 'docs-introduction-installation-nuxt', path: '/docs/introduction/installation/nuxt', component: () => import('../docs/introduction/installation/nuxt/en.md') },
    { name: 'docs-introduction-installation-custom', path: '/docs/introduction/installation/custom', component: () => import('../docs/introduction/installation/custom/en.md') },
    { name: 'docs-introduction-installation-cdn', path: '/docs/introduction/installation/cdn', component: () => import('../docs/introduction/installation/cdn/en.md') },
    { name: 'docs-introduction-plugin-options', path: '/docs/introduction/plugin-options', component: () => import('../docs/introduction/plugin-options/en.md') },
    { name: 'docs-core-grid', path: '/docs/core/grid', component: () => import('../docs/core/grid/en.md') },
    { name: 'docs-core-layout', path: '/docs/core/layout', component: () => import('../components/ILayout/docs/en.md') },
    { name: 'docs-core-typography', path: '/docs/core/typography', component: () => import('../docs/core/typography/en.md') },
    { name: 'docs-core-images', path: '/docs/core/images', component: () => import('../docs/core/images/en.md') },
    { name: 'docs-core-tables', path: '/docs/core/tables', component: () => import('../components/ITable/docs/en.md') },
    { name: 'docs-core-code', path: '/docs/core/code', component: () => import('../docs/core/code/en.md') },
    { name: 'docs-forms-checkbox', path: '/docs/forms/checkbox', component: () => import('../components/ICheckbox/docs/en.md') },
    { name: 'docs-forms-input', path: '/docs/forms/input', component: () => import('../components/IInput/docs/en.md') },
    { name: 'docs-forms-number-input', path: '/docs/forms/number-input', component: () => import('../components/INumberInput/docs/en.md') },
    { name: 'docs-forms-radio', path: '/docs/forms/radio', component: () => import('../components/IRadio/docs/en.md') },
    { name: 'docs-forms-select', path: '/docs/forms/select', component: () => import('../components/ISelect/docs/en.md') },
    { name: 'docs-forms-select-pagination', path: '/docs/forms/select/pagination', component: () => import('../components/ISelect/docs/pagination/en.md') },
    { name: 'docs-forms-select-autocomplete', path: '/docs/forms/select/autocomplete', component: () => import('../components/ISelect/docs/autocomplete/en.md') },
    { name: 'docs-forms-select-rendering', path: '/docs/forms/select/rendering', component: () => import('../components/ISelect/docs/rendering/en.md') },
    { name: 'docs-forms-select-advanced', path: '/docs/forms/select/advanced', component: () => import('../components/ISelect/docs/advanced/en.md') },
    { name: 'docs-forms-textarea', path: '/docs/forms/textarea', component: () => import('../components/ITextarea/docs/en.md') },
    { name: 'docs-forms-toggle', path: '/docs/forms/toggle', component: () => import('../components/IToggle/docs/en.md') },
    { name: 'docs-forms-form', path: '/docs/forms/form', component: () => import('../components/IForm/docs/en.md') },
    { name: 'docs-forms-form-group', path: '/docs/forms/form-group', component: () => import('../components/IForm/components/IFormGroup/docs/en.md') },
    { name: 'docs-forms-form-label', path: '/docs/forms/form-label', component: () => import('../components/IForm/components/IFormLabel/docs/en.md') },
    { name: 'docs-forms-validation', path: '/docs/forms/validation', component: () => import('../docs/forms/validation/en.md') },
    { name: 'docs-forms-validation-schema', path: '/docs/forms/validation/schema', component: () => import('../docs/forms/validation/schema/en.md') },
    { name: 'docs-forms-validation-validators', path: '/docs/forms/validation/validators', component: () => import('../docs/forms/validation/validators/en.md') },
    { name: 'docs-forms-validation-methods', path: '/docs/forms/validation/methods', component: () => import('../docs/forms/validation/methods/en.md') },
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
    { name: 'docs-utilities-flex', path: '/docs/utilities/flex', component: () => import('../docs/utilities/flex/en.md') },
    { name: 'docs-utilities-float', path: '/docs/utilities/float', component: () => import('../docs/utilities/float/en.md') },
    { name: 'docs-utilities-overflow', path: '/docs/utilities/overflow', component: () => import('../docs/utilities/overflow/en.md') },
    { name: 'docs-utilities-overlay', path: '/docs/utilities/overlay', component: () => import('../docs/utilities/overlay/en.md') },
    { name: 'docs-utilities-position', path: '/docs/utilities/position', component: () => import('../docs/utilities/position/en.md') },
    { name: 'docs-utilities-screen-reader', path: '/docs/utilities/screen-reader', component: () => import('../docs/utilities/screen-reader/en.md') },
    { name: 'docs-utilities-sizing', path: '/docs/utilities/sizing', component: () => import('../docs/utilities/sizing/en.md') },
    { name: 'docs-utilities-spacing', path: '/docs/utilities/spacing', component: () => import('../docs/utilities/spacing/en.md') },
    { name: 'docs-utilities-text', path: '/docs/utilities/text', component: () => import('../docs/utilities/text/en.md') },
    { name: 'docs-utilities-vertical-align', path: '/docs/utilities/vertical-align', component: () => import('../docs/utilities/vertical-align/en.md') },
    { name: 'docs-utilities-visibility', path: '/docs/utilities/visibility', component: () => import('../docs/utilities/visibility/en.md') }
];

const app = createApp(App);
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

app.use(Inkline, {
    components,
    icons
});

app.use(router);

useServer();

[
    Example
].forEach((component) => app.component(component.name, component));

app.mount('#app');
