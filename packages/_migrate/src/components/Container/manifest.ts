import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'Container',
    props: [
        {
            name: 'fluid',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the container as fluid, always spanning 100% width'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default container content '
        }
    ],
    css: {
        selector: '.container',
        variables: [
            {
                name: '--container-xs--container-xs',
                value: [
                    {
                        name: '--container-xs'
                    }
                ]
            },
            {
                name: '--gutter-xs--gutter-xs',
                value: [
                    {
                        name: '--gutter-xs'
                    }
                ]
            },
            {
                name: '--container-sm--container-sm',
                value: [
                    {
                        name: '--container-sm'
                    }
                ]
            },
            {
                name: '--gutter-sm--gutter-sm',
                value: [
                    {
                        name: '--gutter-sm'
                    }
                ]
            },
            {
                name: '--container-md--container-md',
                value: [
                    {
                        name: '--container-md'
                    }
                ]
            },
            {
                name: '--gutter-md--gutter-md',
                value: [
                    {
                        name: '--gutter-md'
                    }
                ]
            },
            {
                name: '--container-lg--container-lg',
                value: [
                    {
                        name: '--container-lg'
                    }
                ]
            },
            {
                name: '--gutter-lg--gutter-lg',
                value: [
                    {
                        name: '--gutter-lg'
                    }
                ]
            },
            {
                name: '--container-xl--container-xl',
                value: [
                    {
                        name: '--container-xl'
                    }
                ]
            },
            {
                name: '--gutter-xl--gutter-xl',
                value: [
                    {
                        name: '--gutter-xl'
                    }
                ]
            },
            {
                name: '--container-xxl--container-xxl',
                value: [
                    {
                        name: '--container-xxl'
                    }
                ]
            },
            {
                name: '--gutter-xxl--gutter-xxl',
                value: [
                    {
                        name: '--gutter-xxl'
                    }
                ]
            }
        ]
    }
};

export default manifest;
