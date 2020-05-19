import * as validators from "@inkline/inkline/src/validators";

export class FormBuilder {
    static defaultFormState = {
        touched: false,
        untouched: true,
        dirty: false,
        pristine: true,
        invalid: false,
        valid: true,
        errors: {}
    };

    static defaultFormControlState = {
        value: '',
        validateOn: 'input'
    };

    /**
     * Array of reserved schema field names
     *
     * @type {string[]}
     */
    static reservedSchemaFields = [
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


    /**
     * Returns an array of the input's parent schemas starting from the root, and ending with the
     * input itself's schema.
     *
     * @param schema
     * @param rootSchema
     */
    static getSchemaList(schema, rootSchema) {
        if (schema === rootSchema) { return [schema]; }

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
    static isValidFormGroupSchema(schema) {
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
     *
     * @param value
     * @param validator
     * @returns {string}
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

    /**
     * Creates a form control schema
     *
     * @param name
     * @param schema
     * @param options
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
    static formControl(name, schema, options = {}) {
        schema = {
            ...FormBuilder.defaultFormControlState,
            ...FormBuilder.defaultFormState,
            ...schema,
            name,
            validators: schema.validators || []
        };

        // Set all validators as enabled by default
        for (let validator of schema.validators) {
            if (!validator.hasOwnProperty('enabled')) {
                validator.enabled = true;
            }
        }

        // Provide getSchema for field validation
        const buildOptions = options.getSchema ? { getSchema: options.getSchema } : {};

        return Object.assign(schema, {
            /**
             * set the schema and all its parent schemas as touched
             *
             * @param options
             * @returns {boolean}
             */
            touch(options = {}) {
                const rootSchema = options.getSchema ? options.getSchema() : buildOptions.getSchema();

                FormBuilder.getSchemaList(schema, rootSchema).forEach((schemaListItem) => {
                    schemaListItem.touched = true;
                    schemaListItem.untouched = false;
                });

                return true;
            },

            /**
             * Validate the current value by performing all the specified validation functions on it
             *
             * @param value
             * @param options
             * @returns {{valid: boolean, errors: {length: number}}}
             */
            validate(value, options = {}) {
                const rootSchema = options.getSchema ? options.getSchema() : buildOptions.getSchema();

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
                        validator.enabled() : validator.enabled;

                    // Validator rule gets called with value, validator options and root schema options
                    if (validatorEnabled && !validators[validator.rule](value, validator, rootSchema)) {
                        errors[validator.rule] = validator.message || FormBuilder.getErrorMessage(value, validator);
                        errors.length += 1;
                        valid = false;
                    }
                }

                /**
                 * Set validation status for each parent schema
                 */
                FormBuilder.getSchemaList(schema, rootSchema).forEach((schemaListItem, index) => {
                    schemaListItem.errors = errors;
                    schemaListItem.valid = index === 0 ? valid : FormBuilder.isValidFormGroupSchema(schemaListItem);
                    schemaListItem.invalid = !schemaListItem.valid;
                    schemaListItem.dirty = true;
                    schemaListItem.pristine = false;
                });

                return {
                    valid,
                    errors
                }
            }
        });
    }

    /**
     * Creates a form schema by going through all the fields
     *
     * @param name
     * @param schema
     * @param options
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
    static form(name, schema, options = {}) {
        const nameNesting = name === '' ? [] : name.split('.');
        const fields = Object.keys(schema);

        // Clone the provided schema to make sure we're working on a clean copy
        // without modifying the provided arguments.
        schema = schema.constructor === Array ? schema.slice(0) : { ...schema };

        // Set schema fields
        schema.name = name;
        schema.fields = fields;

        // Set current form as root schema
        const buildOptions = options.getSchema || options.root ? {
            getSchema: options.root ? (() => schema) : options.getSchema
        } : {};

        // Check for reserved schema fields and recursively construct child schema fields
        fields.forEach((fieldName) => {
            if (FormBuilder.reservedSchemaFields.indexOf(fieldName) !== -1) {
                throw new Error(`The field name "${fieldName}" is a reserved Inkline Form Validation field name. Please provide a different name.`);
            }

            const fieldSchema = schema[fieldName];
            const schemaHasFormControlProperties = ['validators', 'value'].some((key) => fieldSchema.hasOwnProperty(key));
            const schemaIsEmptyObject = Object.keys(fieldSchema).length === 0;
            const schemaIsArray = fieldSchema.constructor === Array;
            const schemaIsGroup = !(schemaHasFormControlProperties || schemaIsEmptyObject) || schemaIsArray;

            // Verify if schema is a form control or a form group. Form controls can be empty objects, can have either
            // a 'validators' or a 'value' field. Form groups are arrays or have multiple user-defined keys
            schema[fieldName] = FormBuilder.build(nameNesting.concat([fieldName]).join('.'), fieldSchema, {
                ...buildOptions, group: schemaIsGroup,
            });
        });

        // Add schema state properties. When handling array form groups, we add the schema fields as
        // custom array properties in order to keep the array iterator intact
        Object.keys(FormBuilder.defaultFormState)
            .forEach((property) => schema[property] = FormBuilder.defaultFormState[property]);

        /**
         * Validate the current group by performing all validation functions on its child fields
         *
         * @param options
         * @returns {{valid: boolean}}
         */
        schema.validate = (options = {}) => {
            for (const key in schema) {
                if (schema.hasOwnProperty(key) && schema[key] && schema[key].validate) {
                    if (schema[key].fields) {
                        schema[key].validate({ ...buildOptions, ...options });
                    } else {
                        schema[key].validate(schema[key].value, { ...buildOptions, ...options });
                    }
                }
            }

            return {
                valid: schema.valid
            };
        };

        if (schema.constructor === Array) {
            return Object.assign(schema, {
                /**
                 * Push an item into the Array schema
                 *
                 * @param item
                 * @param options
                 */
                add(item, options = {}) {
                    schema.push(FormBuilder.build(nameNesting.concat([schema.length]).join('.'), item, {
                        ...buildOptions, ...options
                    }));
                    schema.fields.push((schema.length - 1).toString());
                },

                /**
                 * Add an item into the Array schema at the given index, after removing n elements
                 *
                 * @param start
                 * @param deleteCount
                 * @param item
                 * @param options
                 */
                remove(start, deleteCount, item, options = {}) {
                    if (item) {
                        schema.splice(start, deleteCount, FormBuilder.build(nameNesting.concat([start]).join('.'), item, {
                            ...buildOptions, ...options
                        }));
                        schema.fields.splice(start, deleteCount, start);
                    } else {
                        schema.splice(start, deleteCount);
                        schema.fields.splice(start, deleteCount);
                    }

                    for (let index = start; index < schema.length; index += 1) {
                        schema[index].name = schema[index].name.replace(/[0-9]+$/, index);
                        schema.fields[index] = index.toString();
                    }
                }
            });
        }

        return Object.assign(schema, {
            /**
             * Set a field with the given name and definition on the schema
             *
             * @param name
             * @param item
             * @param options
             */
            set(name, item, options={}) {
                if (!options.instance) {
                    throw new Error('Please make sure you provide the Vue instance inside the options object as options.instance.');
                }

                options.instance.$set(schema, 'fields', schema.fields.concat([name]));
                options.instance.$set(schema, name, FormBuilder.build(nameNesting.concat([name]).join('.'), item, {
                    ...buildOptions, ...options
                }));
            }
        });
    }


    /**
     * If grouped, return a new form group. Otherwise, return a form control
     *
     * @param name
     * @param schema
     * @param options
     * @returns {*}
     */
    static build(name, schema, options) {
        return options.group ? FormBuilder.form(name, schema, options) : FormBuilder.formControl(name, schema, options);
    }
}
