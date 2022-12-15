import {
    SizePropertyMixin,
    ClassesProviderMixin,
    PopupProviderMixin
} from '@inkline/inkline/src/mixins';

export default {
    name: 'IDropdownMenu',
    inject: [
        'dropdown'
    ],
    mixins: [
        SizePropertyMixin,

        ClassesProviderMixin,
        PopupProviderMixin
    ],
    props: {
        arrow: {
            type: Boolean,
            default: true
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
