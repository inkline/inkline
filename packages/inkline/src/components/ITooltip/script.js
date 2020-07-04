import { uid } from '@inkline/inkline/src/helpers';
import {
    AttributesProviderMixin,
    ClassesProviderMixin,
    EmitProviderMixin,
    PopupProviderMixin,
    PopupControlsProviderMixin,
    EmitFocusMethodMixin,
    SizePropertyMixin,
    VariantPropertyMixin,
    DisabledPropertyMixin
} from '@inkline/inkline/src/mixins';
import ClickOutside from '@inkline/inkline/src/directives/click-outside';

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
            type: [String, Array],
            default: 'hover'
        },
        placement: {
            type: String,
            default: 'top'
        },
        arrow: {
            type: Boolean,
            default: true
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
    methods: {
        onUpdatePopper() {
            if (this.visible) {
                this.updatePopper();
            }
        }
    },
    created() {
        this.$on('updatePopper', this.onUpdatePopper);
    },
    mounted() {
        this.referenceElement = this.$el;
        this.currentPlacement = this.placement;
    },
    beforeDestroy() {
        this.$off('updatePopper', this.onUpdatePopper);
    }
};
