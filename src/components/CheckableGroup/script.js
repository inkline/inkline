import IFormGroup from 'inkline/components/FormGroup';

import SchemaProviderMixin from 'inkline/mixins/forms/providers/SchemaProviderMixin';

import EmitFocusMethodMixin from 'inkline/mixins/components/methods/EmitFocusMethodMixin';

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
    created () {
        this.$on('change', value => {
            this.emitInput(value);
        });
    }
};
