import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import EmitProviderMixin from 'inkline/mixins/components/providers/EmitProviderMixin';

import ActivePropertyMixin from 'inkline/mixins/components/properties/ActivePropertyMixin';

export default {
    name: 'ISelectOption',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        EmitProviderMixin,

        ActivePropertyMixin,
    ],
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    methods: {
        onClick() {
            this.dispatch('ISelect', 'option-click', this.value);
        }
    }
};