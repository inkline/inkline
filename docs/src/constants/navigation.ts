import type { NavigationItem } from '~/types';

export const mainNavigation: NavigationItem[] = [
    {
        id: 'getting-started',
        title: 'Getting Started',
        to: '/docs/introduction',
        icon: 'uil:rocket',
        active: [
            '/docs/introduction',
            '/docs/concepts',
            '/docs/conventions',
            /\/docs\/getting-started\/.*/
        ]
    },
    {
        id: 'customization',
        title: 'Customization',
        to: '/docs/customization',
        icon: 'uil:image-edit',
        active: [/\/docs\/customization\/.*/]
    },
    {
        id: 'components',
        title: 'Components',
        to: '/docs/components',
        icon: 'uil:box',
        active: [/\/docs\/components\/.*/]
    },
    {
        id: 'utilities',
        title: 'Utilities',
        to: '/docs/utilities',
        icon: 'uil:wrench',
        active: [/\/docs\/utilities\/.*/]
    },
    {
        id: 'community',
        title: 'Community',
        to: '/docs/getting-help',
        icon: 'uil:chat-bubble-user',
        active: ['/docs/getting-help', '/docs/contributing', '/docs/roadmap', '/docs/license']
    }
];

export const gettingStartedNavigation: NavigationItem[] = [
    {
        id: 'introduction',
        title: 'Introduction',
        children: [
            {
                id: 'index',
                title: 'About Inkline',
                to: '/docs/introduction'
            },
            {
                id: 'concepts',
                title: 'Concepts',
                to: '/docs/concepts'
            },
            {
                id: 'conventions',
                title: 'Conventions',
                to: '/docs/conventions'
            }
        ]
    },
    {
        id: 'getting-started',
        title: 'Getting Started',
        children: [
            {
                id: 'vite',
                title: 'Vite',
                to: '/docs/getting-started/vite'
            },
            {
                id: 'nuxt',
                title: 'Nuxt',
                to: '/docs/getting-started/nuxt'
            },
            {
                id: 'cdn',
                title: 'CDN 🚧',
                to: '/docs/getting-started/cdn'
            },
            {
                id: 'other',
                title: 'Other 🚧',
                to: '/docs/getting-started/other'
            }
        ]
    }
];

export const customizationNavigation: NavigationItem[] = [
    {
        id: 'customization',
        title: 'Customization',
        children: [
            {
                id: 'configuration-file',
                title: 'Configuration File'
            },
            {
                id: 'design-tokens',
                title: 'Design Tokens'
            },
            {
                id: 'theming',
                title: 'Theming'
            }
        ]
    },
    {
        id: 'engine',
        title: 'Engine',
        children: [
            {
                id: 'themes',
                title: 'Themes'
            },
            {
                id: 'variables',
                title: 'Variables'
            },
            {
                id: 'selectors',
                title: 'Selectors'
            }
        ]
    }
];

