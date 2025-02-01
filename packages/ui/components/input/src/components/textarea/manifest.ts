import type { ComponentManifest } from '@inkline/types';

export const TextareaManifest: ComponentManifest = {
    name: 'Textarea',
    props: [
        {
            name: 'name',
            type: 'String',
            description: 'The unique identifier of the textarea',
            default: 'uid()'
        }
    ],
    events: [
        {
            name: 'update:modelValue',
            description: 'Event emitted for setting the modelValue'
        },
        {
            name: 'clear',
            description: 'Event emitted when clearing the input element'
        }
    ],
    slots: [],
    css: {
        selector: '.',
        variables: []
    }
};
