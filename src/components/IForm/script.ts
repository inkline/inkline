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
 * @name default
 * @kind slot
 * @description Slot for default card content
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
         * @description The color variant of the form
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * @description The disabled state of the form
         * @type Boolean
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * @description Display the form as inline
         * @type Boolean
         * @default false
         */
        inline: {
            type: Boolean,
            default: false
        },
        /**
         * @description The loading state of the form
         * @type Boolean
         * @default false
         */
        loading: {
            type: Boolean,
            default: false
        },
        /**
         * @description The unique identifier of the form
         * @type String
         * @default uid()
         */
        name: {
            type: String,
            default () {
                return uid('form');
            }
        },
        /**
         * @description Used to set the form schema
         * @type Boolean
         * @default false
         */
        modelValue: {
            type: Object,
            default: () => null
        },
        /**
         * @description The readonly state of the form
         * @type Boolean
         * @default false
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * @description The size variant of the form
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        }
    },
    emits: [
        /**
         * @event update:modelValue
         * @description Event emitted for setting the modelValue schema
         */
        'update:modelValue',
        /**
         * @event submit
         * @description Event emitted for submitting the form
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
                let schema = this.modelValue;

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

                schema = validate(schema);

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
