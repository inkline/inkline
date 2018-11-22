import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import InjectParentFormProviderMixin from 'inkline/mixins/forms/providers/InjectParentFormProviderMixin';

import ClickMethodMixin from 'inkline/mixins/forms/methods/ClickMethodMixin';
import FocusMethodMixin from 'inkline/mixins/forms/methods/FocusMethodMixin';
import OnClickMethodMixin from 'inkline/mixins/components/methods/OnClickMethodMixin';
import OnFocusMethodMixin from 'inkline/mixins/components/methods/OnFocusMethodMixin';
import OnHoverMethodMixin from 'inkline/mixins/components/methods/OnHoverMethodMixin';

import DisabledPropertyMixin from 'inkline/mixins/forms/properties/DisabledPropertyMixin';
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
        isTag () {
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
