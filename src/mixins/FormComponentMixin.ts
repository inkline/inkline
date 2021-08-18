import { defineComponent } from 'vue';
import { getValueByPath } from '@inkline/inkline/src/helpers';

export default defineComponent({
    inject: {
        formGroup: {
            default: (): any => ({})
        },
        form: {
            default: (): any => ({})
        }
    },
    computed: {
        isDisabled(): boolean {
            return (this as any).disabled || (this as any).form.isDisabled || (this as any).formGroup.isDisabled;
        },
        isReadonly(): boolean {
            return (this as any).readonly || (this as any).form.isReadonly || (this as any).formGroup.isReadonly;
        },
        parent(): any {
            if ((this as any).formGroup.$) {
                return (this as any).formGroup;
            }

            return (this as any).form;
        },
        schema(): any {
            if ((this as any).name !== '') {
                return getValueByPath((this as any).parent.schema || {}, `${(this as any).name}`);
            }

            return (this as any).parent.schema || {};
        }
    }
});
