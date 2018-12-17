import { uid } from 'inkline/helpers';

import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import EmitProviderMixin from 'inkline/mixins/components/providers/EmitProviderMixin';
import PopupProviderMixin from 'inkline/mixins/components/providers/PopupProviderMixin';
import PopupControlsProviderMixin from 'inkline/mixins/components/providers/PopupControlsProviderMixin';

import EmitFocusMethodMixin from 'inkline/mixins/components/methods/EmitFocusMethodMixin';

import SizePropertyMixin from 'inkline/mixins/components/properties/SizePropertyMixin';
import VariantPropertyMixin from 'inkline/mixins/components/properties/VariantPropertyMixin';
import DisabledPropertyMixin from 'inkline/mixins/components/properties/DisabledPropertyMixin';

import ClickOutside from 'inkline/directives/click-outside';

export default {
    name: 'ITooltip',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        EmitProviderMixin,
        PopupProviderMixin,
        PopupControlsProviderMixin,

        EmitFocusMethodMixin,

        SizePropertyMixin,
        VariantPropertyMixin,
        DisabledPropertyMixin,
    ],
    directives: {
        ClickOutside
    },
    props: {
        placement: {
            type: String,
            default: 'top'
        },
        arrow: {
            type: Boolean,
            default: true
        },
        arrowOffset: {
            type: Number,
            default: 0
        }
    },
    data() {
        const basename = 'tooltip';

        return {
            timeout: null,
            id: this.$attrs.id || uid(basename),
            basename
        };
    },
    created() {
        this.$on('updatePopper', () => {
            if (this.visible) this.updatePopper();
        });
    },
    mounted() {
        this.referenceElement = this.$el;
        this.currentPlacement = this.placement;
    },
    watch: {
        'placement': {
            immediate: true,
            handler(value) {
                this.currentPlacement = value;
            }
        }
    }
};
