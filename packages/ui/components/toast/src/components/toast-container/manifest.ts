import type { ComponentManifest } from '@inkline/types';

export const ToastContainerManifest: ComponentManifest = {
    name: 'ToastContainer',
    props: [
        {
            name: 'eventBus',
            type: 'EventBus',
            description: 'The event bus to use for showing/hiding toasts',
            default: 'toastEventBus'
        },
        {
            name: 'duration',
            type: 'number',
            description:
                'The default duration for toasts in milliseconds, if not specified in the plugin or toast display options',
            default: 'undefined'
        },
        {
            name: 'dismissible',
            type: 'Boolean',
            description:
                'The default dismissible state for toasts, if not specified in the plugin or toast display options',
            default: 'undefined'
        },
        {
            name: 'showProgress',
            type: 'Boolean',
            description:
                'The default option for showing the progress bar for toasts, if not specified in the plugin or toast display options',
            default: 'undefined'
        }
    ],
    events: [],
    slots: [],
    css: {
        selector: '.toast-container',
        variables: [
            {
                name: 'toast-container--margin-top'
            },
            {
                name: 'toast-container--margin-right'
            },
            {
                name: 'toast-container--margin-bottom'
            },
            {
                name: 'toast-container--margin-left'
            },
            {
                name: 'toast-container--margin'
            },
            {
                name: 'toast-container--width'
            },
            {
                name: 'toast-container--z-index'
            },
            {
                name: 'toast-container--toast--margin-top'
            },
            {
                name: 'toast-container--toast--margin-right'
            },
            {
                name: 'toast-container--toast--margin-bottom'
            },
            {
                name: 'toast-container--toast--margin-left'
            },
            {
                name: 'toast-container--toast--margin'
            },
            {
                name: 'toast-container--toast--transition-property'
            },
            {
                name: 'toast-container--toast--transition-duration'
            },
            {
                name: 'toast-container--toast--transition-timing-function'
            },
            {
                name: 'toast-container--toast--transition'
            }
        ]
    }
};
