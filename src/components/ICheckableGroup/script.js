import IFormGroup from '@inkline/inkline/src/components/IFormGroup';
import { EmitFocusMethodMixin } from '@inkline/inkline/src/mixins';
import { SchemaProviderMixin } from '@inkline/inkline/src/mixins';

export default {
    name: 'ICheckableGroup',
    extends: IFormGroup,
    mixins: [
        SchemaProviderMixin,

        EmitFocusMethodMixin
    ],
    props: {
        value: {}
    },
    created() {
        this.$on('change', (value) => {
            this.emitInput(value);
        });
    }
};
