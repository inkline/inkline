import IFormGroup from '@inkline/inkline/src/components/FormGroup';

import SchemaProviderMixin from '@inkline/inkline/src/mixins/forms/providers/SchemaProviderMixin';

import EmitFocusMethodMixin from '@inkline/inkline/src/mixins/components/methods/EmitFocusMethodMixin';

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
