import IFormGroup from '@inkline/inkline/components/FormGroup';

import AttributesProviderMixin from '@inkline/inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/mixins/components/providers/ClassesProviderMixin';
import InjectParentFormProviderMixin from '@inkline/inkline/mixins/forms/providers/InjectParentFormProviderMixin';
import ModelProviderMixin from '@inkline/inkline/mixins/forms/providers/ModelProviderMixin';
import SchemaProviderMixin from '@inkline/inkline/mixins/forms/providers/SchemaProviderMixin';

import ClickInputRefMethodMixin from '@inkline/inkline/mixins/forms/methods/ClickInputRefMethodMixin';
import FocusInputRefMethodMixin from '@inkline/inkline/mixins/forms/methods/FocusInputRefMethodMixin';
import EmitChangeMethodMixin from '@inkline/inkline/mixins/components/methods/EmitChangeMethodMixin';
import EmitClickMethodMixin from '@inkline/inkline/mixins/components/methods/EmitClickMethodMixin';
import EmitFocusMethodMixin from '@inkline/inkline/mixins/components/methods/EmitFocusMethodMixin';
import EmitHoverMethodMixin from '@inkline/inkline/mixins/components/methods/EmitHoverMethodMixin';
import EmitInputMethodMixin from '@inkline/inkline/mixins/components/methods/EmitInputMethodMixin';
import EmitKeydownMethodMixin from '@inkline/inkline/mixins/components/methods/EmitKeydownMethodMixin';

import ClearablePropertyMixin from '@inkline/inkline/mixins/forms/properties/ClearablePropertyMixin';
import DisabledPropertyMixin from '@inkline/inkline/mixins/forms/properties/DisabledPropertyMixin';
import NamePropertyMixin from '@inkline/inkline/mixins/forms/properties/NamePropertyMixin';
import ParentFormGroupPropertyMixin from '@inkline/inkline/mixins/forms/properties/ParentFormGroupPropertyMixin';
import ReadonlyPropertyMixin from '@inkline/inkline/mixins/forms/properties/ReadonlyPropertyMixin';
import SizePropertyMixin from '@inkline/inkline/mixins/components/properties/SizePropertyMixin';
import TabIndexPropertyMixin from '@inkline/inkline/mixins/components/properties/TabIndexPropertyMixin';

export default {
    name: 'IInput',
    inheritAttrs: false,
    components: {
        IFormGroup
    },
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        InjectParentFormProviderMixin,
        ModelProviderMixin,
        SchemaProviderMixin,

        ClickInputRefMethodMixin,
        FocusInputRefMethodMixin,
        EmitChangeMethodMixin,
        EmitClickMethodMixin,
        EmitFocusMethodMixin,
        EmitHoverMethodMixin,
        EmitInputMethodMixin,
        EmitKeydownMethodMixin,

        ClearablePropertyMixin,
        DisabledPropertyMixin,
        NamePropertyMixin,
        ParentFormGroupPropertyMixin,
        ReadonlyPropertyMixin,
        SizePropertyMixin,
        TabIndexPropertyMixin
    ],
    created () {
        this.classesProvider.add('root', () => ({
            '-prepended': Boolean(this.$slots.prepend) || this.prepended,
            '-appended': Boolean(this.$slots.append) || this.appended
        }));

        this.classesProvider.add('child', () => ({
            '-prefixed': Boolean(this.$slots.prefix),
            '-suffixed': Boolean(this.$slots.suffix)
        }));
    }
};
