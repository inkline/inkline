import IFormError from '@inkline/inkline/components/FormError';

import AttributesProviderMixin from '@inkline/inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/mixins/components/providers/ClassesProviderMixin';
import InjectParentFormProviderMixin from '@inkline/inkline/mixins/forms/providers/InjectParentFormProviderMixin';
import ModelGroupProviderMixin from '@inkline/inkline/mixins/forms/providers/ModelGroupProviderMixin';

import ClickMethodMixin from '@inkline/inkline/mixins/forms/methods/ClickInputRefMethodMixin';
import EmitClickMethodMixin from '@inkline/inkline/mixins/components/methods/EmitClickMethodMixin';
import EmitFocusMethodMixin from '@inkline/inkline/mixins/components/methods/EmitFocusMethodMixin';
import EmitInputMethodMixin from '@inkline/inkline/mixins/components/methods/EmitInputMethodMixin';

import CustomPropertyMixin from '@inkline/inkline/mixins/components/properties/CustomPropertyMixin';
import DisabledPropertyMixin from '@inkline/inkline/mixins/forms/properties/DisabledPropertyMixin';
import ParentFormGroupPropertyMixin from '@inkline/inkline/mixins/forms/properties/ParentFormGroupPropertyMixin';
import ReadonlyPropertyMixin from '@inkline/inkline/mixins/forms/properties/ReadonlyPropertyMixin';
import SizePropertyMixin from '@inkline/inkline/mixins/components/properties/SizePropertyMixin';
import TabIndexPropertyMixin from '@inkline/inkline/mixins/components/properties/TabIndexPropertyMixin';


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

        ClickMethodMixin,
        EmitClickMethodMixin,
        EmitFocusMethodMixin,
        EmitInputMethodMixin,

        CustomPropertyMixin,
        DisabledPropertyMixin,
        ReadonlyPropertyMixin,
        ParentFormGroupPropertyMixin,
        SizePropertyMixin,
        TabIndexPropertyMixin
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
    }
};