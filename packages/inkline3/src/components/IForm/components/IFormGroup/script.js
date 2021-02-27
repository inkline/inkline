import {
    sizePropValidator
} from '@inkline/inkline/src/mixins';
import { FormBuilder } from '@inkline/inkline/src/factories/FormBuilder';

/**
 * @name default
 * @kind slot
 * @description Slot for default form group content
 */

export default {
    name: 'IFormGroup',
    props: {
        /**
         * @description The disabled state of the form group
         * @type Boolean
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * @description Display the form group as inline
         * @type Boolean
         * @default false
         */
        inline: {
            type: Boolean,
            default: false
        },
        /**
         * @description The identifier of the form group
         * @type String
         * @default uid()
         */
        id: {
            type: String,
            default() {
                return uid('form-group');
            }
        },
        /**
         * @description The readonly state of the form group
         * @type Boolean
         * @default false
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * @description The size variant of the form group
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: '',
            validator: sizePropValidator
        }
    },
    inject: {
        formGroup: {
            default: () => {}
        },
        form: {
            default: () => {}
        }
    },
    data() {
        return {
            inputs: []
        };
    },
    computed: {
        classes() {
            return {
                '-disabled': this.disabled,
                '-readonly': this.readonly,
                '-inline': this.inline,
                '-error': this.input && this.input.schema?.$invalid,
                '-required': this.input.schema?.validators.some(v => v.name === 'required')
            }
        }
    }
};
