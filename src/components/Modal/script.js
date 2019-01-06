import { uid } from 'inkline/helpers';
import { popupManager } from 'inkline/factories/PopupManager';

import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';

import EmitFocusMethodMixin from 'inkline/mixins/components/methods/EmitFocusMethodMixin';

import SizePropertyMixin from 'inkline/mixins/components/properties/SizePropertyMixin';
import VariantPropertyMixin from 'inkline/mixins/components/properties/VariantPropertyMixin';
import DisabledPropertyMixin from 'inkline/mixins/components/properties/DisabledPropertyMixin';

import ClickOutside from 'inkline/directives/click-outside';

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
            if (this.disabled || this.visible) return;

            this.$emit('input', true);
            this.$emit('show', this);

            popupManager.openModal(this.id);
        },
        hide() {
            if (this.disabled || !this.visible) return;

            this.$emit('input', false);
            this.$emit('hide', this);

            popupManager.closeModal(this.id);
        }
    },
    computed: {
        visible () {
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
    created () {
        popupManager.register(this);
    },
    destroyed () {
        popupManager.unregister(this);
    }
};
