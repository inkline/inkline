import { defineComponent } from 'vue';
import {
    getValueByPath,
    setValueByPath,
    setValuesAlongPath,
    clone,
    uid
} from '@inkline/inkline/helpers';
import {
    colorVariantClass,
    defaultPropValue,
    sizePropValidator,
    FormComponentMixin
} from '@inkline/inkline/mixins';
import { validate } from '@inkline/inkline/validation';
import { Classes, InputElementEvent } from '@inkline/inkline/types';

/**
 * Slot for default card content
 * @name default
 * @kind slot
 */

const componentName = 'IForm';

export default defineComponent({
    name: componentName,
    mixins: [
        FormComponentMixin
    ],
    provide () {
        return {
            form: this
        };
    },
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the form
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * The disabled state of the form
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Display the form as inline
         * @type Boolean
         * @default false
         * @name inline
         */
        inline: {
            type: Boolean,
            default: false
        },
        /**
         * The loading state of the form
         * @type Boolean
         * @default false
         * @name loading
         */
        loading: {
            type: Boolean,
            default: false
        },
        /**
         * The unique identifier of the form
         * @type String
         * @default uid()
         * @name name
         */
        name: {
            type: String,
            default () {
                return uid('form');
            }
        },
        /**
         * Used to set the form schema
         * @type Boolean
         * @default false
         * @name modelValue
         */
        modelValue: {
            type: Object,
            default: () => null
        },
        /**
         * The readonly state of the form
         * @type Boolean
         * @default false
         * @name readonly
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * The size variant of the form
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        }
    },
    emits: [
        /**
         * Event emitted for setting the modelValue schema
         * @event update:modelValue
         */
        'update:modelValue',
        /**
         * Event emitted for submitting the form
         * @event submit
         */
        'submit'
    ],
    computed: {
        classes (): Classes {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
                '-disabled': this.isDisabled,
                '-readonly': this.isReadonly,
                '-inline': this.inline
            };
        },
        schema (): any {
            if (this.modelValue) {
                return this.modelValue;
            }

            return getValueByPath((this as any).formGroup.schema || (this as any).form.schema || {}, this.name);
        }
    },
    methods: {
        onBlur (name: string, event: InputElementEvent) {
            this.parent.onBlur?.(this.name ? `${this.name}.${name}` : name, event);

            if (this.modelValue) {
                let schema = clone(this.modelValue);

                schema = setValuesAlongPath(schema, name, { untouched: false, touched: true });

                if (this.shouldValidate(name, 'blur')) {
                    schema = validate(schema);
                }

                this.$emit('update:modelValue', schema);
            }
        },
        onInput (name: string, value: any) {
            this.parent.onInput?.(this.name ? `${this.name}.${name}` : name, value);

            if (this.modelValue) {
                let schema = clone(this.modelValue);

                schema = setValueByPath(schema, name, 'value', value);
                schema = setValuesAlongPath(schema, name, { pristine: false, dirty: true });

                if (this.shouldValidate(name, 'input')) {
                    schema = validate(schema);
                }

                this.$emit('update:modelValue', schema);
            }
        },
        onSubmit (event: InputElementEvent) {
            event.preventDefault();

            if (this.modelValue) {
                let schema = clone(this.modelValue);

                schema = setValuesAlongPath(validate(schema), '', { untouched: false, touched: true });

                this.$emit('update:modelValue', schema);

                if (schema.invalid) {
                    return;
                }
            }

            this.$emit('submit', event);
        },
        shouldValidate (path: string, eventName: string): boolean {
            const targetSchema = getValueByPath(this.modelValue, path);
            const events = targetSchema.validateOn
                ? [].concat(targetSchema.validateOn)
                : this.$inkline.options.validateOn;

            return events!.includes(eventName);
        }
    }
});
