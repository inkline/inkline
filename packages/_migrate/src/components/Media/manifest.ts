import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'Media',
    props: [],
    events: [],
    slots: [
        {
            name: 'image',
            description: 'Slot for media image '
        },
        {
            name: 'default',
            description: 'Slot for default media content '
        }
    ],
    css: {
        selector: '.media',
        variables: [
            {
                name: '--media--image--margin',
                value: [
                    {
                        name: '--media--image--margin-top',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--media--image--margin-right',
                        value: [
                            {
                                name: '--margin-right'
                            }
                        ]
                    },
                    {
                        name: '--media--image--margin-bottom',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--media--image--margin-left',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
