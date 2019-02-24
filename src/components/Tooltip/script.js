import { uid } from '@inkline/inkline/helpers';

import AttributesProviderMixin from '@inkline/inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/mixins/components/providers/ClassesProviderMixin';
import EmitProviderMixin from '@inkline/inkline/mixins/components/providers/EmitProviderMixin';
import PopupProviderMixin from '@inkline/inkline/mixins/components/providers/PopupProviderMixin';
import PopupControlsProviderMixin from '@inkline/inkline/mixins/components/providers/PopupControlsProviderMixin';

import EmitFocusMethodMixin from '@inkline/inkline/mixins/components/methods/EmitFocusMethodMixin';

import SizePropertyMixin from '@inkline/inkline/mixins/components/properties/SizePropertyMixin';
import VariantPropertyMixin from '@inkline/inkline/mixins/components/properties/VariantPropertyMixin';
import DisabledPropertyMixin from '@inkline/inkline/mixins/components/properties/DisabledPropertyMixin';

import ClickOutside from '@inkline/inkline/directives/click-outside';

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
        trigger: {
            type: String,
            default: 'hover'
        },
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
            id: this.$attrs.id || uid(basename),
            basename
        };
    },
    watch: {
        'placement': {
            immediate: true,
                handler(value) {
                this.currentPlacement = value;
            }
        }
    },
    created() {
        this.$on('updatePopper', () => {
            if (this.visible) this.updatePopper();
        });
    },
    mounted() {
        this.referenceElement = this.$el;
        this.currentPlacement = this.placement;
    }
};
