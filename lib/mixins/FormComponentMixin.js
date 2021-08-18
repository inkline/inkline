import { defineComponent } from 'vue';
import { getValueByPath } from '../helpers';
export default defineComponent({
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
});
//# sourceMappingURL=FormComponentMixin.js.map