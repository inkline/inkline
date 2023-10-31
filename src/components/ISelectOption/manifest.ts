import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'ISelectOption',
    props: [
        {
            name: 'label',
            type: ['String', 'Number', 'Boolean', 'Function', 'Object'],
            default: 'undefined',
            description:
                'The label of the select option. Can be a string, number, render function, or component'
        },
        {
            name: 'tabindex',
            type: ['Number', 'String'],
            default: '0',
            description: 'The tabindex of the list group item'
        },
        {
            name: 'option',
            type: ['Object'],
            default: '',
            description: 'The select option'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for select option label '
        }
    ],
    css: {
        selector: '.select',
        variables: [
            {
                name: '--select--option--border-color',
                value: [
                    {
                        name: '--select--option--border-top-color',
                        value: [
                            {
                                name: '--select--border-top-color',
                                value: [
                                    {
                                        name: '--border-top-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--option--border-right-color',
                        value: [
                            {
                                name: '--select--border-right-color',
                                value: [
                                    {
                                        name: '--border-right-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--option--border-bottom-color',
                        value: [
                            {
                                name: '--select--border-bottom-color',
                                value: [
                                    {
                                        name: '--border-bottom-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--option--border-left-color',
                        value: [
                            {
                                name: '--select--border-left-color',
                                value: [
                                    {
                                        name: '--border-left-color'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--select--option--padding',
                value: [
                    {
                        name: '--select--option--padding-top',
                        value: [
                            {
                                name: '--select--padding-top',
                                value: [
                                    {
                                        name: '--padding-top'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--option--padding-right',
                        value: [
                            {
                                name: '--select--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--option--padding-bottom',
                        value: [
                            {
                                name: '--select--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--option--padding-left',
                        value: [
                            {
                                name: '--select--padding-left',
                                value: [
                                    {
                                        name: '--padding-left'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--select--option--color',
                value: [
                    {
                        name: '--select--color'
                    }
                ]
            },
            {
                name: '--select--option--background',
                value: [
                    {
                        name: '--select--background'
                    }
                ]
            },
            {
                name: '--select--option--transition-property',
                value: [
                    {
                        value: 'background-color,\n        border-color,\n        color'
                    }
                ]
            },
            {
                name: '--select--option--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--select--option--transition-duration',
                value: [
                    {
                        name: '--transition-duration'
                    }
                ]
            },
            {
                name: '--select--option--hover--color'
            },
            {
                name: '--select--option--hover--background'
            },
            {
                name: '--select--option--disabled--color'
            },
            {
                name: '--select--option--disabled--background',
                value: [
                    {
                        name: '--select--background'
                    }
                ]
            },
            {
                name: '--select--option--active--color',
                value: [
                    {
                        name: '--select--color'
                    }
                ]
            },
            {
                name: '--select--option--active--background',
                value: [
                    {
                        name: '--select--background'
                    }
                ]
            }
        ]
    }
};

export default manifest;
