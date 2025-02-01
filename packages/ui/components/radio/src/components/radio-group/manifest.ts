import type { ComponentManifest } from '@inkline/types';

export const RadioGroupManifest: ComponentManifest = {
    name: 'RadioGroup',
    props: [
        {
            name: 'color',
            type: 'light',
            description: 'The color variant of the radio group',
            default: ''
        },
        {
            name: 'disabled',
            type: 'Boolean',
            description: 'The disabled state of the radio group',
            default: 'false'
        },
        {
            name: 'error',
            type: 'Boolean',
            description: 'The error state of the input, computed based on schema by default.',
            default: "'touched', 'dirty', 'invalid'"
        },
        {
            name: 'inline',
            type: 'Boolean',
            description: 'Display the radio group as inline',
            default: 'false'
        },
        {
            name: 'indeterminate',
            type: 'Boolean',
            description: 'The indeterminate state of the radio group',
            default: 'false'
        },
        {
            name: 'label',
            type: 'String',
            description:
                'The fallback label of the radio group. Can be a string, number, render function, or component',
            default: 'undefined'
        },
        {
            name: 'name',
            type: 'String',
            description: 'The unique identifier of the radio group',
            default: 'uid()'
        },
        {
            name: 'native',
            type: 'Boolean',
            description: 'Displays the native browser radio input indicator',
            default: 'false'
        },
        {
            name: 'readonly',
            type: 'Boolean',
            description: 'The readonly state of the radio group',
            default: 'false'
        },
        {
            name: 'sizeMultiplier',
            type: 'sm',
            description: 'The size variant of the radio group',
            default: ''
        },
        {
            name: 'validateSchema',
            type: 'Boolean',
            description: 'Enable checkbox group validation using schema',
            default: 'true'
        },
        {
            name: 'options',
            type: 'Array',
            description: 'The options of the radio group',
            default: ''
        }
    ],
    events: [
        {
            name: 'update:modelValue',
            description: 'Event emitted for setting the modelValue'
        }
    ],
    slots: [
        {
            name: 'default',
            description: 'Slot for default radio group options'
        }
    ],
    css: {
        selector: '.',
        variables: []
    }
};
