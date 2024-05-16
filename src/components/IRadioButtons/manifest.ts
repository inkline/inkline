import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IRadioButtons',
    props: [
        {
            name: 'buttonProps',
            type: ['Object'],
            default: '',
            description: 'The default button props of the radio buttons'
        },
        {
            name: 'label',
            type: ['String', 'Number', 'Boolean', 'Function', 'Object'],
            default: 'undefined',
            description:
                'The fallback label of the radio buttons. Can be a string, number, render function, or component'
        },
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the radio buttons'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the radio buttons'
        },
        {
            name: 'error',
            type: ['Boolean', 'Array'],
            default: "'touched', 'dirty', 'invalid'",
            description: 'The error state of the checkbox, computed based on schema by default.'
        },
        {
            name: 'modelValue',
            type: [],
            default: '',
            description: 'Used to set the radio buttons value'
        },
        {
            name: 'name',
            type: ['String'],
            default: 'uid()',
            description: 'The unique identifier of the radio buttons'
        },
        {
            name: 'options',
            type: ['Array'],
            default: '',
            description: 'The options to be rendered as radio buttons'
        },
        {
            name: 'readonly',
            type: ['Boolean'],
            default: 'false',
            description: 'The readonly state of the radio buttons'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the radio buttons'
        },
        {
            name: 'validateSchema',
            type: ['Boolean'],
            default: 'true',
            description: 'Enable radio buttons validation using schema'
        },
        {
            name: 'variant',
            type: ['default', 'button-group'],
            default: 'default',
            description: 'The style variant of the radio buttons'
        }
    ],
    events: [
        {
            description: 'Event emitted for setting the modelValue',
            name: 'update:modelValue'
        }
    ],
    slots: [
        {
            name: 'prepend',
            description: 'Slot for rendering additional content before buttons '
        },
        {
            name: 'option',
            description: 'Slot for rendering radio buttons options content '
        },
        {
            name: 'append',
            description: 'Slot for rendering additional content after buttons '
        }
    ],
    css: {
        selector: '',
        variables: []
    }
};

export default manifest;
