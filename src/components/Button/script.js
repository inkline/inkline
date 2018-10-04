import AttributesProviderMixin from '../../mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '../../mixins/components/providers/ClassesProviderMixin';
import InjectParentFormProviderMixin from '../../mixins/forms/providers/InjectParentFormProviderMixin';

import ClickMethodMixin from '../../mixins/forms/methods/ClickMethodMixin';
import FocusMethodMixin from '../../mixins/forms/methods/FocusMethodMixin';
import OnClickMethodMixin from '../../mixins/components/methods/OnClickMethodMixin';
import OnFocusMethodMixin from '../../mixins/components/methods/OnFocusMethodMixin';
import OnHoverMethodMixin from '../../mixins/components/methods/OnHoverMethodMixin';

import DisabledPropertyMixin from '../../mixins/forms/properties/DisabledPropertyMixin';
import LoadingPropertyMixin from '../../mixins/components/properties/LoadingPropertyMixin';
import SizePropertyMixin from '../../mixins/components/properties/SizePropertyMixin';
import TabIndexPropertyMixin from '../../mixins/components/properties/TabIndexPropertyMixin';
import VariantPropertyMixin from '../../mixins/components/properties/VariantPropertyMixin';

export default {
    name: 'Button',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        InjectParentFormProviderMixin,

        ClickMethodMixin,
        FocusMethodMixin,
        OnClickMethodMixin,
        OnFocusMethodMixin,
        OnHoverMethodMixin,

        DisabledPropertyMixin,
        LoadingPropertyMixin,
        SizePropertyMixin,
        TabIndexPropertyMixin,
        VariantPropertyMixin
    ],
    props: {
        /**
         * Modifiers
         */
        active: {
            type: Boolean,
            default: false
        },
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
        _tag () {
            return this.attributes.to ? 'router-link' : this.attributes.href ? 'a' : this.tag;
        }
    },
    created () {
        if (this.classesProvider) {
            this.classesProvider['root'].push(() => ({'-active': this.active}));
            this.classesProvider['root'].push(() => ({'-block': this.block}));
            this.classesProvider['root'].push(() => ({'-circle': this.circle}));
            this.classesProvider['root'].push(() => ({'-flat': this.flat}));
            this.classesProvider['root'].push(() => ({'-link': this.link}));
            this.classesProvider['root'].push(() => ({'-outline': this.outline}));
        }

        if (this.attributesProvider) {
            this.attributesProvider.push(() => ({ 'aria-pressed': this.active ? 'true' : false }));
        }
    }
};
