import InputGroup from '../InputGroup';

import BindableIndividualFormItem from '../../mixins/forms/providers/ModelProviderMixin';
import ClearableFormItem from '../../mixins/forms/properties/ClearablePropertyMixin';
import ClickableFormItem from '../../mixins/forms/methods/ClickMethodMixin';
import DisableableFormItem from '../../mixins/forms/properties/DisabledPropertyMixin';
import FocusableFormItem from '../../mixins/components/methods/OnFocusMethodMixin';
import GroupableFormItem from '../../mixins/forms/properties/IsGroupedPropertyProvider';
import InjectableFormItem from '../../mixins/forms/providers/InjectParentFormProviderMixin';
import InputableFormItem from '../../mixins/components/methods/OnInputMethodMixin';
import LabelableFormItem from '../../mixins/forms/properties/LabelPositionPropertyMixin';
import TabableFormItem from '../../mixins/components/properties/TabIndexPropertyMixin';

import ChangeableComponent from '../../mixins/components/methods/OnChangeMethodMixin';
import ClassableComponent from '../../mixins/components/providers/ClassesProviderMixin';
import FocusableComponent from '../../mixins/components/methods/OnFocusMethodMixin';
import HoverableComponent from '../../mixins/components/methods/OnHoverMethodMixin';
import SizeableComponent from '../../mixins/components/properties/SizePropertyMixin';

export default {
    name: 'Input',
    inheritAttrs: false,
    extends: InputGroup,
    mixins: [
        BindableIndividualFormItem,
        ClearableFormItem,
        ClickableFormItem,
        DisableableFormItem,
        FocusableFormItem,
        GroupableFormItem,
        InjectableFormItem,
        InputableFormItem,
        LabelableFormItem,
        TabableFormItem,

        ChangeableComponent,
        ClassableComponent,
        FocusableComponent,
        HoverableComponent,
        SizeableComponent
    ],
    created () {
        if (this.classesProvider) {
            this.classesProvider['root'].push(() => ({
                '-prepended': this.$slots.prepend || this.prepended,
                '-appended': this.$slots.append || this.appended
            }));

            this.classesProvider['child'].push(() => ({
                '-prefixed': this.$slots.prefix || this.prefixed,
                '-suffixed': this.$slots.suffix || this.suffixed
            }));
        }
    }
};
