import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IMedia',
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
                name: '--media--image--margin-right',
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
