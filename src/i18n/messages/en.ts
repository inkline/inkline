import { InternationalizationMessages } from '@inkline/inkline/i18n';

export const en: InternationalizationMessages = {
    validation: {
        alpha: (params: { allowSpaces: boolean; allowDashes: boolean }) => {
            let context;

            switch (true) {
                case params.allowSpaces && params.allowDashes:
                    context = 'letters, spaces, and dashes';
                    break;
                case params.allowSpaces:
                    context = 'letters and spaces';
                    break;
                case params.allowDashes:
                    context = 'letters and dashes';
                    break;
                default:
                    context = 'letters';
            }

            return `Please enter ${context} only.`;
        },
        alphanumeric: (params: { allowSpaces: boolean; allowDashes: boolean }) => {
            let context;

            switch (true) {
                case params.allowSpaces && params.allowDashes:
                    context = 'letters, numbers, spaces, and dashes';
                    break;
                case params.allowSpaces:
                    context = 'letters, numbers, and spaces';
                    break;
                case params.allowDashes:
                    context = 'letters, numbers, and dashes';
                    break;
                default:
                    context = 'letters and numbers';
            }

            return `Please enter ${context} only.`;
        },
        number: (params: { allowNegative: boolean; allowDecimal: boolean }) => {
            let context;

            switch (true) {
                case params.allowNegative && params.allowDecimal:
                    context = 'positive or negative decimal numbers';
                    break;
                case params.allowNegative:
                    context = 'positive or negative numbers';
                    break;
                case params.allowDecimal:
                    context = 'decimal numbers';
                    break;
                default:
                    context = 'numbers';
            }

            return `Please enter ${context} only.`;
        },
        email: 'Please enter a valid email address.',
        max: 'Please enter a maximum value of {value}.',
        maxLength: 'Please enter up to {value} characters.',
        min: 'Please enter a minimum value of {value}.',
        minLength: 'Please enter at least {value} characters.',
        required: 'Please enter a value for this field.',
        sameAs: 'Please make sure that the two values match.',
        custom: 'Please enter a correct value for this field.'
    }
};
