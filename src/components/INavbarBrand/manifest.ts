export const manifest = {
    name: 'INavbarBrand',
    props: [
        {
            name: 'to',
            type: ['String'],
            default: 'undefined',
            description: 'Renders the component as an anchor link with a `href` attribute'
        },
        {
            name: 'tag',
            type: ['String'],
            default: 'div',
            description: 'Set the HTML tag to be used for rendering the nav item'
        },
        {
            name: 'to',
            type: ['String'],
            default: 'undefined',
            description: 'Renders the component as a Router Link component with a `to` attribute'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default navbar brand content '
        }
    ],
    css: {
        selector: '.navbar',
        variables: [
            {
                name: '--navbar--color'
            },
            {
                name: '--navbar--item--padding',
                value: [
                    {
                        name: '--navbar--item--padding-top',
                        value: [
                            {
                                name: '--navbar--padding-top',
                                value: [
                                    {
                                        name: '--padding-top'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--item--padding-right',
                        value: [
                            {
                                name: '--navbar--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--item--padding-bottom',
                        value: [
                            {
                                name: '--navbar--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--item--padding-left',
                        value: [
                            {
                                name: '--navbar--padding-left',
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
                name: '--navbar--brand--font-size',
                value: [
                    {
                        name: '--navbar--font-size',
                        value: [
                            {
                                name: '--font-size'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--navbar--brand--margin-right',
                value: [
                    {
                        name: '--margin-right'
                    }
                ]
            }
        ]
    }
};

export default manifest;
