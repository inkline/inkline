import * as validators from "inkline/validators";

/**
 * Construct a basic form schema with default values
 */
export function form(schema) {
    Object.keys(schema).forEach((name) => {
        if (schema[name]._form || !schema.hasOwnProperty(name)) { return; }

        schema[name] = {
            touched: false,
            untouched: true,
            dirty: false,
            pristine: true,
            invalid: false,
            valid: true,
            validateOn: 'input',
            errors: {},
            value: '',
            validate: (value) => {
                let valid = true;
                const errors = {
                    length: 0
                };

                for (let validator of schema[name].validators) {
                    if (!validators[validator.rule]) {
                        throw new Error(`Invalid validation rule '${validator.rule}' provided.`);
                    }

                    if (!validator.disabled && !validators[validator.rule](value, validator)) {
                        errors[validator.rule] = validator.message;
                        errors.length += 1;
                        valid = false;
                    }
                }

                return {
                    valid,
                    errors
                }
            },
            ...schema[name]
        };
    });

    return {
        _form: true,
        touched: false,
        untouched: true,
        dirty: false,
        pristine: true,
        invalid: false,
        valid: true,
        errors: [],
        ...schema
    };
}