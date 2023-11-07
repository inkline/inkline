import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IToastContainer',
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
                value: [
                    {
                        value: '2010'
                    }
                ]
            },
            {
                name: '--toast-container--margin',
                value: [
                    {
                        name: '--toast-container--margin-top',
                        value: [
                            {
                                name: '--margin-top'
                            }
                        ]
                    },
                    {
                        name: '--toast-container--margin-right',
                        value: [
                            {
                                name: '--margin-right'
                            }
                        ]
                    },
                    {
                        name: '--toast-container--margin-bottom',
                        value: [
                            {
                                name: '--margin-bottom'
                            }
                        ]
                    },
                    {
                        name: '--toast-container--margin-left',
                        value: [
                            {
                                name: '--margin-left'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toast-container--top',
                value: [
                    {
                        value: '0'
                    }
                ]
            },
            {
                name: '--toast-container--left',
                value: [
                    {
                        value: '0'
                    }
                ]
            },
            {
                name: '--toast-container--right',
                value: [
                    {
                        value: '0'
                    }
                ]
            },
            {
                name: '--toast-container--bottom',
                value: [
                    {
                        value: '0'
                    }
                ]
            },
            {
                name: '--toast-container--toast--margin-bottom',
                value: [
                    {
                        name: '--margin-bottom'
                    }
                ]
            },
            {
                name: '--toast-container--toast--transition-property',
                value: [
                    {
                        value: 'transform, opacity'
                    }
                ]
            },
            {
                name: '--toast-container--toast--transition-duration',
                value: [
                    {
                        name: '--transition-duration'
                    }
                ]
            },
            {
                name: '--toast-container--toast--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            }
        ]
    }
};

export default manifest;
