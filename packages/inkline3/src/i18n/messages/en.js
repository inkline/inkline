export const en = {
    validation: {
        alpha: (params) => 'Please enter letters only.',
        alphanumeric: (params) => 'Please enter alphanumeric characters only.',
        number: (params) => 'Please enter numbers only.',
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
