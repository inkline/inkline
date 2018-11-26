import IFormGroup from 'inkline/components/FormGroup';

import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import InjectParentFormProviderMixin from 'inkline/mixins/forms/providers/InjectParentFormProviderMixin';
import ModelProviderMixin from 'inkline/mixins/forms/providers/ModelProviderMixin';

import ClickMethodMixin from 'inkline/mixins/forms/methods/ClickMethodMixin';
import FocusMethodMixin from 'inkline/mixins/forms/methods/FocusMethodMixin';
import OnChangeMethodMixin from 'inkline/mixins/components/methods/OnChangeMethodMixin';
import OnClickMethodMixin from 'inkline/mixins/components/methods/OnClickMethodMixin';
import OnFocusMethodMixin from 'inkline/mixins/components/methods/OnFocusMethodMixin';
import OnHoverMethodMixin from 'inkline/mixins/components/methods/OnHoverMethodMixin';
import OnInputMethodMixin from 'inkline/mixins/components/methods/OnInputMethodMixin';

import ClearablePropertyMixin from 'inkline/mixins/forms/properties/ClearablePropertyMixin';
import DisabledPropertyMixin from 'inkline/mixins/forms/properties/DisabledPropertyMixin';
import ParentFormGroupPropertyMixin from 'inkline/mixins/forms/properties/ParentFormGroupPropertyMixin';
import ReadonlyPropertyMixin from 'inkline/mixins/forms/properties/ReadonlyPropertyMixin';
import SizePropertyMixin from 'inkline/mixins/components/properties/SizePropertyMixin';
import TabIndexPropertyMixin from 'inkline/mixins/components/properties/TabIndexPropertyMixin';

export default {
    name: 'IInput',
    inheritAttrs: false,
    components: {
        IFormGroup
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
        ParentFormGroupPropertyMixin,
        ReadonlyPropertyMixin,
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
