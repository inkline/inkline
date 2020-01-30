import ILinkable from '../Linkable';
import ILoader from '../Loader';

import AttributesProviderMixin from '@inkline/inkline/src/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';
import InjectParentFormProviderMixin from '@inkline/inkline/src/mixins/forms/providers/InjectParentFormProviderMixin';

import EmitClickMethodMixin from '@inkline/inkline/src/mixins/components/methods/EmitClickMethodMixin';
import EmitFocusMethodMixin from '@inkline/inkline/src/mixins/components/methods/EmitFocusMethodMixin';
import EmitHoverMethodMixin from '@inkline/inkline/src/mixins/components/methods/EmitHoverMethodMixin';

import DisabledPropertyMixin from '@inkline/inkline/src/mixins/forms/properties/DisabledPropertyMixin';
import LoadingPropertyMixin from '@inkline/inkline/src/mixins/components/properties/LoadingPropertyMixin';
import SizePropertyMixin from '@inkline/inkline/src/mixins/components/properties/SizePropertyMixin';
import TabIndexPropertyMixin from '@inkline/inkline/src/mixins/components/properties/TabIndexPropertyMixin';
import VariantPropertyMixin from '@inkline/inkline/src/mixins/components/properties/VariantPropertyMixin';

export default {
    name: 'IButton',
    extends: ILinkable,
    components: {
        ILoader,
    },
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        InjectParentFormProviderMixin,

        EmitClickMethodMixin,
        EmitFocusMethodMixin,
        EmitHoverMethodMixin,

        DisabledPropertyMixin,
        LoadingPropertyMixin,
        SizePropertyMixin,
        TabIndexPropertyMixin,
        VariantPropertyMixin
    ],
    props: {
        block: {
            type: Boolean,
            default: false
        },
        circle: {
            type: Boolean,
            default: false
        },
        link: {
            type: Boolean,
            default: false
        },
        outline: {
            type: Boolean,
            default: false
        },
        tag: {
            type: String,
            default: 'button'
        }
    },
    created() {
        this.classesProvider.add(() => ({
            '-block': this.block,
            '-circle': this.circle,
            '-link': this.link,
            '-outline': this.outline
        }));

        this.attributesProvider.add(() => ({ 'aria-pressed': this.active ? 'true' : false }));
    }
};
