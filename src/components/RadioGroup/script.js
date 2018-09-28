import InputGroup from '../InputGroup';

import AttributesProviderMixin from '../../mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '../../mixins/components/providers/ClassesProviderMixin';
import InjectParentFormProviderMixin from '../../mixins/forms/providers/InjectParentFormProviderMixin';

import DisabledPropertyMixin from '../../mixins/forms/properties/DisabledPropertyMixin';
import LoadingPropertyMixin from '../../mixins/components/properties/LoadingPropertyMixin';
import TabIndexPropertyMixin from '../../mixins/components/properties/TabIndexPropertyMixin';
import SizePropertyMixin from '../../mixins/components/properties/SizePropertyMixin';

export default {
    name: 'RadioGroup',
    extends: InputGroup,
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        InjectParentFormProviderMixin,

        DisabledPropertyMixin,
        LoadingPropertyMixin,
        SizePropertyMixin,
        TabIndexPropertyMixin
    ],
    created () {
        this.$on('change', value => {
            this.onInput(value);
        });
    }
};
