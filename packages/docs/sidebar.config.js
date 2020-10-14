export const sidebar = [
    {
        title: 'Preface',
        children: [
            { path: '/docs/preface/about-inkline' },
            { path: '/docs/preface/concepts' },
            { path: '/docs/preface/contribution-guide' }
        ]
    },
    {
        title: 'Introduction',
        children: [
            { path: '/docs/introduction/getting-started' },
            {
                title: 'Installation',
                id: 'docs-introduction-installation',
                children: [
                    { title: 'Vue CLI', path: '/docs/introduction/installation/vue-cli' },
                    { title: 'Nuxt.js', path: '/docs/introduction/installation/nuxt' },
                    { title: 'Custom', path: '/docs/introduction/installation/custom' },
                    { title: 'CDN', path: '/docs/introduction/installation/cdn' }
                ]
            },
            { path: '/docs/introduction/plugin-options' }
        ]
    },
    {
        title: 'Core',
        children: [
            { path: '/docs/core/grid' },
            { path: '/docs/core/layout' },
            { path: '/docs/core/typography' },
            { path: '/docs/core/images' },
            { path: '/docs/core/tables' },
            { path: '/docs/core/code' },
            { path: '/docs/core/sass-variables' }
        ]
    },
    {
        title: 'Forms',
        children: [
            { path: '/docs/forms/checkbox' },
            { path: '/docs/forms/input' },
            { path: '/docs/forms/input-number' },
            { path: '/docs/forms/radio' },
            { path: '/docs/forms/select' },
            { path: '/docs/forms/textarea' },
            { path: '/docs/forms/toggle' },
            { path: '/docs/forms/form' },
            { path: '/docs/forms/form-group' },
            { path: '/docs/forms/form-label' },
            {
                title: 'Form Validation',
                id: 'docs-forms-validation',
                children: [
                    { title: 'Introduction', path: '/docs/forms/validation/introduction' },
                    { title: 'Schema', path: '/docs/forms/validation/schema' },
                    { title: 'Validators', path: '/docs/forms/validation/validators' },
                    { title: 'Methods', path: '/docs/forms/validation/methods' }
                ]
            }
        ]
    },
    {
        title: 'Components',
        children: [
            { path: '/docs/components/alert' },
            { path: '/docs/components/badge' },
            { path: '/docs/components/breadcrumb' },
            { path: '/docs/components/button' },
            { path: '/docs/components/button-group' },
            { path: '/docs/components/card' },
            { path: '/docs/components/collapsible' },
            {
                title: 'DataTable',
                id: 'docs-components-datatable',
                children: [
                    { title: 'Introduction', path: '/docs/components/datatable/introduction' },
                    { title: 'Sorting', path: '/docs/components/datatable/sorting' },
                    { title: 'Filtering', path: '/docs/components/datatable/filtering' },
                    { title: 'Pagination', path: '/docs/components/datatable/pagination' },
                    { title: 'Scrolling', path: '/docs/components/datatable/scrolling' },
                    { title: 'Expanding', path: '/docs/components/datatable/expanding' },
                    { title: 'Events', path: '/docs/components/datatable/events' },
                    { title: 'Rendering', path: '/docs/components/datatable/rendering' },
                    { title: 'API & Variables', path: '/docs/components/datatable/api' }
                ]
            },
            { path: '/docs/components/dropdown' },
            { path: '/docs/components/hamburger-menu' },
            { path: '/docs/components/header' },
            { path: '/docs/components/icon' },
            { path: '/docs/components/list-group' },
            { path: '/docs/components/loader' },
            { path: '/docs/components/media' },
            { path: '/docs/components/modal' },
            { path: '/docs/components/nav' },
            { path: '/docs/components/navbar' },
            { path: '/docs/components/pagination' },
            { path: '/docs/components/popover' },
            { path: '/docs/components/progress' },
            { path: '/docs/components/sidebar' },
            { path: '/docs/components/tabs' },
            { path: '/docs/components/tooltip' }
        ]
    },
    {
        title: 'Utilities',
        children: [
            { title: 'Border', path: '/docs/utilities/border' },
            { title: 'Clearfix', path: '/docs/utilities/clearfix' },
            { title: 'Color', path: '/docs/utilities/color' },
            { title: 'Display', path: '/docs/utilities/display' },
            { title: 'Embed', path: '/docs/utilities/embed' },
            { title: 'Flex', path: '/docs/utilities/flex' },
            { title: 'Float', path: '/docs/utilities/float' },
            { title: 'Overflow', path: '/docs/utilities/overflow' },
            { title: 'Overlay', path: '/docs/utilities/overlay' },
            { title: 'Position', path: '/docs/utilities/position' },
            { title: 'Sizing', path: '/docs/utilities/sizing' },
            { title: 'Spacing', path: '/docs/utilities/spacing' },
            { title: 'Text', path: '/docs/utilities/text' },
            { title: 'Vertical Align', path: '/docs/utilities/vertical-align' },
            { title: 'Visibility', path: '/docs/utilities/visibility' }
        ]
    },
    {
        title: 'Advanced',
        children: [
            { path: '/docs/advanced/dark-mode' }
        ]
    }
];
