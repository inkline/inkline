import type { NavigationItem } from '~/types';

export const mainNavigation: NavigationItem[] = [
    {
        title: 'Getting Started',
        to: '/docs/about'
    },
    {
        title: 'Customization',
        to: '/docs/customization'
    },
    {
        title: 'Components',
        to: '/docs/components'
    },
    {
        title: 'Utilities',
        to: '/docs/getting-help'
    },
    {
        title: 'Community',
        to: '/docs/getting-help'
    }
];

export const gettingStartedNavigation: NavigationItem[] = [
    {
        title: 'Introduction',
        children: [
            {
                title: 'About Inkline',
                to: '/docs/introduction'
            },
            {
                title: 'Concepts',
                to: '/docs/introduction/concepts'
            }
        ]
    },
    {
        title: 'Getting Started',
        children: [
            {
                title: 'Vite',
                to: '/docs/getting-started/vite'
            },
            {
                title: 'Nuxt',
                to: '/docs/getting-started/nuxt'
            },
            {
                title: 'CDN 🚧',
                to: '/docs/getting-started/cdn'
            },
            {
                title: 'Other',
                to: '/docs/getting-started/other'
            }
        ]
    }
];

export const customizationNavigation: NavigationItem[] = [
    {
        title: 'Engine',
        children: [
            {
                title: 'Configuration File'
            },
            {
                title: 'Variables'
            },
            {
                title: 'Selectors'
            }
        ]
    },
    {
        title: 'Customization',
        children: [
            {
                title: 'Configuration'
            },
            {
                title: 'Design Tokens'
            },
            {
                title: 'Theming'
            }
        ]
    }
];

export const componentsNavigation: NavigationItem[] = [
    {
        title: 'Basic Components',
        children: [
            {
                title: 'Badge'
            },
            {
                title: 'Button'
            },
            {
                title: 'Button Group'
            },
            {
                title: 'Card'
            },
            {
                title: 'Collapsible'
            },
            {
                title: 'Dropdown'
            },
            {
                title: 'Header'
            },
            {
                title: 'Icon'
            },
            {
                title: 'List Group'
            },
            {
                title: 'Media'
            },
            {
                title: 'Pagination'
            },
            {
                title: 'Progress'
            },
            {
                title: 'Table'
            },
            {
                title: 'Tabs'
            }
        ]
    },
    {
        title: 'Feedback Components',
        children: [
            {
                title: 'Alert'
            },
            {
                title: 'Loader'
            },
            {
                title: 'Modal'
            },
            {
                title: 'Popover'
            },
            {
                title: 'Toast'
            },
            {
                title: 'Tooltip'
            }
        ]
    },
    {
        title: 'Navigation Components',
        children: [
            {
                title: 'Breadcrumb'
            },
            {
                title: 'Drawer'
            },
            {
                title: 'Hamburger Menu'
            },
            {
                title: 'Nav'
            },
            {
                title: 'Navbar'
            },
            {
                title: 'Sidebar'
            }
        ]
    },
    {
        title: 'Form Components',
        children: [
            {
                title: 'Checkbox',
                children: [
                    {
                        title: 'Checkbox'
                    },
                    {
                        title: 'Checkbox Group'
                    },
                    {
                        title: 'Checkbox Button'
                    }
                ]
            },
            {
                title: 'Datepicker'
            },
            {
                title: 'Form',
                children: [
                    {
                        title: 'Form'
                    },
                    {
                        title: 'Form Group'
                    },
                    {
                        title: 'Form Label'
                    },
                    {
                        title: 'Form Error'
                    }
                ]
            },
            {
                title: 'Input'
            },
            {
                title: 'Number Input'
            },
            {
                title: 'Radio',
                children: [
                    {
                        title: 'Radio Group'
                    },
                    {
                        title: 'Radio Button'
                    }
                ]
            },
            {
                title: 'Select'
            },
            {
                title: 'Toggle'
            },
            {
                title: 'Textarea'
            }
        ]
    },
    {
        title: 'Form Validation'
    },
    {
        title: 'Services'
    },
    {
        title: 'Utilities'
    },
    {
        title: 'Add-ons'
    },
    {
        title: 'Troubleshooting',
        children: [{ title: 'Common Issues' }, { title: 'FAQ' }]
    },
    {
        title: 'Migration Guide'
    },
    {
        title: 'Resources',
        children: [{ title: 'Examples' }, { title: 'Playground' }]
    }
];
