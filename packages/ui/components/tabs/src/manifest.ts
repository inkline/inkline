import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'TabList',
        props: [
            {
                name: 'stretch',
                type: 'boolean',
                description: 'Stretch tab list to fill container width',
                default: 'false'
            }
        ],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for tab list items'
            }
        ],
        css: {
            namespace: 'tab-list',
            variables: [
                {
                    name: '--tab-list--border-top-width'
                },
                {
                    name: '--tab-list--border-top-style'
                },
                {
                    name: '--tab-list--border-top-color'
                },
                {
                    name: '--tab-list--border-right-width'
                },
                {
                    name: '--tab-list--border-right-style'
                },
                {
                    name: '--tab-list--border-right-color'
                },
                {
                    name: '--tab-list--border-bottom-width'
                },
                {
                    name: '--tab-list--border-bottom-style'
                },
                {
                    name: '--tab-list--border-bottom-color'
                },
                {
                    name: '--tab-list--border-left-width'
                },
                {
                    name: '--tab-list--border-left-style'
                },
                {
                    name: '--tab-list--border-left-color'
                },
                {
                    name: '--tab-list--border-width'
                },
                {
                    name: '--tab-list--border-style'
                },
                {
                    name: '--tab-list--border-color'
                },
                {
                    name: '--tab-list--border-top'
                },
                {
                    name: '--tab-list--border-right'
                },
                {
                    name: '--tab-list--border-bottom'
                },
                {
                    name: '--tab-list--border-left'
                },
                {
                    name: '--tab-list--border'
                },
                {
                    name: '--tab-list--box-shadow-offset-x'
                },
                {
                    name: '--tab-list--box-shadow-offset-y'
                },
                {
                    name: '--tab-list--box-shadow-blur-radius'
                },
                {
                    name: '--tab-list--box-shadow-spread-radius'
                },
                {
                    name: '--tab-list--box-shadow-color'
                },
                {
                    name: '--tab-list--box-shadow'
                },
                {
                    name: '--tab-list--transition-property'
                },
                {
                    name: '--tab-list--transition-duration'
                },
                {
                    name: '--tab-list--transition-timing-function'
                },
                {
                    name: '--tab-list--transition'
                },
                {
                    name: '--tab-list--background'
                },
                {
                    name: '--tab-list--color'
                },
                {
                    name: '--tab-list--border-top-left-radius'
                },
                {
                    name: '--tab-list--border-top-right-radius'
                },
                {
                    name: '--tab-list--border-bottom-right-radius'
                },
                {
                    name: '--tab-list--border-bottom-left-radius'
                },
                {
                    name: '--tab-list--border-radius'
                },
                {
                    name: '--tab-list--font-size'
                },
                {
                    name: '--tab-list--padding-top'
                },
                {
                    name: '--tab-list--padding-right'
                },
                {
                    name: '--tab-list--padding-bottom'
                },
                {
                    name: '--tab-list--padding-left'
                },
                {
                    name: '--tab-list--padding'
                },
                {
                    name: '--tab-list--margin-top'
                },
                {
                    name: '--tab-list--margin-right'
                },
                {
                    name: '--tab-list--margin-bottom'
                },
                {
                    name: '--tab-list--margin-left'
                },
                {
                    name: '--tab-list--margin'
                },
                {
                    name: '--tab-list--{color}--border-top-color'
                },
                {
                    name: '--tab-list--{color}--border-right-color'
                },
                {
                    name: '--tab-list--{color}--border-bottom-color'
                },
                {
                    name: '--tab-list--{color}--border-left-color'
                },
                {
                    name: '--tab-list--{color}--background'
                },
                {
                    name: '--tab-list--{color}--color'
                },
                {
                    name: '--tab-list--{size}--border-top-left-radius'
                },
                {
                    name: '--tab-list--{size}--border-top-right-radius'
                },
                {
                    name: '--tab-list--{size}--border-bottom-right-radius'
                },
                {
                    name: '--tab-list--{size}--border-bottom-left-radius'
                },
                {
                    name: '--tab-list--{size}--font-size'
                },
                {
                    name: '--tab-list--{size}--padding-top'
                },
                {
                    name: '--tab-list--{size}--padding-right'
                },
                {
                    name: '--tab-list--{size}--padding-bottom'
                },
                {
                    name: '--tab-list--{size}--padding-left'
                },
                {
                    name: '--tab-list--{size}--margin-top'
                },
                {
                    name: '--tab-list--{size}--margin-right'
                },
                {
                    name: '--tab-list--{size}--margin-bottom'
                },
                {
                    name: '--tab-list--{size}--margin-left'
                }
            ]
        }
    },
    {
        name: 'TabPanel',
        props: [
            {
                name: 'name',
                type: 'string',
                description: 'The name of the tab panel, used as an identifier',
                default: ''
            }
        ],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for tab content'
            }
        ],
        css: {
            namespace: 'tab-panel',
            variables: [
                {
                    name: '--tab-panel--border-top-width'
                },
                {
                    name: '--tab-panel--border-top-style'
                },
                {
                    name: '--tab-panel--border-top-color'
                },
                {
                    name: '--tab-panel--border-right-width'
                },
                {
                    name: '--tab-panel--border-right-style'
                },
                {
                    name: '--tab-panel--border-right-color'
                },
                {
                    name: '--tab-panel--border-bottom-width'
                },
                {
                    name: '--tab-panel--border-bottom-style'
                },
                {
                    name: '--tab-panel--border-bottom-color'
                },
                {
                    name: '--tab-panel--border-left-width'
                },
                {
                    name: '--tab-panel--border-left-style'
                },
                {
                    name: '--tab-panel--border-left-color'
                },
                {
                    name: '--tab-panel--border-width'
                },
                {
                    name: '--tab-panel--border-style'
                },
                {
                    name: '--tab-panel--border-color'
                },
                {
                    name: '--tab-panel--border-top'
                },
                {
                    name: '--tab-panel--border-right'
                },
                {
                    name: '--tab-panel--border-bottom'
                },
                {
                    name: '--tab-panel--border-left'
                },
                {
                    name: '--tab-panel--border'
                },
                {
                    name: '--tab-panel--box-shadow-offset-x'
                },
                {
                    name: '--tab-panel--box-shadow-offset-y'
                },
                {
                    name: '--tab-panel--box-shadow-blur-radius'
                },
                {
                    name: '--tab-panel--box-shadow-spread-radius'
                },
                {
                    name: '--tab-panel--box-shadow-color'
                },
                {
                    name: '--tab-panel--box-shadow'
                },
                {
                    name: '--tab-panel--transition-property'
                },
                {
                    name: '--tab-panel--transition-duration'
                },
                {
                    name: '--tab-panel--transition-timing-function'
                },
                {
                    name: '--tab-panel--transition'
                },
                {
                    name: '--tab-panel--background'
                },
                {
                    name: '--tab-panel--color'
                },
                {
                    name: '--tab-panel--border-top-left-radius'
                },
                {
                    name: '--tab-panel--border-top-right-radius'
                },
                {
                    name: '--tab-panel--border-bottom-right-radius'
                },
                {
                    name: '--tab-panel--border-bottom-left-radius'
                },
                {
                    name: '--tab-panel--border-radius'
                },
                {
                    name: '--tab-panel--font-size'
                },
                {
                    name: '--tab-panel--padding-top'
                },
                {
                    name: '--tab-panel--padding-right'
                },
                {
                    name: '--tab-panel--padding-bottom'
                },
                {
                    name: '--tab-panel--padding-left'
                },
                {
                    name: '--tab-panel--padding'
                },
                {
                    name: '--tab-panel--{color}--border-top-color'
                },
                {
                    name: '--tab-panel--{color}--border-right-color'
                },
                {
                    name: '--tab-panel--{color}--border-bottom-color'
                },
                {
                    name: '--tab-panel--{color}--border-left-color'
                },
                {
                    name: '--tab-panel--{color}--background'
                },
                {
                    name: '--tab-panel--{color}--color'
                },
                {
                    name: '--tab-panel--{size}--border-top-left-radius'
                },
                {
                    name: '--tab-panel--{size}--border-top-right-radius'
                },
                {
                    name: '--tab-panel--{size}--border-bottom-right-radius'
                },
                {
                    name: '--tab-panel--{size}--border-bottom-left-radius'
                },
                {
                    name: '--tab-panel--{size}--font-size'
                },
                {
                    name: '--tab-panel--{size}--padding-top'
                },
                {
                    name: '--tab-panel--{size}--padding-right'
                },
                {
                    name: '--tab-panel--{size}--padding-bottom'
                },
                {
                    name: '--tab-panel--{size}--padding-left'
                }
            ]
        }
    },
    {
        name: 'Tab',
        props: [
            {
                name: 'name',
                type: 'string',
                description: 'The name of the referenced tab',
                default: ''
            }
        ],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for tab content'
            }
        ],
        css: {
            namespace: 'tab',
            variables: [
                {
                    name: '--tab--border-top-width'
                },
                {
                    name: '--tab--border-top-style'
                },
                {
                    name: '--tab--border-top-color'
                },
                {
                    name: '--tab--border-right-width'
                },
                {
                    name: '--tab--border-right-style'
                },
                {
                    name: '--tab--border-right-color'
                },
                {
                    name: '--tab--border-bottom-width'
                },
                {
                    name: '--tab--border-bottom-style'
                },
                {
                    name: '--tab--border-bottom-color'
                },
                {
                    name: '--tab--border-left-width'
                },
                {
                    name: '--tab--border-left-style'
                },
                {
                    name: '--tab--border-left-color'
                },
                {
                    name: '--tab--border-width'
                },
                {
                    name: '--tab--border-style'
                },
                {
                    name: '--tab--border-color'
                },
                {
                    name: '--tab--border-top'
                },
                {
                    name: '--tab--border-right'
                },
                {
                    name: '--tab--border-bottom'
                },
                {
                    name: '--tab--border-left'
                },
                {
                    name: '--tab--border'
                },
                {
                    name: '--tab--box-shadow-offset-x'
                },
                {
                    name: '--tab--box-shadow-offset-y'
                },
                {
                    name: '--tab--box-shadow-blur-radius'
                },
                {
                    name: '--tab--box-shadow-spread-radius'
                },
                {
                    name: '--tab--box-shadow-color'
                },
                {
                    name: '--tab--box-shadow'
                },
                {
                    name: '--tab--transition-property'
                },
                {
                    name: '--tab--transition-duration'
                },
                {
                    name: '--tab--transition-timing-function'
                },
                {
                    name: '--tab--transition'
                },
                {
                    name: '--tab--active--font-weight'
                },
                {
                    name: '--tab--active--border-top-width'
                },
                {
                    name: '--tab--active--border-top-style'
                },
                {
                    name: '--tab--active--border-top-color'
                },
                {
                    name: '--tab--active--border-right-width'
                },
                {
                    name: '--tab--active--border-right-style'
                },
                {
                    name: '--tab--active--border-right-color'
                },
                {
                    name: '--tab--active--border-bottom-width'
                },
                {
                    name: '--tab--active--border-bottom-style'
                },
                {
                    name: '--tab--active--border-bottom-color'
                },
                {
                    name: '--tab--active--border-left-width'
                },
                {
                    name: '--tab--active--border-left-style'
                },
                {
                    name: '--tab--active--border-left-color'
                },
                {
                    name: '--tab--active--border-width'
                },
                {
                    name: '--tab--active--border-style'
                },
                {
                    name: '--tab--active--border-color'
                },
                {
                    name: '--tab--active--border-top'
                },
                {
                    name: '--tab--active--border-right'
                },
                {
                    name: '--tab--active--border-bottom'
                },
                {
                    name: '--tab--active--border-left'
                },
                {
                    name: '--tab--active--border'
                },
                {
                    name: '--tab--active--background'
                },
                {
                    name: '--tab--background'
                },
                {
                    name: '--tab--color'
                },
                {
                    name: '--tab--hover--border-top-width'
                },
                {
                    name: '--tab--hover--border-top-style'
                },
                {
                    name: '--tab--hover--border-top-color'
                },
                {
                    name: '--tab--hover--border-right-width'
                },
                {
                    name: '--tab--hover--border-right-style'
                },
                {
                    name: '--tab--hover--border-right-color'
                },
                {
                    name: '--tab--hover--border-bottom-width'
                },
                {
                    name: '--tab--hover--border-bottom-style'
                },
                {
                    name: '--tab--hover--border-bottom-color'
                },
                {
                    name: '--tab--hover--border-left-width'
                },
                {
                    name: '--tab--hover--border-left-style'
                },
                {
                    name: '--tab--hover--border-left-color'
                },
                {
                    name: '--tab--hover--border-width'
                },
                {
                    name: '--tab--hover--border-style'
                },
                {
                    name: '--tab--hover--border-color'
                },
                {
                    name: '--tab--hover--border-top'
                },
                {
                    name: '--tab--hover--border-right'
                },
                {
                    name: '--tab--hover--border-bottom'
                },
                {
                    name: '--tab--hover--border-left'
                },
                {
                    name: '--tab--hover--border'
                },
                {
                    name: '--tab--hover--background'
                },
                {
                    name: '--tab--focus--border-top-width'
                },
                {
                    name: '--tab--focus--border-top-style'
                },
                {
                    name: '--tab--focus--border-top-color'
                },
                {
                    name: '--tab--focus--border-right-width'
                },
                {
                    name: '--tab--focus--border-right-style'
                },
                {
                    name: '--tab--focus--border-right-color'
                },
                {
                    name: '--tab--focus--border-bottom-width'
                },
                {
                    name: '--tab--focus--border-bottom-style'
                },
                {
                    name: '--tab--focus--border-bottom-color'
                },
                {
                    name: '--tab--focus--border-left-width'
                },
                {
                    name: '--tab--focus--border-left-style'
                },
                {
                    name: '--tab--focus--border-left-color'
                },
                {
                    name: '--tab--focus--border-width'
                },
                {
                    name: '--tab--focus--border-style'
                },
                {
                    name: '--tab--focus--border-color'
                },
                {
                    name: '--tab--focus--border-top'
                },
                {
                    name: '--tab--focus--border-right'
                },
                {
                    name: '--tab--focus--border-bottom'
                },
                {
                    name: '--tab--focus--border-left'
                },
                {
                    name: '--tab--focus--border'
                },
                {
                    name: '--tab--focus--background'
                },
                {
                    name: '--tab--border-top-left-radius'
                },
                {
                    name: '--tab--border-top-right-radius'
                },
                {
                    name: '--tab--border-bottom-right-radius'
                },
                {
                    name: '--tab--border-bottom-left-radius'
                },
                {
                    name: '--tab--border-radius'
                },
                {
                    name: '--tab--font-size'
                },
                {
                    name: '--tab--padding-top'
                },
                {
                    name: '--tab--padding-right'
                },
                {
                    name: '--tab--padding-bottom'
                },
                {
                    name: '--tab--padding-left'
                },
                {
                    name: '--tab--padding'
                },
                {
                    name: '--tab--{color}--border-top-color'
                },
                {
                    name: '--tab--{color}--border-right-color'
                },
                {
                    name: '--tab--{color}--border-bottom-color'
                },
                {
                    name: '--tab--{color}--border-left-color'
                },
                {
                    name: '--tab--{color}--background'
                },
                {
                    name: '--tab--{color}--color'
                },
                {
                    name: '--tab--{color}--active--border-top-color'
                },
                {
                    name: '--tab--{color}--active--border-right-color'
                },
                {
                    name: '--tab--{color}--active--border-bottom-color'
                },
                {
                    name: '--tab--{color}--active--border-left-color'
                },
                {
                    name: '--tab--{color}--active--background'
                },
                {
                    name: '--tab--{color}--hover--border-top-color'
                },
                {
                    name: '--tab--{color}--hover--border-right-color'
                },
                {
                    name: '--tab--{color}--hover--border-bottom-color'
                },
                {
                    name: '--tab--{color}--hover--border-left-color'
                },
                {
                    name: '--tab--{color}--hover--background'
                },
                {
                    name: '--tab--{color}--focus--border-top-color'
                },
                {
                    name: '--tab--{color}--focus--border-right-color'
                },
                {
                    name: '--tab--{color}--focus--border-bottom-color'
                },
                {
                    name: '--tab--{color}--focus--border-left-color'
                },
                {
                    name: '--tab--{color}--focus--background'
                },
                {
                    name: '--tab--{size}--border-top-left-radius'
                },
                {
                    name: '--tab--{size}--border-top-right-radius'
                },
                {
                    name: '--tab--{size}--border-bottom-right-radius'
                },
                {
                    name: '--tab--{size}--border-bottom-left-radius'
                },
                {
                    name: '--tab--{size}--font-size'
                },
                {
                    name: '--tab--{size}--padding-top'
                },
                {
                    name: '--tab--{size}--padding-right'
                },
                {
                    name: '--tab--{size}--padding-bottom'
                },
                {
                    name: '--tab--{size}--padding-left'
                }
            ]
        }
    },
    {
        name: 'Tabs',
        props: [
            {
                name: 'color',
                type: "'light' | 'dark'",
                description: 'The color variant of the tabs',
                default: ''
            },
            {
                name: 'modelValue',
                type: 'string',
                description: 'Used to set the currently active tab',
                default: ''
            },
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                description: 'The size variant of the tabs',
                default: ''
            },
            {
                name: 'seo',
                type: 'boolean',
                description:
                    'Delay the hiding of the tab content to allow for crawling by search engines',
                default: 'true'
            }
        ],
        events: [
            {
                name: 'Tabs',
                description: 'Event emitted for setting the modelValue'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Slot for tab components'
            }
        ],
        css: {
            namespace: '',
            variables: []
        }
    },
    {
        css: {
            namespace: '',
            variables: [
                {
                    name: '--tab--border-top-width'
                },
                {
                    name: '--tab--border-top-style'
                },
                {
                    name: '--tab--border-top-color'
                },
                {
                    name: '--tab--border-right-width'
                },
                {
                    name: '--tab--border-right-style'
                },
                {
                    name: '--tab--border-right-color'
                },
                {
                    name: '--tab--border-bottom-width'
                },
                {
                    name: '--tab--border-bottom-style'
                },
                {
                    name: '--tab--border-bottom-color'
                },
                {
                    name: '--tab--border-left-width'
                },
                {
                    name: '--tab--border-left-style'
                },
                {
                    name: '--tab--border-left-color'
                },
                {
                    name: '--tab--border-width'
                },
                {
                    name: '--tab--border-style'
                },
                {
                    name: '--tab--border-color'
                },
                {
                    name: '--tab--border-top'
                },
                {
                    name: '--tab--border-right'
                },
                {
                    name: '--tab--border-bottom'
                },
                {
                    name: '--tab--border-left'
                },
                {
                    name: '--tab--border'
                },
                {
                    name: '--tab--box-shadow-offset-x'
                },
                {
                    name: '--tab--box-shadow-offset-y'
                },
                {
                    name: '--tab--box-shadow-blur-radius'
                },
                {
                    name: '--tab--box-shadow-spread-radius'
                },
                {
                    name: '--tab--box-shadow-color'
                },
                {
                    name: '--tab--box-shadow'
                },
                {
                    name: '--tab--transition-property'
                },
                {
                    name: '--tab--transition-duration'
                },
                {
                    name: '--tab--transition-timing-function'
                },
                {
                    name: '--tab--transition'
                },
                {
                    name: '--tab--active--font-weight'
                },
                {
                    name: '--tab--active--border-top-width'
                },
                {
                    name: '--tab--active--border-top-style'
                },
                {
                    name: '--tab--active--border-top-color'
                },
                {
                    name: '--tab--active--border-right-width'
                },
                {
                    name: '--tab--active--border-right-style'
                },
                {
                    name: '--tab--active--border-right-color'
                },
                {
                    name: '--tab--active--border-bottom-width'
                },
                {
                    name: '--tab--active--border-bottom-style'
                },
                {
                    name: '--tab--active--border-bottom-color'
                },
                {
                    name: '--tab--active--border-left-width'
                },
                {
                    name: '--tab--active--border-left-style'
                },
                {
                    name: '--tab--active--border-left-color'
                },
                {
                    name: '--tab--active--border-width'
                },
                {
                    name: '--tab--active--border-style'
                },
                {
                    name: '--tab--active--border-color'
                },
                {
                    name: '--tab--active--border-top'
                },
                {
                    name: '--tab--active--border-right'
                },
                {
                    name: '--tab--active--border-bottom'
                },
                {
                    name: '--tab--active--border-left'
                },
                {
                    name: '--tab--active--border'
                },
                {
                    name: '--tab--active--background'
                },
                {
                    name: '--tab--background'
                },
                {
                    name: '--tab--color'
                },
                {
                    name: '--tab--hover--border-top-width'
                },
                {
                    name: '--tab--hover--border-top-style'
                },
                {
                    name: '--tab--hover--border-top-color'
                },
                {
                    name: '--tab--hover--border-right-width'
                },
                {
                    name: '--tab--hover--border-right-style'
                },
                {
                    name: '--tab--hover--border-right-color'
                },
                {
                    name: '--tab--hover--border-bottom-width'
                },
                {
                    name: '--tab--hover--border-bottom-style'
                },
                {
                    name: '--tab--hover--border-bottom-color'
                },
                {
                    name: '--tab--hover--border-left-width'
                },
                {
                    name: '--tab--hover--border-left-style'
                },
                {
                    name: '--tab--hover--border-left-color'
                },
                {
                    name: '--tab--hover--border-width'
                },
                {
                    name: '--tab--hover--border-style'
                },
                {
                    name: '--tab--hover--border-color'
                },
                {
                    name: '--tab--hover--border-top'
                },
                {
                    name: '--tab--hover--border-right'
                },
                {
                    name: '--tab--hover--border-bottom'
                },
                {
                    name: '--tab--hover--border-left'
                },
                {
                    name: '--tab--hover--border'
                },
                {
                    name: '--tab--hover--background'
                },
                {
                    name: '--tab--focus--border-top-width'
                },
                {
                    name: '--tab--focus--border-top-style'
                },
                {
                    name: '--tab--focus--border-top-color'
                },
                {
                    name: '--tab--focus--border-right-width'
                },
                {
                    name: '--tab--focus--border-right-style'
                },
                {
                    name: '--tab--focus--border-right-color'
                },
                {
                    name: '--tab--focus--border-bottom-width'
                },
                {
                    name: '--tab--focus--border-bottom-style'
                },
                {
                    name: '--tab--focus--border-bottom-color'
                },
                {
                    name: '--tab--focus--border-left-width'
                },
                {
                    name: '--tab--focus--border-left-style'
                },
                {
                    name: '--tab--focus--border-left-color'
                },
                {
                    name: '--tab--focus--border-width'
                },
                {
                    name: '--tab--focus--border-style'
                },
                {
                    name: '--tab--focus--border-color'
                },
                {
                    name: '--tab--focus--border-top'
                },
                {
                    name: '--tab--focus--border-right'
                },
                {
                    name: '--tab--focus--border-bottom'
                },
                {
                    name: '--tab--focus--border-left'
                },
                {
                    name: '--tab--focus--border'
                },
                {
                    name: '--tab--focus--background'
                },
                {
                    name: '--tab--border-top-left-radius'
                },
                {
                    name: '--tab--border-top-right-radius'
                },
                {
                    name: '--tab--border-bottom-right-radius'
                },
                {
                    name: '--tab--border-bottom-left-radius'
                },
                {
                    name: '--tab--border-radius'
                },
                {
                    name: '--tab--font-size'
                },
                {
                    name: '--tab--padding-top'
                },
                {
                    name: '--tab--padding-right'
                },
                {
                    name: '--tab--padding-bottom'
                },
                {
                    name: '--tab--padding-left'
                },
                {
                    name: '--tab--padding'
                },
                {
                    name: '--tab-panel--border-top-width'
                },
                {
                    name: '--tab-panel--border-top-style'
                },
                {
                    name: '--tab-panel--border-top-color'
                },
                {
                    name: '--tab-panel--border-right-width'
                },
                {
                    name: '--tab-panel--border-right-style'
                },
                {
                    name: '--tab-panel--border-right-color'
                },
                {
                    name: '--tab-panel--border-bottom-width'
                },
                {
                    name: '--tab-panel--border-bottom-style'
                },
                {
                    name: '--tab-panel--border-bottom-color'
                },
                {
                    name: '--tab-panel--border-left-width'
                },
                {
                    name: '--tab-panel--border-left-style'
                },
                {
                    name: '--tab-panel--border-left-color'
                },
                {
                    name: '--tab-panel--border-width'
                },
                {
                    name: '--tab-panel--border-style'
                },
                {
                    name: '--tab-panel--border-color'
                },
                {
                    name: '--tab-panel--border-top'
                },
                {
                    name: '--tab-panel--border-right'
                },
                {
                    name: '--tab-panel--border-bottom'
                },
                {
                    name: '--tab-panel--border-left'
                },
                {
                    name: '--tab-panel--border'
                },
                {
                    name: '--tab-panel--box-shadow-offset-x'
                },
                {
                    name: '--tab-panel--box-shadow-offset-y'
                },
                {
                    name: '--tab-panel--box-shadow-blur-radius'
                },
                {
                    name: '--tab-panel--box-shadow-spread-radius'
                },
                {
                    name: '--tab-panel--box-shadow-color'
                },
                {
                    name: '--tab-panel--box-shadow'
                },
                {
                    name: '--tab-panel--transition-property'
                },
                {
                    name: '--tab-panel--transition-duration'
                },
                {
                    name: '--tab-panel--transition-timing-function'
                },
                {
                    name: '--tab-panel--transition'
                },
                {
                    name: '--tab-panel--background'
                },
                {
                    name: '--tab-panel--color'
                },
                {
                    name: '--tab-panel--border-top-left-radius'
                },
                {
                    name: '--tab-panel--border-top-right-radius'
                },
                {
                    name: '--tab-panel--border-bottom-right-radius'
                },
                {
                    name: '--tab-panel--border-bottom-left-radius'
                },
                {
                    name: '--tab-panel--border-radius'
                },
                {
                    name: '--tab-panel--font-size'
                },
                {
                    name: '--tab-panel--padding-top'
                },
                {
                    name: '--tab-panel--padding-right'
                },
                {
                    name: '--tab-panel--padding-bottom'
                },
                {
                    name: '--tab-panel--padding-left'
                },
                {
                    name: '--tab-panel--padding'
                }
            ]
        }
    }
];

export default manifest;
