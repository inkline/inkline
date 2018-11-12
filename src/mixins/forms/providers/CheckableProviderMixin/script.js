import ClassesProviderMixin from '../../../components/providers/ClassesProviderMixin';
import InjectParentFormProviderMixin from '../InjectParentFormProviderMixin';
import ModelGroupProviderMixin from '../ModelGroupProviderMixin';

import ClickMethodMixin from '../../methods/ClickMethodMixin';
import OnClickMethodMixin from '../../../components/methods/OnClickMethodMixin';
import OnInputMethodMixin from '../../../components/methods/OnInputMethodMixin';

import CustomPropertyMixin from '../../../components/properties/CustomPropertyMixin';
import DisabledPropertyMixin from '../../properties/DisabledPropertyMixin';
import IsGroupedPropertyMixin from '../../properties/IsGroupedPropertyMixin';
import SizePropertyMixin from '../../../components/properties/SizePropertyMixin';
import TabIndexPropertyMixin from '../../../components/properties/TabIndexPropertyMixin';


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