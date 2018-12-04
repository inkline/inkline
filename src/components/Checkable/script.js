import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import InjectParentFormProviderMixin from 'inkline/mixins/forms/providers/InjectParentFormProviderMixin';
import ModelGroupProviderMixin from 'inkline/mixins/forms/providers/ModelGroupProviderMixin';

import ClickMethodMixin from 'inkline/mixins/forms/methods/ClickInputRefMethodMixin';
import EmitClickMethodMixin from 'inkline/mixins/components/methods/EmitClickMethodMixin';
import EmitFocusMethodMixin from 'inkline/mixins/components/methods/EmitFocusMethodMixin';
import EmitInputMethodMixin from 'inkline/mixins/components/methods/EmitInputMethodMixin';

import CustomPropertyMixin from 'inkline/mixins/components/properties/CustomPropertyMixin';
import DisabledPropertyMixin from 'inkline/mixins/forms/properties/DisabledPropertyMixin';
import ParentFormGroupPropertyMixin from 'inkline/mixins/forms/properties/ParentFormGroupPropertyMixin';
import ReadonlyPropertyMixin from 'inkline/mixins/forms/properties/ReadonlyPropertyMixin';
import SizePropertyMixin from 'inkline/mixins/components/properties/SizePropertyMixin';
import TabIndexPropertyMixin from 'inkline/mixins/components/properties/TabIndexPropertyMixin';


export default {
    name: 'ICheckable',
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
            this.parentFormGroup.emitBlur(e);
        },
        onFocus(e) {
            this.emitFocus(e);
            this.parentFormGroup.emitFocus(e);
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