import IFormError from '@inkline/inkline/src/components/IFormError';
import {
    AttributesProviderMixin,
    ClassesProviderMixin,
    InjectParentFormProviderMixin,
    ModelGroupProviderMixin,
    ClickInputRefMethodMixin,
    EmitClickMethodMixin,
    EmitFocusMethodMixin,
    EmitInputMethodMixin,
    CustomPropertyMixin,
    DisabledFormPropertyMixin,
    ParentFormGroupPropertyMixin,
    ReadonlyPropertyMixin,
    SizePropertyMixin,
    TabIndexPropertyMixin,
    VariantPropertyMixin
} from '@inkline/inkline/src/mixins';
import { SchemaProviderMixin } from '@inkline/inkline/src/mixins';

export default {
    name: 'ICheckable',
    components: {
        IFormError
    },
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        InjectParentFormProviderMixin,
        ModelGroupProviderMixin,
        SchemaProviderMixin,

        ClickInputRefMethodMixin,
        EmitClickMethodMixin,
        EmitFocusMethodMixin,
        EmitInputMethodMixin,

        CustomPropertyMixin,
        DisabledFormPropertyMixin,
        ReadonlyPropertyMixin,
        ParentFormGroupPropertyMixin,
        SizePropertyMixin,
        TabIndexPropertyMixin,
        VariantPropertyMixin
    ],
    methods: {
        onBlur(e) {
            this.emitBlur(e);

            if (this.isGrouped) {
                this.parentFormGroup.emitBlur(e);
            }
        },
        onFocus(e) {
            this.emitFocus(e);

            if (this.isGrouped) {
                this.parentFormGroup.emitFocus(e);
            }
        }
    },
    props: {
        validate: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            parentFormGroupName: 'ICheckableGroup'
        }
    },
    computed: {
        name() {
            return this.isGrouped ? this.parentFormGroup.name : '';
        }
    },
    created() {
        this.classesProvider.add(() => ({
            '-disabled': this.isDisabled
        }));
    }
};
