import { defineComponent } from 'vue';
import { getValueByPath } from '@inkline/inkline/helpers';

/**
 * @name default
 * @kind slot
 * @description Slot for default form error content
 */

const componentName = 'IFormError';

export default defineComponent({
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
            default: (): string[] => ['touched', 'dirty', 'invalid']
        }
    },
    computed: {
        parent(): any {
            if ((this as any).formGroup.$) {
                return (this as any).formGroup;
            }

            return (this as any).form;
        },
        schema(): any {
            if (this.for !== '') {
                return getValueByPath(this.parent.schema || {}, `${this.for}`);
            }

            return this.parent.schema || {};
        },
        errors(): any {
            return this.schema.errors || [];
        },
        isVisible(): boolean {
            let visible = true;

            if (this.schema && this.visible) {
                ([] as string[]).concat(this.visible as string[]).forEach((status) => {
                    visible = visible && this.schema[status];
                });
            }

            return visible;
        }
    }
});
