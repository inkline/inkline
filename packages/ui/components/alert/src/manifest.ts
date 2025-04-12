import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Alert',
        props: [
            {
                name: 'color',
                type: "'info' | 'success' | 'warning' | 'danger' | string",
                description: 'The color of the alert',
                default: 'undefined'
            },
            {
                name: 'size',
                type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | string",
                description: 'The size of the alert',
                default: 'undefined'
            },
            {
                name: 'variant',
                type: 'string',
                description: 'The variant of the alert',
                default: "'info'"
            },
            {
                name: 'modelValue',
                type: 'boolean',
                description: 'Used to show or hide the alert',
                default: 'undefined'
            },
            {
                name: 'dismissible',
                type: 'boolean',
                description: 'Shows a dismiss icon on the alert',
                default: 'false'
            },
            {
                name: 'dismissAriaLabel',
                type: 'string',
                description: 'The aria-label to use for the dismiss button',
                default: 'Dismiss'
            },
            {
                name: 'icon',
                type: 'string | VNode | VNode[]',
                description: 'The icon to be rendered in the toast',
                default: 'undefined'
            }
        ],
        events: [
            {
                name: 'Alert',
                description: 'Event emitted for setting the modelValue'
            }
        ],
        slots: [
            {
                name: 'icon',
                description: 'Slot for alert icon'
            },
            {
                name: 'default',
                description: 'Slot for default alert content'
            },
            {
                name: 'dismiss',
                description: 'Slot for alert dismiss button'
            }
        ],
        css: {
            namespace: 'alert',
            variables: []
        }
    }
];

export default manifest;
