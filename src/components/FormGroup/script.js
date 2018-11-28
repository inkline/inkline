import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import InjectParentFormProviderMixin from 'inkline/mixins/forms/providers/InjectParentFormProviderMixin';

import EmitInputMethodMixin from 'inkline/mixins/components/methods/EmitInputMethodMixin';

import DisabledPropertyMixin from 'inkline/mixins/forms/properties/DisabledPropertyMixin';
import LabelPositionPropertyMixin from 'inkline/mixins/forms/properties/LabelPositionPropertyMixin';
import LoadingPropertyMixin from 'inkline/mixins/components/properties/LoadingPropertyMixin';
import ParentFormGroupPropertyMixin from 'inkline/mixins/forms/properties/ParentFormGroupPropertyMixin';
import ReadonlyPropertyMixin from 'inkline/mixins/forms/properties/ReadonlyPropertyMixin';
import SizePropertyMixin from 'inkline/mixins/components/properties/SizePropertyMixin';
import TabIndexPropertyMixin from 'inkline/mixins/components/properties/TabIndexPropertyMixin';

export default {
    name: 'IFormGroup',
    props: {
        value: {}
    },
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        InjectParentFormProviderMixin,

        EmitInputMethodMixin,

        DisabledPropertyMixin,
        LabelPositionPropertyMixin,
        LoadingPropertyMixin,
        ParentFormGroupPropertyMixin,
        ReadonlyPropertyMixin,
        SizePropertyMixin,
        TabIndexPropertyMixin
    ]
};
