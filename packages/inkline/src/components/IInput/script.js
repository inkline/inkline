import IFormGroup from '@inkline/inkline/src/components/IFormGroup';
import {
    AttributesProviderMixin,
    ClassesProviderMixin,
    InjectParentFormProviderMixin,
    ModelProviderMixin,
    ClickInputRefMethodMixin,
    FocusInputRefMethodMixin,
    EmitChangeMethodMixin,
    EmitClickMethodMixin,
    EmitFocusMethodMixin,
    EmitHoverMethodMixin,
    EmitInputMethodMixin,
    EmitKeydownMethodMixin,
    ClearablePropertyMixin,
    DisabledFormPropertyMixin,
    NamePropertyMixin,
    ParentFormGroupPropertyMixin,
    ReadonlyPropertyMixin,
    SizePropertyMixin,
    TabIndexPropertyMixin,
    VariantPropertyMixin,
    SchemaProviderMixin
} from '@inkline/inkline/src/mixins';

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
        DisabledFormPropertyMixin,
        NamePropertyMixin,
        ParentFormGroupPropertyMixin,
        ReadonlyPropertyMixin,
        SizePropertyMixin,
        TabIndexPropertyMixin,
        VariantPropertyMixin
    ],
    created() {
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
