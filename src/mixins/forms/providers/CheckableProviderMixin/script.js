import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import InjectParentFormProviderMixin from 'inkline/mixins/forms/providers/InjectParentFormProviderMixin';
import ModelGroupProviderMixin from 'inkline/mixins/forms/providers/ModelGroupProviderMixin';

import ClickMethodMixin from 'inkline/mixins/forms/methods/ClickMethodMixin';
import OnClickMethodMixin from 'inkline/mixins/components/methods/OnClickMethodMixin';
import OnInputMethodMixin from 'inkline/mixins/components/methods/OnInputMethodMixin';

import CustomPropertyMixin from 'inkline/mixins/components/properties/CustomPropertyMixin';
import DisabledPropertyMixin from 'inkline/mixins/forms/properties/DisabledPropertyMixin';
import IsGroupedPropertyMixin from 'inkline/mixins/forms/properties/IsGroupedPropertyMixin';
import SizePropertyMixin from 'inkline/mixins/components/properties/SizePropertyMixin';
import TabIndexPropertyMixin from 'inkline/mixins/components/properties/TabIndexPropertyMixin';


export default {
    mixins: [
        ClassesProviderMixin,
        InjectParentFormProviderMixin,
        ModelGroupProviderMixin,

        ClickMethodMixin,
        OnClickMethodMixin,
        OnInputMethodMixin,

        CustomPropertyMixin,
        DisabledPropertyMixin,
        IsGroupedPropertyMixin,
        SizePropertyMixin,
        TabIndexPropertyMixin
    ]
};