import * as validators from "@inkline/inkline/src/validators";

export class FormBuilder {
    defaultFormState = {
        touched: false,
        untouched: true,
        dirty: false,
        pristine: true,
        invalid: false,
        valid: true,
        errors: {}
    };

    defaultFormControlState = {
        value: '',
        validateOn: 'input'
    };

    reservedSchemaFields = [
        'name',
        'fields',
        'validate',
        'validateOn',
        'validators',
        'invalid',
        'valid',
        'touch',
        'touched',
        'untouched',
        'dirty',
        'pristine',
        'set',
        'add',
        'remove',
        'errors'
    ];

    validators = validators;

    /**
     * If grouped, return a new form group. Otherwise, return a form control
     *
     * @param isGroup
     * @param nameNesting
     * @param schema
     * @returns {*}
     */
    factory(nameNesting, schema, isGroup) {
        return isGroup ?
            this.form(nameNesting, schema) :
            this.formControl(nameNesting, schema);
    }

    /**
     * Creates a form control schema
     *
     * @param nameNesting
     * @param schema
     * @returns {{
     *      name: string,
     *      validate: (function(*=): {valid: boolean, errors: {length: number}}),
     *      value: string,
     *      validateOn: string,
     *      touched: boolean,
     *      untouched: boolean,
     *      dirty: boolean,
     *      pristine: boolean,
     *      invalid: boolean,
     *      valid: boolean,
     *      errors: {}
     * }}
     */
    formControl(nameNesting, schema) {
        schema = {
            ...this.defaultFormControlState,
            ...this.defaultFormState,
            ...schema
        };

        schema.name = nameNesting.join('.');

        // Set all validators as enabled by default
        for (let validator of (schema.validators || [])) {
            if (!validator.hasOwnProperty('enabled')) {
                validator.enabled = true;
            }
        }

        /**
         * set the schema and all its parent schemas as touched
         *
         * @param options
         * @returns {boolean}
         */
        schema.touch = (options) => {
            const schemaList = this.getSchemaList(schema, options.getSchema());

            schemaList.forEach((schemaListItem) => {
                schemaListItem.touched = true;
                schemaListItem.untouched = false;
            });

            return true;
        };

        /**
         * Validate the current value by performing all the specified validation functions on it
         *
         * @param value
         * @param options
         * @returns {{valid: boolean, errors: {length: number}}}
         */
        schema.validate = (value, options) => {
            let valid = true;
            let errors = {
                length: 0
            };

            for (let validator of (schema.validators || [])) {
                if (!this.validators[validator.rule]) {
                    throw new Error(`Invalid validation rule '${validator.rule}' provided.`);
                }

                // Validator enabled state can be a function
                const validatorEnabled = typeof validator.enabled === 'function' ?
                    validator.enabled() :
                    validator.enabled;

                // Validator rule gets called with value, validator options and root schema options
                if (validatorEnabled && !validators[validator.rule](value, validator, options)) {
                    errors[validator.rule] = validator.message || FormBuilder.getErrorMessage(value, validator);
                    errors.length += 1;
                    valid = false;
                }
            }

            /**
             * Set validation status for each parent schema
             */
            this.getSchemaList(schema, options.getSchema()).forEach((schemaListItem, index) => {
                schemaListItem.errors = errors;
                schemaListItem.valid = index === 0 ? valid : this.isValidFormGroupSchema(schemaListItem);
                schemaListItem.invalid = !schemaListItem.valid;
                schemaListItem.dirty = true;
                schemaListItem.pristine = false;
            });

            return {
                valid,
                errors
            }
        };

        return schema;
    }

    /**
     * Creates a form schema by going through all the fields
     *
     * @param nameNesting
     * @param schema
     * @returns {{
     *      id: string,
     *      group: boolean,
     *      touched: boolean,
     *      untouched: boolean,
     *      dirty: boolean,
     *      pristine: boolean,
     *      invalid: boolean,
     *      valid: boolean,
     *      errors: {}
     * }}
     */
    form(nameNesting, schema) {
        // Clone the provided schema to make sure we're working on a clean copy
        // without modifying the provided arguments.
        if (schema.constructor === Array) {
            schema = schema.slice(0);
        } else {
            schema = { ...schema };
        }

        // Set schema fields
        schema.fields = Object.keys(schema);

        schema.fields.forEach((name) => {
            if (this.reservedSchemaFields.indexOf(name) !== -1) {
                throw new Error(`The field name "${name}" is a reserved Inkline Form Validation field name. Please provide a different name.`);
            }
        });

        // Set schema id
        schema.name = nameNesting.join('.');

        // Recursively construct child schema fields
        schema.fields.forEach((name) => {
            const schemaHasFormControlProperties = schema[name].hasOwnProperty('validators') ||
                schema[name].hasOwnProperty('value');
            const schemaIsEmptyObject = Object.keys(schema[name]).length === 0;
            const schemaIsArray = schema[name].constructor === Array;

            // Verify if schema is a form control or a form group. Form controls can be empty objects, can have either
            // a 'validators' or a 'value' field. Form groups are arrays or have multiple user-defined keys
            schema[name] = this.factory(nameNesting.concat([name]), schema[name],
                !(schemaHasFormControlProperties || schemaIsEmptyObject) || schemaIsArray);
        });

        /**
         * Validate the current group by performing all validation functions on its child fields
         *
         * @param options
         * @returns {{valid: boolean, errors: {length: number}}}
         */
        schema.validate = (options) => {
            for (const key in schema) {
                if (schema.hasOwnProperty(key) && schema[key] && schema[key].validate) {
                    if (schema[key].fields) {
                        schema[key].validate(options);
                    } else {
                        schema[key].validate(schema[key].value, options);
                    }
                }
            }
        };

        // Add schema state properties. When handling array form groups, we add the schema fields as
        // custom array properties in order to keep the array iterator intact
        Object.keys(this.defaultFormState)
            .forEach((property) => schema[property] = this.defaultFormState[property]);

        if (schema.constructor === Array) {
            /**
             * Push an item into the Array schema
             *
             * @param item
             * @param options
             */
            schema.add = (item, options={}) => {
                schema.push(this.factory(nameNesting.concat([schema.length]), item, options.group));
                schema.fields.push(schema.length - 1);
            };

            /**
             * Add an item into the Array schema at the given index, after removing n elements
             *
             * @param start
             * @param deleteCount
             * @param item
             * @param options
             */
            schema.remove = (start, deleteCount, item, options={}) => {
                if (item) {
                    schema.splice(start, deleteCount, this.factory(nameNesting.concat([start]), item, options.group));
                    schema.fields.splice(start, deleteCount, start);
                } else {
                    schema.splice(start, deleteCount);
                    schema.fields.splice(start, deleteCount);
                }

                for (let index = start; index < schema.length; index += 1) {
                    schema[index].name = schema[index].name.replace(/[0-9]+$/, index);
                    schema.fields[index] = index.toString();
                }
            };

            return schema;
        }

        /**
         * Set a field with the given name and definition on the schema
         *
         * @param instance
         * @param name
         * @param item
         * @param options
         */
        schema.set = (name, item, options={}) => {
            if (!options.instance) {
                throw new Error('Please make sure you provide the Vue instance inside the options object as options.instance.');
            }

            options.instance.$set(schema, 'fields', schema.fields.concat([name]));
            options.instance.$set(schema, name, this.factory(
                nameNesting.concat([name]), item, options.group));
        };

        return schema;
    }

