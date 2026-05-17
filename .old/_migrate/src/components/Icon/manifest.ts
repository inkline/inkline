import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'Icon',
    props: [
        {
            name: 'name',
            type: ['String'],
            default: '',
            description: 'The icon to be displayed'
        },
        {
            name: 'name',
            type: ['String'],
            default: '',
            description: ''
        },
        {
            name: 'size',
            type: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
            default: '',
            description: 'The size variant of the icon'
        }
    ],
    events: [],
    slots: [],
    css: {
        selector: '.inkline-icon',
        variables: [
            {
                name: '--icon--font-size',
                value: [],
                variants: [
                    {
                        name: '--icon--xs--font-size',
                        value: [
                            {
                                name: '--font-size-xs'
                            }
                        ]
                    },
                    {
                        name: '--icon--sm--font-size',
                        value: [
                            {
                                name: '--font-size-sm'
                            }
                        ]
                    },
                    {
                        name: '--icon--md--font-size',
                        value: [
                            {
                                name: '--font-size-md'
                            }
                        ]
                    },
                    {
                        name: '--icon--lg--font-size',
                        value: [
                            {
                                name: '--font-size-lg'
                            }
                        ]
                    },
                    {
                        name: '--icon--xl--font-size',
                        value: [
                            {
                                name: '--font-size-xl'
                            }
                        ]
                    },
                    {
                        name: '--icon--xxl--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-xxl))'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
