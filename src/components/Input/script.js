import InputGroup from '../InputGroup';

import ClassesProviderMixin from '../../mixins/components/providers/ClassesProviderMixin';
import InjectParentFormProviderMixin from '../../mixins/forms/providers/InjectParentFormProviderMixin';
import ModelProviderMixin from '../../mixins/forms/providers/ModelProviderMixin';

import ClickMethodMixin from '../../mixins/forms/methods/ClickMethodMixin';
import FocusMethodMixin from '../../mixins/forms/methods/FocusMethodMixin';
import OnChangeMethodMixin from '../../mixins/components/methods/OnChangeMethodMixin';
import OnClickMethodMixin from '../../mixins/components/methods/OnClickMethodMixin';
import OnFocusMethodMixin from '../../mixins/components/methods/OnFocusMethodMixin';
import OnHoverMethodMixin from '../../mixins/components/methods/OnHoverMethodMixin';
import OnInputMethodMixin from '../../mixins/components/methods/OnInputMethodMixin';

import ClearablePropertyMixin from '../../mixins/forms/properties/ClearablePropertyMixin';
import DisabledPropertyMixin from '../../mixins/forms/properties/DisabledPropertyMixin';
import IsGroupedPropertyMixin from '../../mixins/forms/properties/IsGroupedPropertyMixin';
import LabelPositionPropertyMixin from '../../mixins/forms/properties/LabelPositionPropertyMixin';
import SizePropertyMixin from '../../mixins/components/properties/SizePropertyMixin';
import TabIndexPropertyMixin from '../../mixins/components/properties/TabIndexPropertyMixin';

export default {
    name: 'Input',
    inheritAttrs: false,
    components: {
        IInputGroup: InputGroup
    },
    mixins: [
        ClassesProviderMixin,
        InjectParentFormProviderMixin,
        ModelProviderMixin,

        ClickMethodMixin,
        FocusMethodMixin,
        OnChangeMethodMixin,
        OnClickMethodMixin,
        OnFocusMethodMixin,
        OnHoverMethodMixin,
        OnInputMethodMixin,

        ClearablePropertyMixin,
        DisabledPropertyMixin,
        IsGroupedPropertyMixin,
        LabelPositionPropertyMixin,
        SizePropertyMixin,
        TabIndexPropertyMixin
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
