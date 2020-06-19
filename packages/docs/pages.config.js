const pages = [
    {
        id: 'index',
        title: 'Vue.js UI/UX Library',
        description: 'Inkline is the customizable Vue.js UI/UX Library, designed for creating flawless responsive web applications with the best user and developer experience.'
    },
    {
        id: 'docs-preface-about-inkline',
        title: 'About Inkline',
        description: 'Read about how Inkline was written, designed and tested to be what it is today.'
    },
    {
        id: 'docs-preface-concepts',
        title: 'Concepts',
        description: 'Learn more about the concepts used throughout the framework and Inkline\'s design decisions.'
    },
    {
        id: 'docs-preface-contribution-guide',
        title: 'Contribution Guide',
        description: 'Actively participate in the development and the future of Inkline by contributing regularly.'
    },
    {
        id: 'docs-introduction-getting-started',
        title: 'Getting Started',
        description: 'Get started with Inkline and experience well written, designed and tested front end code.'
    },
    {
        id: 'docs-introduction-installation-vue-cli',
        title: 'Vue CLI Installation',
        description: 'Install Inkline using the official Vue CLI plugin and get Inkline automatically set up for you.'
    },
    {
        id: 'docs-introduction-installation-nuxt',
        title: 'Nuxt.js Installation',
        description: 'Install Inkline using the official Nuxt.js module and get Inkline automatically set up for you.'
    },
    {
        id: 'docs-introduction-installation-custom',
        title: 'Custom Installation',
        description: 'Take control of the process and install Inkline manually using an application bundler of your choice.'
    },
    {
        id: 'docs-introduction-installation-cdn',
        title: 'CDN Installation',
        description: 'Install Inkline using the official JSDelivr CDN integration. The content delivery network (CDN) provides super fast asset delivery from a server that is closest to you.'
    },
    {
        id: 'docs-introduction-plugin-options',
        title: 'Plugin Options',
        description: 'Make Inkline your own by changing its various Vue Plugin global configuration options.'
    },
    {
        id: 'docs-introduction-examples',
        title: 'Examples',
        description: 'Kick start your project development by using our pre-made real-world layout examples.'
    },
    {
        id: 'docs-core-grid',
        title: 'Grid',
        description: 'Inkline\'s grid system is modelled as a 12 columns layout built using flexbox, with equally divided columns.'
    },
    {
        id: 'docs-core-layout',
        title: 'Layout',
        description: 'Build basic web application layouts using Inkline\'s built-in Layout components.'
    },
    {
        id: 'docs-core-typography',
        title: 'Typography',
        description: 'Examples and documentation for typography, one of the most important design elements of an application.'
    },
    {
        id: 'docs-core-images',
        title: 'Images',
        description: 'Documentation and examples for images, using lightweight styles and modifier classes.'
    },
    {
        id: 'docs-core-tables',
        title: 'Tables',
        description: 'Documentation and examples for opt-in styling of tables with Inkline.'
    },
    {
        id: 'docs-core-code',
        title: 'Code',
        description: 'Examples for displaying inline and multi-line blocks of code with Inkline.'
    },
    {
        id: 'docs-core-sass-variables',
        title: 'Sass Variables',
        description: 'Make Inkline your own using hundreds of configurable Sass variables.'
    },
    {
        id: 'docs-forms-checkbox',
        title: 'Checkbox',
        description: 'Checkbox inputs allow the user to select multiple options from a set.'
    },
    {
        id: 'docs-forms-input',
        title: 'Input',
        description: 'Inputs are form components used for inputting data directly from the keyboard.'
    },
    {
        id: 'docs-forms-input-number',
        title: 'Number Input',
        description: 'Number Inputs are form components used to for inputting and manipulating numbers.'
    },
    {
        id: 'docs-forms-radio',
        title: 'Radio',
        description: 'Radio inputs allow the user to select one option from a set of options.'
    },
    {
        id: 'docs-forms-select',
        title: 'Select',
        description: 'Select inputs are form components used for providing a collapsible list of options.'
    },
    {
        id: 'docs-forms-textarea',
        title: 'Textarea',
        description: 'Textareas are form components used for inputting data directly from the keyboard, on multiple lines.'
    },
    {
        id: 'docs-forms-toggle',
        title: 'Toggle',
        description: 'Toggles are boolean form components used for easily enabling or disabling features.'
    },
    {
        id: 'docs-forms-form',
        title: 'Form',
        description: 'Inkline\'s Form components are the main wrappers for form elements, with powerful validation options.'
    },
    {
        id: 'docs-forms-form-group',
        title: 'Form Group',
        description: 'Form Groups are the easiest way to add structure to form elements.'
    },
    {
        id: 'docs-forms-form-label',
        title: 'Form Label',
        description: 'Labels are a form component used to easily add text associated to inputs.'
    },
    {
        id: 'docs-forms-validation-introduction',
        title: 'Introduction - Form Validation',
        description: 'Install and take advantage of the powerful form validation utilities provided by Inkline.'
    },
    {
        id: 'docs-forms-validation-schema',
        title: 'Schema - Form Validation',
        description: 'Inkline\'s form validation schema defines the form input fields, groups and how they work together.'
    },
    {
        id: 'docs-forms-validation-validators',
        title: 'Validators - Form Validation',
        description: 'Inkline\'s validators are functions used to check whether an input value matches a specific criteria.'
    },
    {
        id: 'docs-forms-validation-methods',
        title: 'Methods - Form Validation',
        description: 'Inkline\'s form validation schema can be used to dynamically add schema fields and groups with ease.'
    },
    {
        id: 'docs-components-alert',
        title: 'Alert',
        description: 'Provide contextual feedback messages for typical user actions using Inkline\'s Alert component.'
    },
    {
        id: 'docs-components-badge',
        title: 'Badge',
        description: 'Documentation and examples for badges, a small Inkline component used for counting and labeling.'
    },
    {
        id: 'docs-components-breadcrumb',
        title: 'Breadcrumb',
        description: 'Indicate the current page’s location depth using a navigation list that automatically adds separators.'
    },
    {
        id: 'docs-components-button',
        title: 'Button',
        description: 'Inkline\'s Button component provides you with styles for multiple sizes, states, and more.'
    },
    {
        id: 'docs-components-button-group',
        title: 'Button Group',
        description: 'Group multiple buttons together on a single line using Inkline\'s Button Group component.'
    },
    {
        id: 'docs-components-card',
        title: 'Card',
        description: 'Cards provide you with a flexible and extensible content container with multiple color variants and options.'
    },
    {
        id: 'docs-components-collapsible',
        title: 'Collapsible',
        description: 'Use Inkline\'s Collapsible components to show and hide content using a smooth reveal transition.'
    },
    {
        id: 'docs-components-datatable-introduction',
        title: 'Introduction - Data Table',
        description: 'Create UX-friendly tables with advanced interaction controls using the Data Table component.'
    },
    {
        id: 'docs-components-datatable-sorting',
        title: 'Sorting - Data Table',
        description: 'Inkline\'s Data Table columns are easily sortable, in both ascending and descending order.'
    },
    {
        id: 'docs-components-datatable-filtering',
        title: 'Filtering - Data Table',
        description: 'Inkline\'s Data Table rows are easily and efficiently filtered using a fuzzy search algorithm.'
    },
    {
        id: 'docs-components-datatable-pagination',
        title: 'Pagination - Data Table',
        description: 'Inkline\'s Data Table can be easily paginated with smart lazy loading capabilities.'
    },
    {
        id: 'docs-components-datatable-scrolling',
        title: 'Scrolling - Data Table',
        description: 'Inkline\'s Data Table supports a large number of columns easily using horizontal scrolling and sticky columns.'
    },
    {
        id: 'docs-components-datatable-expanding',
        title: 'Expanding - Data Table',
        description: 'Inkline\'s Data Table allows you to expand a row to easily show more details about the entry.'
    },
    {
        id: 'docs-components-datatable-events',
        title: 'Events - Data Table',
        description: 'Inkline\'s Data Table offers various events that you can use to interact with your data.'
    },
    {
        id: 'docs-components-datatable-api',
        title: 'API - Data Table',
        description: 'Inkline\'s Data Table has a very intuitive and comprehensive component API for all your customization needs.'
    },
    {
        id: 'docs-components-datatable-rendering',
        title: 'Rendering - Data Table',
        description: 'Inkline\'s Data Table columns, rows and headers can be rendered using custom render helpers.'
    },
    {
        id: 'docs-components-dropdown',
        title: 'Dropdown',
        description: 'Dropdowns are contextual overlays toggled through clicking or hovering, used for displaying a list of links.'
    },
    {
        id: 'docs-components-hamburger-menu',
        title: 'Hamburger Menu',
        description: 'Inkline\'s hamburger menu is used to control opening and closing elements using various animation options.'
    },
    {
        id: 'docs-components-header',
        title: 'Header',
        description: 'Inkline\'s lightweight, responsive Header component used for showcasing hero unit style content.'
    },
    {
        id: 'docs-components-icon',
        title: 'Icon',
        description: 'Inkline provides you with a set of icons which are commonly used within web applications.'
    },
    {
        id: 'docs-components-list-group',
        title: 'List Group',
        description: 'List Groups are flexible components used for displaying a list of related content.'
    },
    {
        id: 'docs-components-loader',
        title: 'Loader',
        description: 'Provide a loading state for a component or page using Inkline\'s customizable loading spinner.'
    },
    {
        id: 'docs-components-media',
        title: 'Media',
        description: 'Media objects provide you with a flexible component that can be easily nested and repeated.'
    },
    {
        id: 'docs-components-modal',
        title: 'Modal',
        description: 'Modals are dialogs that can be used for lightboxes, user notifications, or completely custom content.'
    },
    {
        id: 'docs-components-nav',
        title: 'Nav',
        description: 'Navs are basic navigation components that provide alignment and spacing between items.'
    },
    {
        id: 'docs-components-navbar',
        title: 'Navbar',
        description: 'A responsive navigation header that includes support for branding, navigation, forms and more.'
    },
    {
        id: 'docs-components-pagination',
        title: 'Pagination',
        description: 'Use Inkline\'s Pagination component to provide navigation for large series of related content.'
    },
    {
        id: 'docs-components-popover',
        title: 'Popover',
        description: 'Popovers are useful for conveying information when an user clicks an element.'
    },
    {
        id: 'docs-components-progress',
        title: 'Progress',
        description: 'Inkline\'s custom component for displaying progress with support for stacked progress bars.'
    },
    {
        id: 'docs-components-sidebar',
        title: 'Sidebar',
        description: 'A responsive navigation sidebar that includes support for branding, navigation, forms and more.'
    },
    {
        id: 'docs-components-tabs',
        title: 'Tabs',
        description: 'Tab elements are used to switch between multiple sections of related content.'
    },
    {
        id: 'docs-components-tooltip',
        title: 'Tooltip',
        description: 'Tooltips are useful for conveying information when an user hovers over an element.'
    },
    {
        id: 'docs-utilities-border',
        title: 'Border',
        description: 'Use Inkline\'s border utilities to quickly apply border styles to an element.'
    },
    {
        id: 'docs-utilities-clearfix',
        title: 'Clearfix',
        description: 'Use Inkline\'s clearfix utility to clear floated content within a container.'
    },
    {
        id: 'docs-utilities-color',
        title: 'Color',
        description: 'Use Inkline\'s color utilities to provide a beautiful, consistent color scheme across your web application.'
    },
    {
        id: 'docs-utilities-display',
        title: 'Display',
        description: 'Change the display style of components responsively using Inkline\'s display utilities.'
    },
    {
        id: 'docs-utilities-embed',
        title: 'Embed',
        description: 'Create responsive video embeds by keeping the aspect ratio based on the parent element width.'
    },
    {
        id: 'docs-utilities-flex',
        title: 'Flex',
        description: 'Use Inkline\'s flexbox utilities to modify the layout, alignment, and sizing of components and more.'
    },
    {
        id: 'docs-utilities-float',
        title: 'Float',
        description: 'You can use Inkline\'s float utilities to float any element, for any breakpoint.'
    },
    {
        id: 'docs-utilities-overflow',
        title: 'Overflow',
        description: 'You can use Inkline\'s overflow utilities for deciding how content overflows an element.'
    },
    {
        id: 'docs-utilities-overlay',
        title: 'Overlay',
        description: 'Make an element overlay its container by adding one of Inkline\'s overlay utilities.'
    },
    {
        id: 'docs-utilities-position',
        title: 'Position',
        description: 'Use Inkline\'s position utilities for quickly setting the position of an element.'
    },
    {
        id: 'docs-utilities-sizing',
        title: 'Sizing',
        description: 'Make an element as wide or as tall as you need using Inkline\'s width and height utilities.'
    },
    {
        id: 'docs-utilities-spacing',
        title: 'Spacing',
        description: 'Inkline provides a wide range of responsive margin and padding utility classes to modify an element’s appearance.'
    },
    {
        id: 'docs-utilities-text',
        title: 'Text',
        description: 'Inkline provides common text utilities to control alignment, wrapping, weight, and more.'
    },
    {
        id: 'docs-utilities-vertical-align',
        title: 'Vertical Align',
        description: 'Use Inkline\'s vertical alignment utilities for inline, inline block, inline table, and table cell elements.'
    },
    {
        id: 'docs-utilities-visibility',
        title: 'Visibility',
        description: 'Inkline\'s utilities allow you to control the visibility, with or without modifying the display of elements.'
    },
    {
        id: 'docs-advanced-dark-mode',
        title: 'Dark Mode',
        description: 'Easily change the theme of your application to light or dark programmatically.'
    }
];

module.exports = {
    byId: pages.reduce((acc, page) => {
        acc[page.id] = page;
        return acc;
    }, {}),
    allIds: pages.map((page) => page.id)
};
