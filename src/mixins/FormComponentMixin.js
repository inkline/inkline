import { getValueByPath } from '@inkline/inkline/src/helpers';

export default {
    inject: {
        formGroup: {
            default: () => ({})
        },
        form: {
            default: () => ({})
        }
    },
    computed: {
        isDisabled() {
            return this.disabled || this.form.isDisabled || this.formGroup.isDisabled;
        },
        isReadonly() {
            return this.readonly || this.form.isReadonly || this.formGroup.isReadonly;
        },
        parent() {
            if (this.formGroup.$) {
                return this.formGroup;
            }

            return this.form;
        },
        schema() {
            if (this.name !== '') {
                return getValueByPath(this.parent.schema || {}, `${this.name}`);
            }

            return this.parent.schema || {};
        }
    }
}