    /**
     * Returns an array of the input's parent schemas starting from the root, and ending with the
     * input itself's schema.
     *
     * @param schema
     * @param rootSchema
     */
    getSchemaList(schema, rootSchema) {
        const parentFormGroupKeys = schema.name
            .replace(/\[['"]?([^'"\]])['"]?]/g, '.$1')
            .split('.');

        const parentSchemaList = parentFormGroupKeys
            .map((group, index) => parentFormGroupKeys
                .slice(0, index)
                .reduce((acc, key) => acc && acc[key], rootSchema));

        if (!parentSchemaList[parentSchemaList.length - 1].hasOwnProperty(parentFormGroupKeys[parentFormGroupKeys.length - 1])) {
            throw new Error(`Could not retrieve schema tree for input with name ${schema.name}.`);
        }

        parentSchemaList.reverse();

        return [schema].concat(parentSchemaList);
    }

    /**
     * Check if all child fields of the group schema are valid
     *
     * @param schema
     * @returns {boolean}
     */
    isValidFormGroupSchema(schema) {
        return Object.keys(schema).reduce((groupValid, key) => {
            const schemaListItemValue = schema[key];

            if (typeof schemaListItemValue === 'object' && schemaListItemValue.hasOwnProperty('valid')) {
                groupValid = groupValid && schemaListItemValue.valid;
            }

            return groupValid;
        }, true);
    }

    /**
     * Return formatted default error messages for validators
     */
    static getErrorMessage(value, validator) {
        let content = '';
        let isMultiple = Array.isArray(value);

        switch (validator.rule) {
        case 'alpha':
            if (validator.allowDashes && validator.allowSpaces) {
                content = 'letters, dashes and spaces';
            } else if (validator.allowSpaces) {
                content = 'letters and spaces';
            } else if (validator.allowDashes) {
                content = 'letters and dashes';
            } else {
                content = 'letters';
            }

            return isMultiple ?
                `Please select options that contain ${content} only.` :
                `Please enter ${content} only.`;
        case 'alphanumeric':
            if (validator.allowDashes && validator.allowSpaces) {
                content = 'letters, numbers, dashes and spaces';
            } else if (validator.allowSpaces) {
                content = 'letters, numbers and spaces';
            } else if (validator.allowDashes) {
                content = 'letters, numbers and dashes';
            } else {
                content = 'letters and numbers';
            }

            return isMultiple ?
                `Please select options that contain ${content} only.` :
                `Please enter ${content} only.`;
        case 'number':
            if (validator.allowNegative && validator.allowDecimal) {
                content = 'positive or negative decimal numbers';
            } else if (validator.allowNegative) {
                content = 'positive or negative numbers';
            } else if (validator.allowDecimal) {
                content = 'decimal numbers';
            } else {
                content = 'numbers';
            }

            return isMultiple ?
                `Please select options that contain ${content} only.` :
                `Please enter ${content} only.`;
        case 'email':
            return isMultiple ?
                'Please select only valid email address.' :
                'Please enter a valid email address.';
        case 'max':
            return isMultiple ?
                `Please select values up to a maximum of ${validator.value}.` :
                `Please enter a value up to a maximum of ${validator.value}.`;
        case 'maxLength':
            return isMultiple ?
                `Please select up to ${validator.value} options.` :
                `Please enter up to ${validator.value} characters.`;
        case 'min':
            return isMultiple ?
                `Please select values up from a minimum of ${validator.value}.` :
                `Please enter a value up from a minimum of ${validator.value}.`;
        case 'minLength':
            return isMultiple ?
                `Please select at least ${validator.value} options.` :
                `Please enter at least ${validator.value} characters.`;
        case 'required':
            return isMultiple ?
                'Please select at least one option.' :
                'Please enter a value for this field.';
        case 'sameAs':
            return `Please make sure that the two values match.`;
        default:
            return 'Please enter a correct value for this field.';
        }
    }
}
