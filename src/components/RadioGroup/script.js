import IFormGroup from 'inkline/components/FormGroup';

import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import InjectParentFormProviderMixin from 'inkline/mixins/forms/providers/InjectParentFormProviderMixin';

import DisabledPropertyMixin from 'inkline/mixins/forms/properties/DisabledPropertyMixin';
import LoadingPropertyMixin from 'inkline/mixins/components/properties/LoadingPropertyMixin';
import TabIndexPropertyMixin from 'inkline/mixins/components/properties/TabIndexPropertyMixin';
import SizePropertyMixin from 'inkline/mixins/components/properties/SizePropertyMixin';

export default {
    name: 'IRadioGroup',
    extends: IFormGroup,
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
