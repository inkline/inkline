import { getValueByPath } from '@inkline/inkline/src/helpers';

/**
 * @name default
 * @kind slot
 * @description Slot for default form error content
 */

const componentName = 'IFormError';

export default {
    name: componentName,
    inject: {
        formGroup: {
            default: () => ({})
        },
        form: {
            default: () => ({})
        }
    },
    props: {
        /**
         * @description The schema path of the target input to show the errors for.
         * @type String
         * @default
         */
        for: {
            type: String,
            default: ''
        },
        /**
         * @description Set the validation statuses for which the form error should be visible.
         * @type Array | String
         * @default ['touched', 'dirty', 'invalid']
         */
        visible: {
            type: [Array, String],
            default: () => ['touched', 'dirty', 'invalid']
        }
    },
    computed: {
        parent() {
            if (this.formGroup.$) {
                return this.formGroup;
            }

            return this.form;
        },
        schema() {
            if (this.for !== '') {
                return getValueByPath(this.parent.schema || {}, `${this.for}`);
            }

            return this.parent.schema || {};
        },
        errors() {
            return this.schema.errors || [];
        },
        isVisible() {
            let visible = true;

            if (this.schema && this.visible) {
                [].concat(this.visible).forEach((status) => {
                    visible = visible && this.schema[status];
                });
            }

            return visible;
        }
    }
};
