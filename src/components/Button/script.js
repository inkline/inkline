import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import InjectParentFormProviderMixin from 'inkline/mixins/forms/providers/InjectParentFormProviderMixin';

import EmitClickMethodMixin from 'inkline/mixins/components/methods/EmitClickMethodMixin';
import EmitFocusMethodMixin from 'inkline/mixins/components/methods/EmitFocusMethodMixin';
import EmitHoverMethodMixin from 'inkline/mixins/components/methods/EmitHoverMethodMixin';

import DisabledPropertyMixin from 'inkline/mixins/forms/properties/DisabledPropertyMixin';
import ActivePropertyMixin from 'inkline/mixins/components/properties/ActivePropertyMixin';
import LoadingPropertyMixin from 'inkline/mixins/components/properties/LoadingPropertyMixin';
import SizePropertyMixin from 'inkline/mixins/components/properties/SizePropertyMixin';
import TabIndexPropertyMixin from 'inkline/mixins/components/properties/TabIndexPropertyMixin';
import VariantPropertyMixin from 'inkline/mixins/components/properties/VariantPropertyMixin';

export default {
    name: 'IButton',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        InjectParentFormProviderMixin,

        EmitClickMethodMixin,
        EmitFocusMethodMixin,
        EmitHoverMethodMixin,

        ActivePropertyMixin,
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
        flat: {
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
        },

        /**
         * Icon
         */
        icon: {
            type: String,
            default: ''
        },
    },
    computed: {
        isTag () {
            return this.attributes.to ? 'router-link' : this.attributes.href ? 'a' : this.tag;
        }
    },
    created () {
        this.classesProvider.add(() => ({
            '-block': this.block,
            '-circle': this.circle,
            '-flat': this.flat,
            '-link': this.link,
            '-outline': this.outline
        }));

        this.attributesProvider.add(() => ({ 'aria-pressed': this.active ? 'true' : false }));
    }
};
