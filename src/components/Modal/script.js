import { uid } from '@inkline/inkline/src/helpers';
import { popupManager } from '@inkline/inkline/src/factories/PopupManager';

import AttributesProviderMixin from '@inkline/inkline/src/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';

import EmitFocusMethodMixin from '@inkline/inkline/src/mixins/components/methods/EmitFocusMethodMixin';

import SizePropertyMixin from '@inkline/inkline/src/mixins/components/properties/SizePropertyMixin';
import VariantPropertyMixin from '@inkline/inkline/src/mixins/components/properties/VariantPropertyMixin';
import DisabledPropertyMixin from '@inkline/inkline/src/mixins/components/properties/DisabledPropertyMixin';

import ClickOutside from '@inkline/inkline/src/directives/click-outside';

export default {
    name: 'IModal',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,

        EmitFocusMethodMixin,

        SizePropertyMixin,
        VariantPropertyMixin,
        DisabledPropertyMixin,
    ],
    directives: {
        ClickOutside
    },
    props: {
        transition: {
            type: String,
            default: 'zoom-in-center-transition'
        },
        showClose: {
            type: Boolean,
            default: true
        },
        closeOnPressEscape: {
            type: Boolean,
            default: true
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        const basename = 'modal';

        return {
            id: this.$attrs.id || uid(basename),
            basename
        };
    },
    methods: {
        show() {
            if (this.disabled) return;

            this.$emit('input', true);
            this.$emit('show', this);

            popupManager.openModal(this.id);
        },
        hide() {
            if (this.disabled) return;

            this.$emit('input', false);
            this.$emit('hide', this);

            popupManager.closeModal(this.id);
        }
    },
    computed: {
        visible() {
            return this.value;
        }
    },
    watch: {
        value (visible) {
            if (this.disabled) return;

            if (visible) {
                this.show();
            } else {
                this.hide();
            }
        }
    },
    created() {
        popupManager.register(this);
    },
    destroyed() {
        popupManager.unregister(this);
    }
};
