import { uid } from 'inkline/helpers';
import { popupManager } from 'inkline/factories/PopupManager';

import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import EmitProviderMixin from 'inkline/mixins/components/providers/EmitProviderMixin';
import PopupControlsProviderMixin from 'inkline/mixins/components/providers/PopupControlsProviderMixin';

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
        EmitProviderMixin,
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
        transition: {
            type: String,
            default: 'zoom-in-center-transition'
        },
        closeOnPressEscape: {
            type: Boolean,
            default: true
        },
        fill: {
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

            this.visible = true;

            popupManager.openModal(this.id)
        },
        hide() {
            if (this.disabled) return;

            this.visible = false;

            popupManager.closeModal(this.id)
        },
        initEvents() {
            this.triggerElement.addEventListener('click', this.onClick);
        },
    },
    created () {
        popupManager.register(this);

        this.classesProvider.add('root', () => ({
            '-fill': this.fill
        }));
    },
    destroyed () {
        popupManager.unregister(this);
    }
};
