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
                    name: '--tab-list--border-top-width',
                    value: 'var(--border-top-width)'
                },
                {
                    name: '--tab-list--border-top-style',
                    value: 'var(--border-top-style)'
                },
                {
                    name: '--tab-list--border-top-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab-list--border-right-width',
                    value: 'var(--border-right-width)'
                },
                {
                    name: '--tab-list--border-right-style',
                    value: 'var(--border-right-style)'
                },
                {
                    name: '--tab-list--border-right-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab-list--border-bottom-width',
                    value: 'var(--border-bottom-width)'
                },
                {
                    name: '--tab-list--border-bottom-style',
                    value: 'var(--border-bottom-style)'
                },
                {
                    name: '--tab-list--border-bottom-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab-list--border-left-width',
                    value: 'var(--border-left-width)'
                },
                {
                    name: '--tab-list--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--tab-list--border-left-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab-list--border-width',
                    value: 'var(--tab-list--border-top-width) var(--tab-list--border-right-width) var(--tab-list--border-bottom-width) var(--tab-list--border-left-width)'
                },
                {
                    name: '--tab-list--border-style',
                    value: 'var(--tab-list--border-top-style) var(--tab-list--border-right-style) var(--tab-list--border-bottom-style) var(--tab-list--border-left-style)'
                },
                {
                    name: '--tab-list--border-color',
                    value: 'var(--tab-list--border-top-color) var(--tab-list--border-right-color) var(--tab-list--border-bottom-color) var(--tab-list--border-left-color)'
                },
                {
                    name: '--tab-list--border-top',
                    value: 'var(--tab-list--border-top-width) var(--tab-list--border-top-style) var(--tab-list--border-top-color)'
                },
                {
                    name: '--tab-list--border-right',
                    value: 'var(--tab-list--border-right-width) var(--tab-list--border-right-style) var(--tab-list--border-right-color)'
                },
                {
                    name: '--tab-list--border-bottom',
                    value: 'var(--tab-list--border-bottom-width) var(--tab-list--border-bottom-style) var(--tab-list--border-bottom-color)'
                },
                {
                    name: '--tab-list--border-left',
                    value: 'var(--tab-list--border-left-width) var(--tab-list--border-left-style) var(--tab-list--border-left-color)'
                },
                {
                    name: '--tab-list--border',
                    value: 'var(--tab-list--border-top-width) var(--tab-list--border-top-style) var(--tab-list--border-top-color)'
                },
                {
                    name: '--tab-list--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--tab-list--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--tab-list--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--tab-list--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--tab-list--box-shadow-color',
                    value: 'var(--box-shadow-color)'
                },
                {
                    name: '--tab-list--box-shadow',
                    value: 'var(--tab-list--box-shadow-offset-x) var(--tab-list--box-shadow-offset-y) var(--tab-list--box-shadow-blur-radius) var(--tab-list--box-shadow-spread-radius) var(--tab-list--box-shadow-color)'
                },
                {
                    name: '--tab-list--transition-property',
                    value: 'var(--transition-property)'
                },
                {
                    name: '--tab-list--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--tab-list--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--tab-list--transition',
                    value: 'var(--tab-list--transition-property) var(--tab-list--transition-duration) var(--tab-list--transition-timing-function)'
                },
                {
                    name: '--tab-list--background',
                    value: 'var(--color-white)'
                },
                {
                    name: '--tab-list--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--tab-list--border-top-left-radius',
                    value: 'var(--border-top-left-radius-md)'
                },
                {
                    name: '--tab-list--border-top-right-radius',
                    value: 'var(--border-top-right-radius-md)'
                },
                {
                    name: '--tab-list--border-bottom-right-radius',
                    value: 'var(--border-bottom-right-radius-md)'
                },
                {
                    name: '--tab-list--border-bottom-left-radius',
                    value: 'var(--border-bottom-left-radius-md)'
                },
                {
                    name: '--tab-list--border-radius',
                    value: 'var(--tab-list--border-top-left-radius) var(--tab-list--border-top-right-radius) var(--tab-list--border-bottom-right-radius) var(--tab-list--border-bottom-left-radius)'
                },
                {
                    name: '--tab-list--font-size',
                    value: 'var(--font-size-md)'
                },
                {
                    name: '--tab-list--padding-top',
                    value: '0'
                },
                {
                    name: '--tab-list--padding-right',
                    value: '0'
                },
                {
                    name: '--tab-list--padding-bottom',
                    value: '0'
                },
                {
                    name: '--tab-list--padding-left',
                    value: '0'
                },
                {
                    name: '--tab-list--padding',
                    value: '0'
                },
                {
                    name: '--tab-list--margin-top',
                    value: '0'
                },
                {
                    name: '--tab-list--margin-right',
                    value: '0'
                },
                {
                    name: '--tab-list--margin-bottom',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--tab-list--margin-left',
                    value: '0'
                },
                {
                    name: '--tab-list--margin',
                    value: 'var(--tab-list--margin-top) var(--tab-list--margin-right) var(--tab-list--margin-bottom) var(--tab-list--margin-left)'
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
                    name: '--tab-panel--border-top-width',
                    value: 'var(--border-top-width)'
                },
                {
                    name: '--tab-panel--border-top-style',
                    value: 'var(--border-top-style)'
                },
                {
                    name: '--tab-panel--border-top-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab-panel--border-right-width',
                    value: 'var(--border-right-width)'
                },
                {
                    name: '--tab-panel--border-right-style',
                    value: 'var(--border-right-style)'
                },
                {
                    name: '--tab-panel--border-right-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab-panel--border-bottom-width',
                    value: 'var(--border-bottom-width)'
                },
                {
                    name: '--tab-panel--border-bottom-style',
                    value: 'var(--border-bottom-style)'
                },
                {
                    name: '--tab-panel--border-bottom-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab-panel--border-left-width',
                    value: 'var(--border-left-width)'
                },
                {
                    name: '--tab-panel--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--tab-panel--border-left-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab-panel--border-width',
                    value: 'var(--tab-panel--border-top-width) var(--tab-panel--border-right-width) var(--tab-panel--border-bottom-width) var(--tab-panel--border-left-width)'
                },
                {
                    name: '--tab-panel--border-style',
                    value: 'var(--tab-panel--border-top-style) var(--tab-panel--border-right-style) var(--tab-panel--border-bottom-style) var(--tab-panel--border-left-style)'
                },
                {
                    name: '--tab-panel--border-color',
                    value: 'var(--tab-panel--border-top-color) var(--tab-panel--border-right-color) var(--tab-panel--border-bottom-color) var(--tab-panel--border-left-color)'
                },
                {
                    name: '--tab-panel--border-top',
                    value: 'var(--tab-panel--border-top-width) var(--tab-panel--border-top-style) var(--tab-panel--border-top-color)'
                },
                {
                    name: '--tab-panel--border-right',
                    value: 'var(--tab-panel--border-right-width) var(--tab-panel--border-right-style) var(--tab-panel--border-right-color)'
                },
                {
                    name: '--tab-panel--border-bottom',
                    value: 'var(--tab-panel--border-bottom-width) var(--tab-panel--border-bottom-style) var(--tab-panel--border-bottom-color)'
                },
                {
                    name: '--tab-panel--border-left',
                    value: 'var(--tab-panel--border-left-width) var(--tab-panel--border-left-style) var(--tab-panel--border-left-color)'
                },
                {
                    name: '--tab-panel--border',
                    value: 'var(--tab-panel--border-top-width) var(--tab-panel--border-top-style) var(--tab-panel--border-top-color)'
                },
                {
                    name: '--tab-panel--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--tab-panel--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--tab-panel--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--tab-panel--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--tab-panel--box-shadow-color',
                    value: 'var(--box-shadow-color)'
                },
                {
                    name: '--tab-panel--box-shadow',
                    value: 'var(--tab-panel--box-shadow-offset-x) var(--tab-panel--box-shadow-offset-y) var(--tab-panel--box-shadow-blur-radius) var(--tab-panel--box-shadow-spread-radius) var(--tab-panel--box-shadow-color)'
                },
                {
                    name: '--tab-panel--transition-property',
                    value: 'var(--transition-property)'
                },
                {
                    name: '--tab-panel--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--tab-panel--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--tab-panel--transition',
                    value: 'var(--tab-panel--transition-property) var(--tab-panel--transition-duration) var(--tab-panel--transition-timing-function)'
                },
                {
                    name: '--tab-panel--background',
                    value: 'var(--color-white)'
                },
                {
                    name: '--tab-panel--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--tab-panel--border-top-left-radius',
                    value: 'var(--border-top-left-radius-md)'
                },
                {
                    name: '--tab-panel--border-top-right-radius',
                    value: 'var(--border-top-right-radius-md)'
                },
                {
                    name: '--tab-panel--border-bottom-right-radius',
                    value: 'var(--border-bottom-right-radius-md)'
                },
                {
                    name: '--tab-panel--border-bottom-left-radius',
                    value: 'var(--border-bottom-left-radius-md)'
                },
                {
                    name: '--tab-panel--border-radius',
                    value: 'var(--tab-panel--border-top-left-radius) var(--tab-panel--border-top-right-radius) var(--tab-panel--border-bottom-right-radius) var(--tab-panel--border-bottom-left-radius)'
                },
                {
                    name: '--tab-panel--font-size',
                    value: 'var(--font-size-md)'
                },
                {
                    name: '--tab-panel--padding-top',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--tab-panel--padding-right',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--tab-panel--padding-bottom',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--tab-panel--padding-left',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--tab-panel--padding',
                    value: 'var(--tab-panel--padding-top) var(--tab-panel--padding-right) var(--tab-panel--padding-bottom) var(--tab-panel--padding-left)'
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
                description: 'The name of the referenced tab panel',
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
                    name: '--tab--border-top-width',
                    value: '0'
                },
                {
                    name: '--tab--border-top-style',
                    value: 'var(--border-top-style)'
                },
                {
                    name: '--tab--border-top-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--border-right-width',
                    value: 'var(--border-right-width)'
                },
                {
                    name: '--tab--border-right-style',
                    value: 'var(--border-right-style)'
                },
                {
                    name: '--tab--border-right-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--tab--border-bottom-style',
                    value: 'var(--border-bottom-style)'
                },
                {
                    name: '--tab--border-bottom-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--border-left-width',
                    value: '0'
                },
                {
                    name: '--tab--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--tab--border-left-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--border-width',
                    value: 'var(--tab--border-top-width) var(--tab--border-right-width) var(--tab--border-bottom-width) var(--tab--border-left-width)'
                },
                {
                    name: '--tab--border-style',
                    value: 'var(--tab--border-top-style) var(--tab--border-right-style) var(--tab--border-bottom-style) var(--tab--border-left-style)'
                },
                {
                    name: '--tab--border-color',
                    value: 'var(--tab--border-top-color) var(--tab--border-right-color) var(--tab--border-bottom-color) var(--tab--border-left-color)'
                },
                {
                    name: '--tab--border-top',
                    value: 'var(--tab--border-top-width) var(--tab--border-top-style) var(--tab--border-top-color)'
                },
                {
                    name: '--tab--border-right',
                    value: 'var(--tab--border-right-width) var(--tab--border-right-style) var(--tab--border-right-color)'
                },
                {
                    name: '--tab--border-bottom',
                    value: 'var(--tab--border-bottom-width) var(--tab--border-bottom-style) var(--tab--border-bottom-color)'
                },
                {
                    name: '--tab--border-left',
                    value: 'var(--tab--border-left-width) var(--tab--border-left-style) var(--tab--border-left-color)'
                },
                {
                    name: '--tab--border',
                    value: 'var(--tab--border-top-width) var(--tab--border-top-style) var(--tab--border-top-color)'
                },
                {
                    name: '--tab--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--tab--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--tab--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--tab--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--tab--box-shadow-color',
                    value: 'var(--box-shadow-color)'
                },
                {
                    name: '--tab--box-shadow',
                    value: 'var(--tab--box-shadow-offset-x) var(--tab--box-shadow-offset-y) var(--tab--box-shadow-blur-radius) var(--tab--box-shadow-spread-radius) var(--tab--box-shadow-color)'
                },
                {
                    name: '--tab--transition-property',
                    value: 'var(--transition-property)'
                },
                {
                    name: '--tab--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--tab--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--tab--transition',
                    value: 'var(--tab--transition-property) var(--tab--transition-duration) var(--tab--transition-timing-function)'
                },
                {
                    name: '--tab--active--font-weight',
                    value: 'var(--font-weight-semibold)'
                },
                {
                    name: '--tab--active--border-top-width',
                    value: '0'
                },
                {
                    name: '--tab--active--border-top-style',
                    value: 'none'
                },
                {
                    name: '--tab--active--border-top-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--active--border-right-width',
                    value: '0'
                },
                {
                    name: '--tab--active--border-right-style',
                    value: 'none'
                },
                {
                    name: '--tab--active--border-right-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--active--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--tab--active--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--tab--active--border-bottom-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--active--border-left-width',
                    value: '0'
                },
                {
                    name: '--tab--active--border-left-style',
                    value: 'none'
                },
                {
                    name: '--tab--active--border-left-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--active--border-width',
                    value: 'var(--tab--active--border-top-width) var(--tab--active--border-right-width) var(--tab--active--border-bottom-width) var(--tab--active--border-left-width)'
                },
                {
                    name: '--tab--active--border-style',
                    value: 'var(--tab--active--border-top-style) var(--tab--active--border-right-style) var(--tab--active--border-bottom-style) var(--tab--active--border-left-style)'
                },
                {
                    name: '--tab--active--border-color',
                    value: 'var(--tab--active--border-top-color) var(--tab--active--border-right-color) var(--tab--active--border-bottom-color) var(--tab--active--border-left-color)'
                },
                {
                    name: '--tab--active--border-top',
                    value: 'var(--tab--active--border-top-width) var(--tab--active--border-top-style) var(--tab--active--border-top-color)'
                },
                {
                    name: '--tab--active--border-right',
                    value: 'var(--tab--active--border-right-width) var(--tab--active--border-right-style) var(--tab--active--border-right-color)'
                },
                {
                    name: '--tab--active--border-bottom',
                    value: 'var(--tab--active--border-bottom-width) var(--tab--active--border-bottom-style) var(--tab--active--border-bottom-color)'
                },
                {
                    name: '--tab--active--border-left',
                    value: 'var(--tab--active--border-left-width) var(--tab--active--border-left-style) var(--tab--active--border-left-color)'
                },
                {
                    name: '--tab--active--border',
                    value: 'var(--tab--active--border-top-width) var(--tab--active--border-top-style) var(--tab--active--border-top-color)'
                },
                {
                    name: '--tab--active--background',
                    value: 'var(--color-light-tint-50)'
                },
                {
                    name: '--tab--background',
                    value: 'var(--color-white)'
                },
                {
                    name: '--tab--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--tab--hover--border-top-width',
                    value: '0'
                },
                {
                    name: '--tab--hover--border-top-style',
                    value: 'none'
                },
                {
                    name: '--tab--hover--border-top-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--hover--border-right-width',
                    value: '0'
                },
                {
                    name: '--tab--hover--border-right-style',
                    value: 'none'
                },
                {
                    name: '--tab--hover--border-right-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--hover--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--tab--hover--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--tab--hover--border-bottom-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--hover--border-left-width',
                    value: '0'
                },
                {
                    name: '--tab--hover--border-left-style',
                    value: 'none'
                },
                {
                    name: '--tab--hover--border-left-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--hover--border-width',
                    value: 'var(--tab--hover--border-top-width) var(--tab--hover--border-right-width) var(--tab--hover--border-bottom-width) var(--tab--hover--border-left-width)'
                },
                {
                    name: '--tab--hover--border-style',
                    value: 'var(--tab--hover--border-top-style) var(--tab--hover--border-right-style) var(--tab--hover--border-bottom-style) var(--tab--hover--border-left-style)'
                },
                {
                    name: '--tab--hover--border-color',
                    value: 'var(--tab--hover--border-top-color) var(--tab--hover--border-right-color) var(--tab--hover--border-bottom-color) var(--tab--hover--border-left-color)'
                },
                {
                    name: '--tab--hover--border-top',
                    value: 'var(--tab--hover--border-top-width) var(--tab--hover--border-top-style) var(--tab--hover--border-top-color)'
                },
                {
                    name: '--tab--hover--border-right',
                    value: 'var(--tab--hover--border-right-width) var(--tab--hover--border-right-style) var(--tab--hover--border-right-color)'
                },
                {
                    name: '--tab--hover--border-bottom',
                    value: 'var(--tab--hover--border-bottom-width) var(--tab--hover--border-bottom-style) var(--tab--hover--border-bottom-color)'
                },
                {
                    name: '--tab--hover--border-left',
                    value: 'var(--tab--hover--border-left-width) var(--tab--hover--border-left-style) var(--tab--hover--border-left-color)'
                },
                {
                    name: '--tab--hover--border',
                    value: 'var(--tab--hover--border-top-width) var(--tab--hover--border-top-style) var(--tab--hover--border-top-color)'
                },
                {
                    name: '--tab--hover--background',
                    value: 'var(--color-light-tint-50)'
                },
                {
                    name: '--tab--focus--border-top-width',
                    value: '0'
                },
                {
                    name: '--tab--focus--border-top-style',
                    value: 'none'
                },
                {
                    name: '--tab--focus--border-top-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--focus--border-right-width',
                    value: '0'
                },
                {
                    name: '--tab--focus--border-right-style',
                    value: 'none'
                },
                {
                    name: '--tab--focus--border-right-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--focus--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--tab--focus--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--tab--focus--border-bottom-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--focus--border-left-width',
                    value: '0'
                },
                {
                    name: '--tab--focus--border-left-style',
                    value: 'none'
                },
                {
                    name: '--tab--focus--border-left-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--focus--border-width',
                    value: 'var(--tab--focus--border-top-width) var(--tab--focus--border-right-width) var(--tab--focus--border-bottom-width) var(--tab--focus--border-left-width)'
                },
                {
                    name: '--tab--focus--border-style',
                    value: 'var(--tab--focus--border-top-style) var(--tab--focus--border-right-style) var(--tab--focus--border-bottom-style) var(--tab--focus--border-left-style)'
                },
                {
                    name: '--tab--focus--border-color',
                    value: 'var(--tab--focus--border-top-color) var(--tab--focus--border-right-color) var(--tab--focus--border-bottom-color) var(--tab--focus--border-left-color)'
                },
                {
                    name: '--tab--focus--border-top',
                    value: 'var(--tab--focus--border-top-width) var(--tab--focus--border-top-style) var(--tab--focus--border-top-color)'
                },
                {
                    name: '--tab--focus--border-right',
                    value: 'var(--tab--focus--border-right-width) var(--tab--focus--border-right-style) var(--tab--focus--border-right-color)'
                },
                {
                    name: '--tab--focus--border-bottom',
                    value: 'var(--tab--focus--border-bottom-width) var(--tab--focus--border-bottom-style) var(--tab--focus--border-bottom-color)'
                },
                {
                    name: '--tab--focus--border-left',
                    value: 'var(--tab--focus--border-left-width) var(--tab--focus--border-left-style) var(--tab--focus--border-left-color)'
                },
                {
                    name: '--tab--focus--border',
                    value: 'var(--tab--focus--border-top-width) var(--tab--focus--border-top-style) var(--tab--focus--border-top-color)'
                },
                {
                    name: '--tab--focus--background',
                    value: 'var(--color-light-tint-50)'
                },
                {
                    name: '--tab--border-top-left-radius',
                    value: '0'
                },
                {
                    name: '--tab--border-top-right-radius',
                    value: '0'
                },
                {
                    name: '--tab--border-bottom-right-radius',
                    value: '0'
                },
                {
                    name: '--tab--border-bottom-left-radius',
                    value: '0'
                },
                {
                    name: '--tab--border-radius',
                    value: '0'
                },
                {
                    name: '--tab--font-size',
                    value: 'var(--font-size-md)'
                },
                {
                    name: '--tab--padding-top',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--tab--padding-right',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--tab--padding-bottom',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--tab--padding-left',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--tab--padding',
                    value: 'var(--tab--padding-top) var(--tab--padding-right) var(--tab--padding-bottom) var(--tab--padding-left)'
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
                    name: '--tab--border-top-width',
                    value: '0'
                },
                {
                    name: '--tab--border-top-style',
                    value: 'var(--border-top-style)'
                },
                {
                    name: '--tab--border-top-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--border-right-width',
                    value: 'var(--border-right-width)'
                },
                {
                    name: '--tab--border-right-style',
                    value: 'var(--border-right-style)'
                },
                {
                    name: '--tab--border-right-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--tab--border-bottom-style',
                    value: 'var(--border-bottom-style)'
                },
                {
                    name: '--tab--border-bottom-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--border-left-width',
                    value: '0'
                },
                {
                    name: '--tab--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--tab--border-left-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--border-width',
                    value: 'var(--tab--border-top-width) var(--tab--border-right-width) var(--tab--border-bottom-width) var(--tab--border-left-width)'
                },
                {
                    name: '--tab--border-style',
                    value: 'var(--tab--border-top-style) var(--tab--border-right-style) var(--tab--border-bottom-style) var(--tab--border-left-style)'
                },
                {
                    name: '--tab--border-color',
                    value: 'var(--tab--border-top-color) var(--tab--border-right-color) var(--tab--border-bottom-color) var(--tab--border-left-color)'
                },
                {
                    name: '--tab--border-top',
                    value: 'var(--tab--border-top-width) var(--tab--border-top-style) var(--tab--border-top-color)'
                },
                {
                    name: '--tab--border-right',
                    value: 'var(--tab--border-right-width) var(--tab--border-right-style) var(--tab--border-right-color)'
                },
                {
                    name: '--tab--border-bottom',
                    value: 'var(--tab--border-bottom-width) var(--tab--border-bottom-style) var(--tab--border-bottom-color)'
                },
                {
                    name: '--tab--border-left',
                    value: 'var(--tab--border-left-width) var(--tab--border-left-style) var(--tab--border-left-color)'
                },
                {
                    name: '--tab--border',
                    value: 'var(--tab--border-top-width) var(--tab--border-top-style) var(--tab--border-top-color)'
                },
                {
                    name: '--tab--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--tab--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--tab--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--tab--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--tab--box-shadow-color',
                    value: 'var(--box-shadow-color)'
                },
                {
                    name: '--tab--box-shadow',
                    value: 'var(--tab--box-shadow-offset-x) var(--tab--box-shadow-offset-y) var(--tab--box-shadow-blur-radius) var(--tab--box-shadow-spread-radius) var(--tab--box-shadow-color)'
                },
                {
                    name: '--tab--transition-property',
                    value: 'var(--transition-property)'
                },
                {
                    name: '--tab--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--tab--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--tab--transition',
                    value: 'var(--tab--transition-property) var(--tab--transition-duration) var(--tab--transition-timing-function)'
                },
                {
                    name: '--tab--active--font-weight',
                    value: 'var(--font-weight-semibold)'
                },
                {
                    name: '--tab--active--border-top-width',
                    value: '0'
                },
                {
                    name: '--tab--active--border-top-style',
                    value: 'none'
                },
                {
                    name: '--tab--active--border-top-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--active--border-right-width',
                    value: '0'
                },
                {
                    name: '--tab--active--border-right-style',
                    value: 'none'
                },
                {
                    name: '--tab--active--border-right-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--active--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--tab--active--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--tab--active--border-bottom-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--active--border-left-width',
                    value: '0'
                },
                {
                    name: '--tab--active--border-left-style',
                    value: 'none'
                },
                {
                    name: '--tab--active--border-left-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--active--border-width',
                    value: 'var(--tab--active--border-top-width) var(--tab--active--border-right-width) var(--tab--active--border-bottom-width) var(--tab--active--border-left-width)'
                },
                {
                    name: '--tab--active--border-style',
                    value: 'var(--tab--active--border-top-style) var(--tab--active--border-right-style) var(--tab--active--border-bottom-style) var(--tab--active--border-left-style)'
                },
                {
                    name: '--tab--active--border-color',
                    value: 'var(--tab--active--border-top-color) var(--tab--active--border-right-color) var(--tab--active--border-bottom-color) var(--tab--active--border-left-color)'
                },
                {
                    name: '--tab--active--border-top',
                    value: 'var(--tab--active--border-top-width) var(--tab--active--border-top-style) var(--tab--active--border-top-color)'
                },
                {
                    name: '--tab--active--border-right',
                    value: 'var(--tab--active--border-right-width) var(--tab--active--border-right-style) var(--tab--active--border-right-color)'
                },
                {
                    name: '--tab--active--border-bottom',
                    value: 'var(--tab--active--border-bottom-width) var(--tab--active--border-bottom-style) var(--tab--active--border-bottom-color)'
                },
                {
                    name: '--tab--active--border-left',
                    value: 'var(--tab--active--border-left-width) var(--tab--active--border-left-style) var(--tab--active--border-left-color)'
                },
                {
                    name: '--tab--active--border',
                    value: 'var(--tab--active--border-top-width) var(--tab--active--border-top-style) var(--tab--active--border-top-color)'
                },
                {
                    name: '--tab--active--background',
                    value: 'var(--color-light-tint-50)'
                },
                {
                    name: '--tab--background',
                    value: 'var(--color-white)'
                },
                {
                    name: '--tab--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--tab--hover--border-top-width',
                    value: '0'
                },
                {
                    name: '--tab--hover--border-top-style',
                    value: 'none'
                },
                {
                    name: '--tab--hover--border-top-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--hover--border-right-width',
                    value: '0'
                },
                {
                    name: '--tab--hover--border-right-style',
                    value: 'none'
                },
                {
                    name: '--tab--hover--border-right-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--hover--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--tab--hover--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--tab--hover--border-bottom-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--hover--border-left-width',
                    value: '0'
                },
                {
                    name: '--tab--hover--border-left-style',
                    value: 'none'
                },
                {
                    name: '--tab--hover--border-left-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--hover--border-width',
                    value: 'var(--tab--hover--border-top-width) var(--tab--hover--border-right-width) var(--tab--hover--border-bottom-width) var(--tab--hover--border-left-width)'
                },
                {
                    name: '--tab--hover--border-style',
                    value: 'var(--tab--hover--border-top-style) var(--tab--hover--border-right-style) var(--tab--hover--border-bottom-style) var(--tab--hover--border-left-style)'
                },
                {
                    name: '--tab--hover--border-color',
                    value: 'var(--tab--hover--border-top-color) var(--tab--hover--border-right-color) var(--tab--hover--border-bottom-color) var(--tab--hover--border-left-color)'
                },
                {
                    name: '--tab--hover--border-top',
                    value: 'var(--tab--hover--border-top-width) var(--tab--hover--border-top-style) var(--tab--hover--border-top-color)'
                },
                {
                    name: '--tab--hover--border-right',
                    value: 'var(--tab--hover--border-right-width) var(--tab--hover--border-right-style) var(--tab--hover--border-right-color)'
                },
                {
                    name: '--tab--hover--border-bottom',
                    value: 'var(--tab--hover--border-bottom-width) var(--tab--hover--border-bottom-style) var(--tab--hover--border-bottom-color)'
                },
                {
                    name: '--tab--hover--border-left',
                    value: 'var(--tab--hover--border-left-width) var(--tab--hover--border-left-style) var(--tab--hover--border-left-color)'
                },
                {
                    name: '--tab--hover--border',
                    value: 'var(--tab--hover--border-top-width) var(--tab--hover--border-top-style) var(--tab--hover--border-top-color)'
                },
                {
                    name: '--tab--hover--background',
                    value: 'var(--color-light-tint-50)'
                },
                {
                    name: '--tab--focus--border-top-width',
                    value: '0'
                },
                {
                    name: '--tab--focus--border-top-style',
                    value: 'none'
                },
                {
                    name: '--tab--focus--border-top-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--focus--border-right-width',
                    value: '0'
                },
                {
                    name: '--tab--focus--border-right-style',
                    value: 'none'
                },
                {
                    name: '--tab--focus--border-right-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--focus--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--tab--focus--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--tab--focus--border-bottom-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--focus--border-left-width',
                    value: '0'
                },
                {
                    name: '--tab--focus--border-left-style',
                    value: 'none'
                },
                {
                    name: '--tab--focus--border-left-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab--focus--border-width',
                    value: 'var(--tab--focus--border-top-width) var(--tab--focus--border-right-width) var(--tab--focus--border-bottom-width) var(--tab--focus--border-left-width)'
                },
                {
                    name: '--tab--focus--border-style',
                    value: 'var(--tab--focus--border-top-style) var(--tab--focus--border-right-style) var(--tab--focus--border-bottom-style) var(--tab--focus--border-left-style)'
                },
                {
                    name: '--tab--focus--border-color',
                    value: 'var(--tab--focus--border-top-color) var(--tab--focus--border-right-color) var(--tab--focus--border-bottom-color) var(--tab--focus--border-left-color)'
                },
                {
                    name: '--tab--focus--border-top',
                    value: 'var(--tab--focus--border-top-width) var(--tab--focus--border-top-style) var(--tab--focus--border-top-color)'
                },
                {
                    name: '--tab--focus--border-right',
                    value: 'var(--tab--focus--border-right-width) var(--tab--focus--border-right-style) var(--tab--focus--border-right-color)'
                },
                {
                    name: '--tab--focus--border-bottom',
                    value: 'var(--tab--focus--border-bottom-width) var(--tab--focus--border-bottom-style) var(--tab--focus--border-bottom-color)'
                },
                {
                    name: '--tab--focus--border-left',
                    value: 'var(--tab--focus--border-left-width) var(--tab--focus--border-left-style) var(--tab--focus--border-left-color)'
                },
                {
                    name: '--tab--focus--border',
                    value: 'var(--tab--focus--border-top-width) var(--tab--focus--border-top-style) var(--tab--focus--border-top-color)'
                },
                {
                    name: '--tab--focus--background',
                    value: 'var(--color-light-tint-50)'
                },
                {
                    name: '--tab--border-top-left-radius',
                    value: '0'
                },
                {
                    name: '--tab--border-top-right-radius',
                    value: '0'
                },
                {
                    name: '--tab--border-bottom-right-radius',
                    value: '0'
                },
                {
                    name: '--tab--border-bottom-left-radius',
                    value: '0'
                },
                {
                    name: '--tab--border-radius',
                    value: '0'
                },
                {
                    name: '--tab--font-size',
                    value: 'var(--font-size-md)'
                },
                {
                    name: '--tab--padding-top',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--tab--padding-right',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--tab--padding-bottom',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--tab--padding-left',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--tab--padding',
                    value: 'var(--tab--padding-top) var(--tab--padding-right) var(--tab--padding-bottom) var(--tab--padding-left)'
                },
                {
                    name: '--tab-panel--border-top-width',
                    value: 'var(--border-top-width)'
                },
                {
                    name: '--tab-panel--border-top-style',
                    value: 'var(--border-top-style)'
                },
                {
                    name: '--tab-panel--border-top-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab-panel--border-right-width',
                    value: 'var(--border-right-width)'
                },
                {
                    name: '--tab-panel--border-right-style',
                    value: 'var(--border-right-style)'
                },
                {
                    name: '--tab-panel--border-right-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab-panel--border-bottom-width',
                    value: 'var(--border-bottom-width)'
                },
                {
                    name: '--tab-panel--border-bottom-style',
                    value: 'var(--border-bottom-style)'
                },
                {
                    name: '--tab-panel--border-bottom-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab-panel--border-left-width',
                    value: 'var(--border-left-width)'
                },
                {
                    name: '--tab-panel--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--tab-panel--border-left-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--tab-panel--border-width',
                    value: 'var(--tab-panel--border-top-width) var(--tab-panel--border-right-width) var(--tab-panel--border-bottom-width) var(--tab-panel--border-left-width)'
                },
                {
                    name: '--tab-panel--border-style',
                    value: 'var(--tab-panel--border-top-style) var(--tab-panel--border-right-style) var(--tab-panel--border-bottom-style) var(--tab-panel--border-left-style)'
                },
                {
                    name: '--tab-panel--border-color',
                    value: 'var(--tab-panel--border-top-color) var(--tab-panel--border-right-color) var(--tab-panel--border-bottom-color) var(--tab-panel--border-left-color)'
                },
                {
                    name: '--tab-panel--border-top',
                    value: 'var(--tab-panel--border-top-width) var(--tab-panel--border-top-style) var(--tab-panel--border-top-color)'
                },
                {
                    name: '--tab-panel--border-right',
                    value: 'var(--tab-panel--border-right-width) var(--tab-panel--border-right-style) var(--tab-panel--border-right-color)'
                },
                {
                    name: '--tab-panel--border-bottom',
                    value: 'var(--tab-panel--border-bottom-width) var(--tab-panel--border-bottom-style) var(--tab-panel--border-bottom-color)'
                },
                {
                    name: '--tab-panel--border-left',
                    value: 'var(--tab-panel--border-left-width) var(--tab-panel--border-left-style) var(--tab-panel--border-left-color)'
                },
                {
                    name: '--tab-panel--border',
                    value: 'var(--tab-panel--border-top-width) var(--tab-panel--border-top-style) var(--tab-panel--border-top-color)'
                },
                {
                    name: '--tab-panel--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--tab-panel--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--tab-panel--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--tab-panel--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--tab-panel--box-shadow-color',
                    value: 'var(--box-shadow-color)'
                },
                {
                    name: '--tab-panel--box-shadow',
                    value: 'var(--tab-panel--box-shadow-offset-x) var(--tab-panel--box-shadow-offset-y) var(--tab-panel--box-shadow-blur-radius) var(--tab-panel--box-shadow-spread-radius) var(--tab-panel--box-shadow-color)'
                },
                {
                    name: '--tab-panel--transition-property',
                    value: 'var(--transition-property)'
                },
                {
                    name: '--tab-panel--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--tab-panel--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--tab-panel--transition',
                    value: 'var(--tab-panel--transition-property) var(--tab-panel--transition-duration) var(--tab-panel--transition-timing-function)'
                },
                {
                    name: '--tab-panel--background',
                    value: 'var(--color-white)'
                },
                {
                    name: '--tab-panel--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--tab-panel--border-top-left-radius',
                    value: 'var(--border-top-left-radius-md)'
                },
                {
                    name: '--tab-panel--border-top-right-radius',
                    value: 'var(--border-top-right-radius-md)'
                },
                {
                    name: '--tab-panel--border-bottom-right-radius',
                    value: 'var(--border-bottom-right-radius-md)'
                },
                {
                    name: '--tab-panel--border-bottom-left-radius',
                    value: 'var(--border-bottom-left-radius-md)'
                },
                {
                    name: '--tab-panel--border-radius',
                    value: 'var(--tab-panel--border-top-left-radius) var(--tab-panel--border-top-right-radius) var(--tab-panel--border-bottom-right-radius) var(--tab-panel--border-bottom-left-radius)'
                },
                {
                    name: '--tab-panel--font-size',
                    value: 'var(--font-size-md)'
                },
                {
                    name: '--tab-panel--padding-top',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--tab-panel--padding-right',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--tab-panel--padding-bottom',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--tab-panel--padding-left',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--tab-panel--padding',
                    value: 'var(--tab-panel--padding-top) var(--tab-panel--padding-right) var(--tab-panel--padding-bottom) var(--tab-panel--padding-left)'
                }
            ]
        }
    }
];

export default manifest;
