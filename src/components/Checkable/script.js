import ClassesProviderMixin from '../../mixins/components/providers/ClassesProviderMixin';
import InjectParentFormProviderMixin from '../../mixins/forms/providers/InjectParentFormProviderMixin';
import ModelGroupProviderMixin from '../../mixins/forms/providers/ModelGroupProviderMixin';

import ClickMethodMixin from '../../mixins/forms/methods/ClickMethodMixin';
import OnClickMethodMixin from '../../mixins/components/methods/OnClickMethodMixin';
import OnInputMethodMixin from '../../mixins/components/methods/OnInputMethodMixin';

import CustomPropertyMixin from '../../mixins/components/properties/CustomPropertyMixin';
import DisabledPropertyMixin from '../../mixins/forms/properties/DisabledPropertyMixin';
import IsGroupedPropertyMixin from '../../mixins/forms/properties/IsGroupedPropertyMixin';
import SizePropertyMixin from '../../mixins/components/properties/SizePropertyMixin';
import TabIndexPropertyMixin from '../../mixins/components/properties/TabIndexPropertyMixin';


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