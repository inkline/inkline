import type { InternationalizationMessages } from '../types';

interface ValidationParams<T = Record<string, any>> {
    name: string;
    value: unknown;
    params?: T;
}

export const en: InternationalizationMessages = {
    validation: {
        alpha: ({ params }: ValidationParams<{ allowSpaces: boolean; allowDashes: boolean }>) => {
            let context;

            switch (true) {
                case params?.allowSpaces && params?.allowDashes:
                    context = 'letters, spaces, and dashes';
                    break;
                case params?.allowSpaces:
                    context = 'letters and spaces';
                    break;
                case params?.allowDashes:
                    context = 'letters and dashes';
                    break;
                default:
                    context = 'letters';
            }

            return `Please enter ${context} only.`;
        },
        alphanumeric: ({
            params
        }: ValidationParams<{ allowSpaces: boolean; allowDashes: boolean }>) => {
            let context;

            switch (true) {
                case params?.allowSpaces && params?.allowDashes:
                    context = 'letters, numbers, spaces, and dashes';
                    break;
                case params?.allowSpaces:
                    context = 'letters, numbers, and spaces';
                    break;
                case params?.allowDashes:
                    context = 'letters, numbers, and dashes';
                    break;
                default:
                    context = 'letters and numbers';
            }

            return `Please enter ${context} only.`;
        },
        number: ({
            params
        }: ValidationParams<{ allowNegative: boolean; allowDecimal: boolean }>) => {
            let context;

            switch (true) {
                case params?.allowNegative && params?.allowDecimal:
                    context = 'positive or negative decimal numbers';
                    break;
                case params?.allowNegative:
                    context = 'positive or negative numbers';
                    break;
                case params?.allowDecimal:
                    context = 'decimal numbers';
                    break;
                default:
                    context = 'numbers';
            }

            return `Please enter ${context} only.`;
        },
        email: 'Please enter a valid email address.',
        max: 'Please enter a maximum value of {{params.value}}.',
        maxLength: ({ value }: ValidationParams<{ value: string | Array<string> }>) => {
            if (Array.isArray(value)) {
                return 'Please select up to {{params.value}} items.';
            }

            return 'Please enter up to {{params.value}} characters.';
        },
        min: 'Please enter a minimum value of {{params.value}}.',
        minLength: ({ value }: ValidationParams<{ value: string | Array<string> }>) => {
            if (Array.isArray(value)) {
                return 'Please select at least {{params.value}} items.';
            }

            return 'Please enter at least {{params.value}} characters.';
        },
        required: 'Please enter a value for this field.',
        sameAs: 'Please make sure that the two values match.',
        custom: 'Please enter a correct value for this field.'
    },
    modals: {
        confirm: 'Confirm',
        cancel: 'Cancel'
    }
};
