import { uid } from 'inkline/helpers';

import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import EmitProviderMixin from 'inkline/mixins/components/providers/EmitProviderMixin';
import PopupProviderMixin from 'inkline/mixins/components/providers/PopupProviderMixin';

import OnFocusMethodMixin from 'inkline/mixins/components/methods/OnFocusMethodMixin';

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

        OnFocusMethodMixin,

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
        showTimeout: {
            type: Number,
            default: 250
        },
        hideTimeout: {
            type: Number,
            default: 150
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
        return {
            timeout: null,
            visible: false,
            triggerElement: null,
            currentPlacement: null,
            focusing: false,
            id: this.$attrs.id || uid('tooltip')
        };
    },
    methods: {
        show() {
            if (this.disabled) return;

            clearTimeout(this.timeout);

            this.timeout = setTimeout(() => {
                this.visible = true;
            }, this.trigger === 'click' ? 0 : this.showTimeout);
        },
        hide() {
            if (this.disabled) return;

            clearTimeout(this.timeout);

            this.timeout = setTimeout(() => {
                this.visible = false;
            }, this.trigger === 'click' ? 0 : this.hideTimeout);
        },
        onClick() {
            if (this.disabled) return;

            if (this.visible) {
                this.hide();
            } else {
                this.show();
            }
        },
        initAriaAttributes() {
            this.popupElement.setAttribute('id', this.id);
            this.triggerElement.setAttribute('aria-haspopup', 'tooltip');
            this.triggerElement.setAttribute('aria-controls', this.id);
        },
        initEvents() {
            this.triggerElement = this.$slots.default[0].elm;
            this.popupElement = this.$refs.popup;
            this.referenceElement = this.$el;
            this.currentPlacement = this.placement;

            this.triggerElement.addEventListener('focus', () => {
                this.focusing = true;
            });
            this.triggerElement.addEventListener('blur', () => {
                this.focusing = false;
            });
            this.triggerElement.addEventListener('click', () => {
                this.focusing = false;
            });

            if (this.trigger === 'hover') {
                this.triggerElement.addEventListener('mouseenter', this.show);
                this.triggerElement.addEventListener('mouseleave', this.hide);
            } else if (this.trigger === 'click') {
                this.triggerElement.addEventListener('click', this.onClick);
            }
        },
    },
    created() {
        this.$on('updatePopper', () => {
            if (this.visible) this.updatePopper();
        });
    },
    mounted() {
        this.initEvents();
        this.initAriaAttributes();
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
