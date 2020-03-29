import IFormError from '@inkline/inkline/src/components/FormError';

import AttributesProviderMixin from '@inkline/inkline/src/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';
import InjectParentFormProviderMixin from '@inkline/inkline/src/mixins/forms/providers/InjectParentFormProviderMixin';
import ModelGroupProviderMixin from '@inkline/inkline/src/mixins/forms/providers/ModelGroupProviderMixin';

import ClickInputRefMethodMixin from '@inkline/inkline/src/mixins/forms/methods/ClickInputRefMethodMixin';
import EmitClickMethodMixin from '@inkline/inkline/src/mixins/components/methods/EmitClickMethodMixin';
import EmitFocusMethodMixin from '@inkline/inkline/src/mixins/components/methods/EmitFocusMethodMixin';
import EmitInputMethodMixin from '@inkline/inkline/src/mixins/components/methods/EmitInputMethodMixin';

import CustomPropertyMixin from '@inkline/inkline/src/mixins/components/properties/CustomPropertyMixin';
import DisabledPropertyMixin from '@inkline/inkline/src/mixins/forms/properties/DisabledPropertyMixin';
import ParentFormGroupPropertyMixin from '@inkline/inkline/src/mixins/forms/properties/ParentFormGroupPropertyMixin';
import ReadonlyPropertyMixin from '@inkline/inkline/src/mixins/forms/properties/ReadonlyPropertyMixin';
import SizePropertyMixin from '@inkline/inkline/src/mixins/components/properties/SizePropertyMixin';
import TabIndexPropertyMixin from '@inkline/inkline/src/mixins/components/properties/TabIndexPropertyMixin';
import VariantPropertyMixin from "@inkline/inkline/src/mixins/components/properties/VariantPropertyMixin";

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

        ClickInputRefMethodMixin,
        EmitClickMethodMixin,
        EmitFocusMethodMixin,
        EmitInputMethodMixin,

        CustomPropertyMixin,
        DisabledPropertyMixin,
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
