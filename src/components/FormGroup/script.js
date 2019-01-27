import AttributesProviderMixin from '@inkline/inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/mixins/components/providers/ClassesProviderMixin';
import InjectParentFormProviderMixin from '@inkline/inkline/mixins/forms/providers/InjectParentFormProviderMixin';

import EmitInputMethodMixin from '@inkline/inkline/mixins/components/methods/EmitInputMethodMixin';

import DisabledPropertyMixin from '@inkline/inkline/mixins/forms/properties/DisabledPropertyMixin';
import LoadingPropertyMixin from '@inkline/inkline/mixins/components/properties/LoadingPropertyMixin';
import NamePropertyMixin from '@inkline/inkline/mixins/forms/properties/NamePropertyMixin';
import ParentFormGroupPropertyMixin from '@inkline/inkline/mixins/forms/properties/ParentFormGroupPropertyMixin';
import ReadonlyPropertyMixin from '@inkline/inkline/mixins/forms/properties/ReadonlyPropertyMixin';
import SizePropertyMixin from '@inkline/inkline/mixins/components/properties/SizePropertyMixin';
import TabIndexPropertyMixin from '@inkline/inkline/mixins/components/properties/TabIndexPropertyMixin';

export default {
    name: 'IFormGroup',
    props: {
        inline: {
            type: Boolean,
            default: false
        }
    },
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        InjectParentFormProviderMixin,

        EmitInputMethodMixin,

        DisabledPropertyMixin,
        LoadingPropertyMixin,
        NamePropertyMixin,
        ParentFormGroupPropertyMixin,
        ReadonlyPropertyMixin,
        SizePropertyMixin,
        TabIndexPropertyMixin
    ],
    created() {
        this.classesProvider.add(() => ({ '-inline': this.inline }));
    }
};
