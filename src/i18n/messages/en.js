export const en = {
    validation: {
        alpha: (params) => {
            let context;

            switch(true) {
            case params.allowSpaces && params.allowDashes:
                context = 'letters, spaces, and dashes'; break;
            case params.allowSpaces:
                context = 'letters and spaces'; break;
            case params.allowDashes:
                context = 'letters and dashes'; break;
            default:
                context = 'letters';
            }

            return `Please enter ${context} only.`;
        },
        alphanumeric: (params) => {
            let context;

            switch(true) {
            case params.allowSpaces && params.allowDashes:
                context = 'letters, numbers, spaces, and dashes'; break;
            case params.allowSpaces:
                context = 'letters, numbers, and spaces'; break;
            case params.allowDashes:
                context = 'letters, numbers, and dashes'; break;
            default:
                context = 'letters and numbers';
            }

            return `Please enter ${context} only.`;
        },
        number: (params) => {
            let context;

            switch(true) {
            case params.allowNegative && params.allowDecimal:
                context = 'positive or negative decimal numbers'; break;
            case params.allowNegative:
                context = 'positive or negative numbers'; break;
            case params.allowDecimal:
                context = 'decimal numbers'; break;
            default:
                context = 'numbers';
            }

            return `Please enter ${context} only.`;
        },
        email: (params) => 'Please enter a valid email address.',
        max: (params) => 'Please enter a maximum value of {value}.',
        maxLength: (params) => 'Please enter up to {value} characters.',
        min: (params) => 'Please enter a minimum value of {value}.',
        minLength: (params) => 'Please enter at least {value} characters.',
        required: (params) => 'Please enter a value for this field.',
        sameAs: (params) => 'Please make sure that the two values match.',
        custom: (params) => 'Please enter a correct value for this field.'
    }
};
