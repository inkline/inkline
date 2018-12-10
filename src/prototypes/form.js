import * as validators from "inkline/validators";

export const defaultFormState = {
    touched: false,
    untouched: true,
    dirty: false,
    pristine: true,
    invalid: false,
    valid: true,
    errors: {}
};

/**
 * If grouped, return a new form group. Otherwise, return a form control
 *
 * @param isGroup
 * @param nameNesting
 * @param schema
 * @returns {*}
 */
export const formFactory = (nameNesting, schemaName, schema, isGroup) => isGroup ?
    form(nameNesting.concat([schemaName]), schema) :
    formControl(nameNesting.concat([schemaName]), schema);

/**
 * Creates a form control schema
 *
 * @param nameNesting
 * @param schema
 * @returns {{$name: string, $validate: (function(*=): {valid: boolean, errors: {length: number}}), value: string, validateOn: string, touched: boolean, untouched: boolean, dirty: boolean, pristine: boolean, invalid: boolean, valid: boolean, errors: {}}}
 * @private
 */
export function formControl(nameNesting=[], schema) {
    const $name = nameNesting.join('.');

    // Set all validators as enabled by default
    for (let validator of schema.validators) {
        if (!validator.hasOwnProperty('enabled')) {
            validator.enabled = true;
        }
    }

    /**
     * Validate the current value by performing all the specified validation functions on it
     *
     * @param value
     * @param options
     * @returns {{valid: boolean, errors: {length: number}}}
     */
    const $validate = (value, options) => {
        let valid = true;
        let errors = {
            length: 0
        };

        for (let validator of schema.validators) {
            if (!validators[validator.rule]) {
                throw new Error(`Invalid validation rule '${validator.rule}' provided.`);
            }

            // Validator enabled state can be a function
            const validatorEnabled = typeof validator.enabled === 'function' ?
                validator.enabled() :
                validator.enabled;

            // Validator rule gets called with value, validator options and root schema options
            if (validatorEnabled && !validators[validator.rule](value, validator, options)) {
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
        ...schema
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
export function form(nameNesting=[], schema) {
    const $name = nameNesting.join('.');

    Object.keys(schema).forEach((name) => {
        if (!schema.hasOwnProperty(name)) { return; }

        const schemaHasFormControlProperties = schema[name].hasOwnProperty('validators') ||
            schema[name].hasOwnProperty('value');
        const schemaIsEmptyObject = Object.keys(schema[name]).length === 0;
        const schemaIsArray = schema[name].constructor === Array;

        // Verify if schema is a form control or a form group. Form controls can be empty objects, can have either
        // a 'validators' or a 'value' field. Form groups are arrays or have multiple user-defined keys
        schema[name] = formFactory(nameNesting, name, schema[name],
            !(schemaHasFormControlProperties || schemaIsEmptyObject) || schemaIsArray);
    });

    // When handling array form groups, we add the schema fields as custom array properties in order to keep the
    // array iterator intact
    if (schema.constructor === Array) {
        schema.$name = $name;

        schema.$push = (item, options={}) => schema
            .push(formFactory(nameNesting, schema.length, item, options.group));

        schema.$splice = (start, deleteCount, item, options={}) => schema
            .splice(start, deleteCount, formFactory(nameNesting, start, item, options.group));

        Object.keys(defaultFormState).forEach((property) => schema[property] = defaultFormState[property]);

        return schema;
    }

    schema.$set = (name, item, options={}) => schema[name] = formFactory(nameNesting, name, item, options.group);

    return {
        $name,
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

    return form(nameNesting, schema);
}

// $form.control = (name, schema, parent) => formControl(parent.$name.split('.').concat(name), schema);
