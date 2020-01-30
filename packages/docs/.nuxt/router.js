import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _24154c5d = () => interopDefault(import('../pages/docs/components/alert.vue' /* webpackChunkName: "pages/docs/components/alert" */))
const _0da439b8 = () => interopDefault(import('../pages/docs/components/badge.vue' /* webpackChunkName: "pages/docs/components/badge" */))
const _3202b75c = () => interopDefault(import('../pages/docs/components/breadcrumb.vue' /* webpackChunkName: "pages/docs/components/breadcrumb" */))
const _04209f81 = () => interopDefault(import('../pages/docs/components/button.vue' /* webpackChunkName: "pages/docs/components/button" */))
const _15e80e33 = () => interopDefault(import('../pages/docs/components/button-group.vue' /* webpackChunkName: "pages/docs/components/button-group" */))
const _4dbe161f = () => interopDefault(import('../pages/docs/components/card.vue' /* webpackChunkName: "pages/docs/components/card" */))
const _97b70d6a = () => interopDefault(import('../pages/docs/components/collapsible.vue' /* webpackChunkName: "pages/docs/components/collapsible" */))
const _1a3539c0 = () => interopDefault(import('../pages/docs/components/dropdown.vue' /* webpackChunkName: "pages/docs/components/dropdown" */))
const _64a0355c = () => interopDefault(import('../pages/docs/components/header.vue' /* webpackChunkName: "pages/docs/components/header" */))
const _223ffb08 = () => interopDefault(import('../pages/docs/components/icon.vue' /* webpackChunkName: "pages/docs/components/icon" */))
const _760eb25f = () => interopDefault(import('../pages/docs/components/list-group.vue' /* webpackChunkName: "pages/docs/components/list-group" */))
const _00724fe2 = () => interopDefault(import('../pages/docs/components/loader.vue' /* webpackChunkName: "pages/docs/components/loader" */))
const _0a56a236 = () => interopDefault(import('../pages/docs/components/media.vue' /* webpackChunkName: "pages/docs/components/media" */))
const _06d6a5a4 = () => interopDefault(import('../pages/docs/components/modal.vue' /* webpackChunkName: "pages/docs/components/modal" */))
const _249e9238 = () => interopDefault(import('../pages/docs/components/nav.vue' /* webpackChunkName: "pages/docs/components/nav" */))
const _3bc01542 = () => interopDefault(import('../pages/docs/components/navbar.vue' /* webpackChunkName: "pages/docs/components/navbar" */))
const _4755ef2e = () => interopDefault(import('../pages/docs/components/pagination.vue' /* webpackChunkName: "pages/docs/components/pagination" */))
const _0e5b4234 = () => interopDefault(import('../pages/docs/components/popover.vue' /* webpackChunkName: "pages/docs/components/popover" */))
const _a0d31988 = () => interopDefault(import('../pages/docs/components/progress.vue' /* webpackChunkName: "pages/docs/components/progress" */))
const _5a124fc6 = () => interopDefault(import('../pages/docs/components/sidebar.vue' /* webpackChunkName: "pages/docs/components/sidebar" */))
const _1d67f144 = () => interopDefault(import('../pages/docs/components/tooltip.vue' /* webpackChunkName: "pages/docs/components/tooltip" */))
const _34e102da = () => interopDefault(import('../pages/docs/core/code.vue' /* webpackChunkName: "pages/docs/core/code" */))
const _2c41076c = () => interopDefault(import('../pages/docs/core/grid.vue' /* webpackChunkName: "pages/docs/core/grid" */))
const _3ed9abc4 = () => interopDefault(import('../pages/docs/core/images.vue' /* webpackChunkName: "pages/docs/core/images" */))
const _49e3f9d0 = () => interopDefault(import('../pages/docs/core/layout.vue' /* webpackChunkName: "pages/docs/core/layout" */))
const _4633b0ea = () => interopDefault(import('../pages/docs/core/tables.vue' /* webpackChunkName: "pages/docs/core/tables" */))
const _6195b255 = () => interopDefault(import('../pages/docs/core/typography.vue' /* webpackChunkName: "pages/docs/core/typography" */))
const _3f8db95d = () => interopDefault(import('../pages/docs/forms/checkbox.vue' /* webpackChunkName: "pages/docs/forms/checkbox" */))
const _d18a5a44 = () => interopDefault(import('../pages/docs/forms/form.vue' /* webpackChunkName: "pages/docs/forms/form" */))
const _fa18f060 = () => interopDefault(import('../pages/docs/forms/form-group.vue' /* webpackChunkName: "pages/docs/forms/form-group" */))
const _91c26476 = () => interopDefault(import('../pages/docs/forms/form-label.vue' /* webpackChunkName: "pages/docs/forms/form-label" */))
const _4c9fb020 = () => interopDefault(import('../pages/docs/forms/input.vue' /* webpackChunkName: "pages/docs/forms/input" */))
const _4f9b3274 = () => interopDefault(import('../pages/docs/forms/input-number.vue' /* webpackChunkName: "pages/docs/forms/input-number" */))
const _a5e6285e = () => interopDefault(import('../pages/docs/forms/radio.vue' /* webpackChunkName: "pages/docs/forms/radio" */))
const _d6c872d4 = () => interopDefault(import('../pages/docs/forms/select.vue' /* webpackChunkName: "pages/docs/forms/select" */))
const _2aedc154 = () => interopDefault(import('../pages/docs/forms/textarea.vue' /* webpackChunkName: "pages/docs/forms/textarea" */))
const _361479d8 = () => interopDefault(import('../pages/docs/introduction/customization.vue' /* webpackChunkName: "pages/docs/introduction/customization" */))
const _fbe3d186 = () => interopDefault(import('../pages/docs/introduction/getting-started.vue' /* webpackChunkName: "pages/docs/introduction/getting-started" */))
const _29225d76 = () => interopDefault(import('../pages/docs/introduction/installation.vue' /* webpackChunkName: "pages/docs/introduction/installation" */))
const _69749b0b = () => interopDefault(import('../pages/docs/utilities/border.vue' /* webpackChunkName: "pages/docs/utilities/border" */))
const _338429c7 = () => interopDefault(import('../pages/docs/utilities/clearfix.vue' /* webpackChunkName: "pages/docs/utilities/clearfix" */))
const _3c182954 = () => interopDefault(import('../pages/docs/utilities/color.vue' /* webpackChunkName: "pages/docs/utilities/color" */))
const _014b78f3 = () => interopDefault(import('../pages/docs/utilities/display.vue' /* webpackChunkName: "pages/docs/utilities/display" */))
const _720a9dca = () => interopDefault(import('../pages/docs/utilities/embed.vue' /* webpackChunkName: "pages/docs/utilities/embed" */))
const _2c375e18 = () => interopDefault(import('../pages/docs/utilities/flex.vue' /* webpackChunkName: "pages/docs/utilities/flex" */))
const _482cf7cd = () => interopDefault(import('../pages/docs/utilities/float.vue' /* webpackChunkName: "pages/docs/utilities/float" */))
const _bb4eebbe = () => interopDefault(import('../pages/docs/utilities/overflow.vue' /* webpackChunkName: "pages/docs/utilities/overflow" */))
const _fa43a4fe = () => interopDefault(import('../pages/docs/utilities/overlay.vue' /* webpackChunkName: "pages/docs/utilities/overlay" */))
const _66f6f870 = () => interopDefault(import('../pages/docs/utilities/position.vue' /* webpackChunkName: "pages/docs/utilities/position" */))
const _7f03ae5d = () => interopDefault(import('../pages/docs/utilities/sizing.vue' /* webpackChunkName: "pages/docs/utilities/sizing" */))
const _2bf39bf4 = () => interopDefault(import('../pages/docs/utilities/spacing.vue' /* webpackChunkName: "pages/docs/utilities/spacing" */))
const _ef202d68 = () => interopDefault(import('../pages/docs/utilities/text.vue' /* webpackChunkName: "pages/docs/utilities/text" */))
const _5e233e66 = () => interopDefault(import('../pages/docs/utilities/vertical-align.vue' /* webpackChunkName: "pages/docs/utilities/vertical-align" */))
const _7bc42b71 = () => interopDefault(import('../pages/docs/utilities/visibility.vue' /* webpackChunkName: "pages/docs/utilities/visibility" */))
const _02476fc6 = () => interopDefault(import('../pages/docs/forms/validation/introduction.vue' /* webpackChunkName: "pages/docs/forms/validation/introduction" */))
const _6433d6b6 = () => interopDefault(import('../pages/docs/forms/validation/methods.vue' /* webpackChunkName: "pages/docs/forms/validation/methods" */))
const _23fc50cd = () => interopDefault(import('../pages/docs/forms/validation/schema.vue' /* webpackChunkName: "pages/docs/forms/validation/schema" */))
const _640e1ee6 = () => interopDefault(import('../pages/docs/forms/validation/validators.vue' /* webpackChunkName: "pages/docs/forms/validation/validators" */))
const _c41c5316 = () => interopDefault(import('../pages/docs/components/dashboard/datatable/api.vue' /* webpackChunkName: "pages/docs/components/dashboard/datatable/api" */))
const _4ca12e48 = () => interopDefault(import('../pages/docs/components/dashboard/datatable/definition.vue' /* webpackChunkName: "pages/docs/components/dashboard/datatable/definition" */))
const _0966d223 = () => interopDefault(import('../pages/docs/components/dashboard/datatable/expanding.vue' /* webpackChunkName: "pages/docs/components/dashboard/datatable/expanding" */))
const _6b6b60f6 = () => interopDefault(import('../pages/docs/components/dashboard/datatable/filtering.vue' /* webpackChunkName: "pages/docs/components/dashboard/datatable/filtering" */))
const _e2ee95e2 = () => interopDefault(import('../pages/docs/components/dashboard/datatable/pagination.vue' /* webpackChunkName: "pages/docs/components/dashboard/datatable/pagination" */))
const _824b48b2 = () => interopDefault(import('../pages/docs/components/dashboard/datatable/rendering.vue' /* webpackChunkName: "pages/docs/components/dashboard/datatable/rendering" */))
const _0f4cba90 = () => interopDefault(import('../pages/docs/components/dashboard/datatable/scrolling.vue' /* webpackChunkName: "pages/docs/components/dashboard/datatable/scrolling" */))
const _71dcd35f = () => interopDefault(import('../pages/docs/components/dashboard/datatable/sorting.vue' /* webpackChunkName: "pages/docs/components/dashboard/datatable/sorting" */))
const _11a08538 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: '-active nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/docs/components/alert",
    component: _24154c5d,
    name: "docs-components-alert"
  }, {
    path: "/docs/components/badge",
    component: _0da439b8,
    name: "docs-components-badge"
  }, {
    path: "/docs/components/breadcrumb",
    component: _3202b75c,
    name: "docs-components-breadcrumb"
  }, {
    path: "/docs/components/button",
    component: _04209f81,
    name: "docs-components-button"
  }, {
    path: "/docs/components/button-group",
    component: _15e80e33,
    name: "docs-components-button-group"
  }, {
    path: "/docs/components/card",
    component: _4dbe161f,
    name: "docs-components-card"
  }, {
    path: "/docs/components/collapsible",
    component: _97b70d6a,
    name: "docs-components-collapsible"
  }, {
    path: "/docs/components/dropdown",
    component: _1a3539c0,
    name: "docs-components-dropdown"
  }, {
    path: "/docs/components/header",
    component: _64a0355c,
    name: "docs-components-header"
  }, {
    path: "/docs/components/icon",
    component: _223ffb08,
    name: "docs-components-icon"
  }, {
    path: "/docs/components/list-group",
    component: _760eb25f,
    name: "docs-components-list-group"
  }, {
    path: "/docs/components/loader",
    component: _00724fe2,
    name: "docs-components-loader"
  }, {
    path: "/docs/components/media",
    component: _0a56a236,
    name: "docs-components-media"
  }, {
    path: "/docs/components/modal",
    component: _06d6a5a4,
    name: "docs-components-modal"
  }, {
    path: "/docs/components/nav",
    component: _249e9238,
    name: "docs-components-nav"
  }, {
    path: "/docs/components/navbar",
    component: _3bc01542,
    name: "docs-components-navbar"
  }, {
    path: "/docs/components/pagination",
    component: _4755ef2e,
    name: "docs-components-pagination"
  }, {
    path: "/docs/components/popover",
    component: _0e5b4234,
    name: "docs-components-popover"
  }, {
    path: "/docs/components/progress",
    component: _a0d31988,
    name: "docs-components-progress"
  }, {
    path: "/docs/components/sidebar",
    component: _5a124fc6,
    name: "docs-components-sidebar"
  }, {
    path: "/docs/components/tooltip",
    component: _1d67f144,
    name: "docs-components-tooltip"
  }, {
    path: "/docs/core/code",
    component: _34e102da,
    name: "docs-core-code"
  }, {
    path: "/docs/core/grid",
    component: _2c41076c,
    name: "docs-core-grid"
  }, {
    path: "/docs/core/images",
    component: _3ed9abc4,
    name: "docs-core-images"
  }, {
    path: "/docs/core/layout",
    component: _49e3f9d0,
    name: "docs-core-layout"
  }, {
    path: "/docs/core/tables",
    component: _4633b0ea,
    name: "docs-core-tables"
  }, {
    path: "/docs/core/typography",
    component: _6195b255,
    name: "docs-core-typography"
  }, {
    path: "/docs/forms/checkbox",
    component: _3f8db95d,
    name: "docs-forms-checkbox"
  }, {
    path: "/docs/forms/form",
    component: _d18a5a44,
    name: "docs-forms-form"
  }, {
    path: "/docs/forms/form-group",
    component: _fa18f060,
    name: "docs-forms-form-group"
  }, {
    path: "/docs/forms/form-label",
    component: _91c26476,
    name: "docs-forms-form-label"
  }, {
    path: "/docs/forms/input",
    component: _4c9fb020,
    name: "docs-forms-input"
  }, {
    path: "/docs/forms/input-number",
    component: _4f9b3274,
    name: "docs-forms-input-number"
  }, {
    path: "/docs/forms/radio",
    component: _a5e6285e,
    name: "docs-forms-radio"
  }, {
    path: "/docs/forms/select",
    component: _d6c872d4,
    name: "docs-forms-select"
  }, {
    path: "/docs/forms/textarea",
    component: _2aedc154,
    name: "docs-forms-textarea"
  }, {
    path: "/docs/introduction/customization",
    component: _361479d8,
    name: "docs-introduction-customization"
  }, {
    path: "/docs/introduction/getting-started",
    component: _fbe3d186,
    name: "docs-introduction-getting-started"
  }, {
    path: "/docs/introduction/installation",
    component: _29225d76,
    name: "docs-introduction-installation"
  }, {
    path: "/docs/utilities/border",
    component: _69749b0b,
    name: "docs-utilities-border"
  }, {
    path: "/docs/utilities/clearfix",
    component: _338429c7,
    name: "docs-utilities-clearfix"
  }, {
    path: "/docs/utilities/color",
    component: _3c182954,
    name: "docs-utilities-color"
  }, {
    path: "/docs/utilities/display",
    component: _014b78f3,
    name: "docs-utilities-display"
  }, {
    path: "/docs/utilities/embed",
    component: _720a9dca,
    name: "docs-utilities-embed"
  }, {
    path: "/docs/utilities/flex",
    component: _2c375e18,
    name: "docs-utilities-flex"
  }, {
    path: "/docs/utilities/float",
    component: _482cf7cd,
    name: "docs-utilities-float"
  }, {
    path: "/docs/utilities/overflow",
    component: _bb4eebbe,
    name: "docs-utilities-overflow"
  }, {
    path: "/docs/utilities/overlay",
    component: _fa43a4fe,
    name: "docs-utilities-overlay"
  }, {
    path: "/docs/utilities/position",
    component: _66f6f870,
    name: "docs-utilities-position"
  }, {
    path: "/docs/utilities/sizing",
    component: _7f03ae5d,
    name: "docs-utilities-sizing"
  }, {
    path: "/docs/utilities/spacing",
    component: _2bf39bf4,
    name: "docs-utilities-spacing"
  }, {
    path: "/docs/utilities/text",
    component: _ef202d68,
    name: "docs-utilities-text"
  }, {
    path: "/docs/utilities/vertical-align",
    component: _5e233e66,
    name: "docs-utilities-vertical-align"
  }, {
    path: "/docs/utilities/visibility",
    component: _7bc42b71,
    name: "docs-utilities-visibility"
  }, {
    path: "/docs/forms/validation/introduction",
    component: _02476fc6,
    name: "docs-forms-validation-introduction"
  }, {
    path: "/docs/forms/validation/methods",
    component: _6433d6b6,
    name: "docs-forms-validation-methods"
  }, {
    path: "/docs/forms/validation/schema",
    component: _23fc50cd,
    name: "docs-forms-validation-schema"
  }, {
    path: "/docs/forms/validation/validators",
    component: _640e1ee6,
    name: "docs-forms-validation-validators"
  }, {
    path: "/docs/components/dashboard/datatable/api",
    component: _c41c5316,
    name: "docs-components-dashboard-datatable-api"
  }, {
    path: "/docs/components/dashboard/datatable/definition",
    component: _4ca12e48,
    name: "docs-components-dashboard-datatable-definition"
  }, {
    path: "/docs/components/dashboard/datatable/expanding",
    component: _0966d223,
    name: "docs-components-dashboard-datatable-expanding"
  }, {
    path: "/docs/components/dashboard/datatable/filtering",
    component: _6b6b60f6,
    name: "docs-components-dashboard-datatable-filtering"
  }, {
    path: "/docs/components/dashboard/datatable/pagination",
    component: _e2ee95e2,
    name: "docs-components-dashboard-datatable-pagination"
  }, {
    path: "/docs/components/dashboard/datatable/rendering",
    component: _824b48b2,
    name: "docs-components-dashboard-datatable-rendering"
  }, {
    path: "/docs/components/dashboard/datatable/scrolling",
    component: _0f4cba90,
    name: "docs-components-dashboard-datatable-scrolling"
  }, {
    path: "/docs/components/dashboard/datatable/sorting",
    component: _71dcd35f,
    name: "docs-components-dashboard-datatable-sorting"
  }, {
    path: "/",
    component: _11a08538,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