export const componentsNavigation: NavigationItem[] = [
    {
        id: 'core-components',
        title: 'Core Components',
        children: [
            {
                id: 'grid',
                title: 'Grid'
            },
            {
                id: 'image',
                title: 'Image'
            },
            {
                id: 'table',
                title: 'Table',
                to: '/docs/components/table'
            },
            {
                id: 'typography',
                title: 'Typography'
            }
        ]
    },
    {
        id: 'basic-components',
        title: 'Basic Components',
        children: [
            {
                id: 'badge',
                title: 'Badge',
                to: '/docs/components/badge'
            },
            {
                id: 'button',
                title: 'Button',
                to: '/docs/components/button'
            },
            {
                id: 'button-group',
                title: 'Button Group',
                to: '/docs/components/button-group'
            },
            {
                id: 'card',
                title: 'Card',
                to: '/docs/components/card'
            },
            {
                id: 'collapsible',
                title: 'Collapsible 🚧'
            },
            {
                id: 'dropdown',
                title: 'Dropdown 🚧'
            },
            {
                id: 'icon',
                title: 'Icon',
                to: '/docs/components/icon'
            },
            {
                id: 'list-group',
                title: 'List Group 🚧'
            },
            {
                id: 'media',
                title: 'Media',
                to: '/docs/components/media'
            },
            {
                id: 'pagination',
                title: 'Pagination 🚧'
            },
            {
                id: 'progress',
                title: 'Progress 🚧'
            },
            {
                id: 'tabs',
                title: 'Tabs',
                to: '/docs/components/tabs'
            }
        ]
    },
    {
        id: 'feedback-components',
        title: 'Feedback Components',
        children: [
            {
                id: 'alert',
                title: 'Alert'
            },
            {
                id: 'loader',
                title: 'Loader'
            },
            {
                id: 'modal',
                title: 'Modal'
            },
            {
                id: 'popover',
                title: 'Popover'
            },
            {
                id: 'toast',
                title: 'Toast'
            },
            {
                id: 'tooltip',
                title: 'Tooltip'
            }
        ]
    },
    {
        id: 'navigation-components',
        title: 'Navigation Components',
        children: [
            {
                id: 'breadcrumb',
                title: 'Breadcrumb'
            },
            {
                id: 'drawer',
                title: 'Drawer'
            },
            {
                id: 'hamburger-menu',
                title: 'Hamburger Menu'
            },
            {
                id: 'nav',
                title: 'Nav'
            },
            {
                id: 'navbar',
                title: 'Navbar'
            },
            {
                id: 'sidebar',
                title: 'Sidebar'
            }
        ]
    },
    {
        id: 'form-components',
        title: 'Form Components',
        children: [
            {
                id: 'checkbox',
                title: 'Checkbox',
                children: [
                    {
                        id: 'individual',
                        title: 'Checkbox'
                    },
                    {
                        id: 'group',
                        title: 'Checkbox Group'
                    },
                    {
                        id: 'button',
                        title: 'Checkbox Button'
                    }
                ]
            },
            {
                id: 'datepicker',
                title: 'Datepicker'
            },
            {
                id: 'form',
                title: 'Form',
                children: [
                    {
                        id: 'form-group',
                        title: 'Form'
                    },
                    {
                        id: 'form-label',
                        title: 'Form Group'
                    },
                    {
                        id: 'form-error',
                        title: 'Form Label'
                    },
                    {
                        id: 'form-error',
                        title: 'Form Error'
                    }
                ]
            },
            {
                id: 'input',
                title: 'Input'
            },
            {
                id: 'number-input',
                title: 'Number Input'
            },
            {
                id: 'radio',
                title: 'Radio',
                children: [
                    {
                        id: 'group',
                        title: 'Radio Group'
                    },
                    {
                        id: 'button',
                        title: 'Radio Button'
                    }
                ]
            },
            {
                id: 'select',
                title: 'Select'
            },
            {
                id: 'toggle',
                title: 'Toggle'
            },
            {
                id: 'textarea',
                title: 'Textarea'
            }
        ]
    },
    {
        id: 'form-validation',
        title: 'Form Validation'
    }
];

export const utilitiesNavigation: NavigationItem[] = [
    {
        id: 'utilities',
        title: 'Utilities',
        children: [
            {
                id: 'tailwindcss',
                title: 'TailwindCSS Integration',
                to: '/docs/utilities/tailwindcss'
            }
        ]
    }
];

export const communityNavigation: NavigationItem[] = [
    {
        id: 'community',
        title: 'Community',
        children: [
            {
                id: 'getting-help',
                title: 'Getting Help',
                to: '/docs/getting-help'
            },
            {
                id: 'contributing',
                title: 'Contributing',
                to: '/docs/contributing'
            },
            {
                id: 'roadmap',
                title: 'Roadmap',
                to: '/docs/roadmap'
            },
            {
                id: 'license',
                title: 'License',
                to: '/docs/license'
            }
        ]
    }
];
