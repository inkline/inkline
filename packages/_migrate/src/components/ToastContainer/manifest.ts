import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'ToastContainer',
    props: [
        {
            name: 'eventBus',
            type: ['EventBus'],
            default: 'toastEventBus',
            description: 'The event bus to use for showing/hiding toasts'
        },
        {
            name: 'duration',
            type: ['number'],
            default: 'undefined',
            description:
                'The default duration for toasts in milliseconds, if not specified in the plugin or toast display options'
        },
        {
            name: 'dismissible',
            type: ['Boolean'],
            default: 'undefined',
            description:
                'The default dismissible state for toasts, if not specified in the plugin or toast display options'
        },
        {
            name: 'showProgress',
            type: ['Boolean'],
            default: 'undefined',
            description:
                'The default option for showing the progress bar for toasts, if not specified in the plugin or toast display options'
        }
    ],
    events: [],
    slots: [],
    css: {
        selector: '.toast-container',
        variables: [
            {
                name: '--toast-container--z-index',
                value: []
            },
            {
                name: '--toast-container--margin',
                value: []
            },
            {
                name: '--toast-container--top',
                value: []
            },
            {
                name: '--toast-container--left',
                value: []
            },
            {
                name: '--toast-container--right',
                value: []
            },
            {
                name: '--toast-container--bottom',
                value: []
            },
            {
                name: '--toast-container--toast--margin',
                value: [
                    {
                        name: '--toast-container--toast--margin-bottom'
                    }
                ]
            },
            {
                name: '--toast-container--toast--transition',
                value: [
                    {
                        name: '--toast-container--toast--transition-property'
                    },
                    {
                        name: '--toast-container--toast--transition-duration'
                    },
                    {
                        name: '--toast-container--toast--transition-timing-function'
                    }
                ]
            }
        ]
    }
};

export default manifest;
