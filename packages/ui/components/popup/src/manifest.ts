import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Popup',
        props: [
            {
                name: 'animation',
                type: 'string',
                description: 'The animation to be used when showing the tooltip',
                default: 'zoom-in-top-transition'
            },
            {
                name: 'animationDuration',
                type: 'number',
                description: 'Animation duration in milliseconds',
                default: '300'
            },
            {
                name: 'disabled',
                type: 'boolean',
                description: 'The disabled state of the tooltip',
                default: 'false'
            },
            {
                name: 'visible',
                type: 'boolean',
                description: 'Used to manually control the visibility of the tooltip',
                default: 'undefined'
            },
            {
                name: 'name',
                type: 'string',
                description: 'The identifier of the tooltip',
                default: 'uid()'
            },
            {
                name: 'placement',
                type: "'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'",
                description: 'The placement of the tooltip',
                default: 'false'
            },
            {
                name: 'listener',
                type: "'hover' | 'focus' | 'click' | 'manual'",
                description: 'The listener used to trigger the tooltip',
                default: "'hover', 'focus'"
            },
            {
                name: 'offset',
                type: 'number',
                description: 'The offset of the tooltip relative to the trigger element',
                default: '8'
            },
            {
                name: 'interactive',
                type: 'boolean',
                description:
                    'Determines whether hover state should be transferred from trigger to popup',
                default: 'true'
            },
            {
                name: 'popupOptions',
                type: 'Object',
                description:
                    'Used to override the floating-ui options used for creating the tooltip',
                default: ''
            },
            {
                name: 'interactiveDelay',
                type: 'number',
                description: 'Delay in milliseconds before the tooltip is hidden on hover',
                default: '300'
            },
            {
                name: 'hideOnClickOutside',
                type: 'boolean',
                description: 'Determines whether the tooltip should hide when clicking outside',
                default: 'true'
            }
        ],
        events: [
            {
                name: 'Popup',
                description: 'Event emitted for setting the visible'
            },
            {
                name: 'Popup',
                description: 'Event emitted when clicking outside the tooltip'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Slot for trigger element'
            },
            {
                name: 'body',
                description: 'Slot for popup element'
            }
        ],
        css: {
            namespace: '',
            variables: []
        }
    }
];

export default manifest;
