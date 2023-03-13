import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IToastContainer',
    props: [],
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
