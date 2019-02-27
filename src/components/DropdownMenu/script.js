import SizePropertyMixin from '@inkline/inkline/src/mixins/components/properties/SizePropertyMixin';
import VariantPropertyMixin from '@inkline/inkline/src/mixins/components/properties/VariantPropertyMixin';

import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';
import PopupProviderMixin from '@inkline/inkline/src/mixins/components/providers/PopupProviderMixin';

export default {
    name: 'IDropdownMenu',
    inject: [
        'dropdown'
    ],
    mixins: [
        SizePropertyMixin,
        VariantPropertyMixin,

        ClassesProviderMixin,
        PopupProviderMixin
    ],
    props: {
        arrow: {
            type: Boolean,
            default: true
        },
        arrowOffset: {
            type: Number,
            default: 0
        }
    },
    created() {
        this.$on('updatePopper', () => {
            if (this.visible) this.updatePopper();
        });

        this.$on('visibility-change', (value) => {
            this.visible = value;
        });
    },
    mounted() {
        this.popupElement = this.$el;
        this.referenceElement = this.dropdown.$el;
        this.currentPlacement = this.dropdown.placement;
    },
    watch: {
        'dropdown.placement': {
            immediate: true,
            handler(value) {
                this.currentPlacement = value;
            }
        }
    }
};
