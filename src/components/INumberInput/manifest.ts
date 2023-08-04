import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'INumberInput',
    props: [
        {
            name: 'modelValue',
            type: ['String', 'Number'],
            default: '',
            description: 'Used to set the field value'
        },
        {
            name: 'name',
            type: ['String'],
            default: 'uid()',
            description: 'The unique identifier of the input'
        },
        {
            name: 'min',
            type: ['Number'],
            default: '-Infinity',
            description: 'The minimum allowed input value'
        },
        {
            name: 'max',
            type: ['Number'],
            default: '+Infinity',
            description: 'The maximum allowed input value'
        },
        {
            name: 'precision',
            type: ['Number'],
            default: '0',
            description: 'The precision of the input value, for floating point numbers'
        },
        {
            name: 'step',
            type: ['Number'],
            default: '1',
            description: 'The increment step to increase or decrease the value by'
        }
    ],
    events: [],
    slots: [],
    css: {
        selector: '',
        variables: []
    }
};

export default manifest;
