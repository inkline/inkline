import BindableGroupedFormItem from '../../mixins/forms/providers/ModelGroupProviderMixin';
import ClickableFormItem from '../../mixins/forms/methods/ClickMethodMixin';
import CustomizableFormItem from '../../mixins/components/properties/CustomPropertyMixin';
import DisableableFormItem from '../../mixins/forms/properties/DisabledPropertyMixin';
import InjectableFormItem from '../../mixins/forms/providers/InjectParentFormProviderMixin';
import InputableFormItem from '../../mixins/components/methods/OnInputMethodMixin';
import GroupableFormItem from '../../mixins/forms/properties/IsGroupedPropertyProvider';
import TabableFormItem from '../../mixins/components/properties/TabIndexPropertyMixin';

import ClassableComponent from '../../mixins/components/providers/ClassesProviderMixin';
import SizeableComponent from '../../mixins/components/properties/SizePropertyMixin';

export default {
    mixins: [
        BindableGroupedFormItem,
        ClickableFormItem,
        CustomizableFormItem,
        DisableableFormItem,
        InjectableFormItem,
        InputableFormItem,
        GroupableFormItem,
        TabableFormItem,

        ClassableComponent,
        SizeableComponent
    ]
};