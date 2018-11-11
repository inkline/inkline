import ClickOutside from '../../directives/click-outside';

import { uid } from '../../helpers/unique-id';

// import Emitter from 'element-ui/src/mixins/emitter';
import AttributesProviderMixin from '../../mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '../../mixins/components/providers/ClassesProviderMixin';

import OnFocusMethodMixin from '../../mixins/components/methods/OnFocusMethodMixin';

import VariantPropertyMixin from '../../mixins/components/properties/VariantPropertyMixin';
import DisabledPropertyMixin from '../../mixins/components/properties/DisabledPropertyMixin';

export default {
    name: 'DropdownMenu',
    inject: ['dropdown'],
    mixins: [Popper],
    props: {
        visibleArrow: {
            type: Boolean,
            default: true
        },
        arrowOffset: {
            type: Number,
            default: 0
        }
    },
};
