import * as validators from "inkline/validators";

const defaultFormState = {
    touched: false,
    untouched: true,
    dirty: false,
    pristine: true,
    invalid: false,
    valid: true,
    errors: {}
};

/**
 * Creates a form control schema
 *
 * @param nameNesting
 * @param schema
 * @returns {{$name: string, $validate: (function(*=): {valid: boolean, errors: {length: number}}), value: string, validateOn: string, touched: boolean, untouched: boolean, dirty: boolean, pristine: boolean, invalid: boolean, valid: boolean, errors: {}}}
 * @private
 */
function _formControl(nameNesting=[], schema) {
    const name = nameNesting[nameNesting.length - 1];
    const $name = nameNesting.join('.');

    // Set all validators as enabled by default
    for (let validator of schema[name].validators) {
        if (!validator.hasOwnProperty('enabled')) {
            validator.enabled = true;
        }
    }

    /**
     * Validate the current value by performing all the specified validation functions on it
     *
     * @param value
     * @returns {{valid: boolean, errors: {length: number}}}
     */
    const $validate = (value) => {
        let valid = true;
        let errors = {
            length: 0
        };

        for (let validator of schema[name].validators) {
            if (!validators[validator.rule]) {
                throw new Error(`Invalid validation rule '${validator.rule}' provided.`);
            }

            // Validator enabled state can be a function
            const validatorEnabled = typeof validator.enabled === 'function' ?
                validator.enabled() :
                validator.enabled;

            if (validatorEnabled && !validators[validator.rule](value, validator)) {
                errors[validator.rule] = validator.message;
                errors.length += 1;
                valid = false;
            }
        }

        return {
            valid,
            errors
        }
    };

    return {
        $name,
        $validate,
        value: '',
        validateOn: 'input',
        ...defaultFormState,
        ...schema[name]
    }
}

/**
 * Creates a form schema by going through all the fields
 *
 * @param nameNesting
 * @param schema
 * @returns {{$name: string, touched: boolean, untouched: boolean, dirty: boolean, pristine: boolean, invalid: boolean, valid: boolean, errors: {}}}
 * @private
 */
function _form(nameNesting=[], schema) {
    Object.keys(schema).forEach((name) => {
        if (!schema.hasOwnProperty(name)) { return; }

        schema[name] = schema[name].validators || schema[name].value || Object.keys(schema[name]).length === 0 ?
            _formControl(nameNesting.concat(name), schema) :
            _form(nameNesting.concat(name), schema[name])
    });

    return {
        $name: nameNesting.join('.'),
        ...defaultFormState,
        ...schema
    }
}

/**
 * Construct a basic form schema with default values
 */
export function $form(name, schema) {
    if (typeof name !== 'string') {
        schema = name;
        name = '';
    }

    const nameNesting = name === '' ? [] : name.split('.');

    return _form(nameNesting, schema);
}

$form.control = (name, schema) => _formControl(name.split('.'), schema);
