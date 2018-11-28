import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import InjectParentFormProviderMixin from 'inkline/mixins/forms/providers/InjectParentFormProviderMixin';
import ModelGroupProviderMixin from 'inkline/mixins/forms/providers/ModelGroupProviderMixin';

import ClickMethodMixin from 'inkline/mixins/forms/methods/ClickInputRefMethodMixin';
import EmitClickMethodMixin from 'inkline/mixins/components/methods/EmitClickMethodMixin';
import EmitInputMethodMixin from 'inkline/mixins/components/methods/EmitInputMethodMixin';

import CustomPropertyMixin from 'inkline/mixins/components/properties/CustomPropertyMixin';
import DisabledPropertyMixin from 'inkline/mixins/forms/properties/DisabledPropertyMixin';
import ParentFormGroupPropertyMixin from 'inkline/mixins/forms/properties/ParentFormGroupPropertyMixin';
import ReadonlyPropertyMixin from 'inkline/mixins/forms/properties/ReadonlyPropertyMixin';
import SizePropertyMixin from 'inkline/mixins/components/properties/SizePropertyMixin';
import TabIndexPropertyMixin from 'inkline/mixins/components/properties/TabIndexPropertyMixin';


export default {
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        InjectParentFormProviderMixin,
        ModelGroupProviderMixin,

        ClickMethodMixin,
        EmitClickMethodMixin,
        EmitInputMethodMixin,

        CustomPropertyMixin,
        DisabledPropertyMixin,
        ReadonlyPropertyMixin,
        ParentFormGroupPropertyMixin,
        SizePropertyMixin,
        TabIndexPropertyMixin
    ]
};