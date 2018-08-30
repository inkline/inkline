import ClickableFormItem from '../../mixins/forms/methods/ClickMethodMixin';
import DisableableFormItem from '../../mixins/forms/properties/DisabledPropertyMixin';
import FocusableFormItem from '../../mixins/components/methods/OnFocusMethodMixin';
import InjectableFormItem from '../../mixins/forms/providers/InjectParentFormProviderMixin';
import TabableFormItem from '../../mixins/components/properties/TabIndexPropertyMixin';

import AttributableComponent from '../../mixins/components/providers/AttributesProviderMixin';
import ClassableComponent from '../../mixins/components/providers/ClassesProviderMixin';
import ClickableComponent from '../../mixins/components/methods/OnClickMethodMixin';
import FocusableComponent from '../../mixins/components/methods/OnFocusMethodMixin';
import HoverableComponent from '../../mixins/components/methods/OnHoverMethodMixin';
import LoadableComponent from '../../mixins/components/properties/LoadingPropertyMixin';
import SizeableComponent from '../../mixins/components/properties/SizePropertyMixin';

export default {
    name: 'ButtonGroup',
    mixins: [
        ClickableFormItem,
        DisableableFormItem,
        FocusableFormItem,
        InjectableFormItem,
        TabableFormItem,

        AttributableComponent,
        ClassableComponent,
        ClickableComponent,
        FocusableComponent,
        HoverableComponent,
        LoadableComponent,
        SizeableComponent
    ],
    props: {
        /**
         * Modifiers
         */
        vertical: {
            type: Boolean,
            default: false
        }
    },
    created () {
        if (this.classesProvider) {
            this.classesProvider['root'].push(() => ({ '-vertical': this.vertical }));
        }
    }
};
