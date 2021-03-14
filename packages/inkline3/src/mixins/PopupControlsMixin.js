import { on, off } from "@inkline/inkline/src/helpers";

export default {
    props: {
        modelValue: {
            type: Boolean,
            default: undefined
        },
        trigger: {
            type: Array,
            default: () => ['hover', 'click', 'focus']
        }
    },
    data() {
        return {
            triggerElement: null,
            popupElement: null,
            visible: this.modelValue,
            triggerStack: 0
        };
    },
    methods: {
        show() {
            this.triggerStack += 1;
            this.visible = true;

            this.createPopper();
            this.$emit('update:modelValue', true);
        },
        hide() {
            this.triggerStack -= 1;

            if (this.triggerStack <= 0) {
                this.triggerStack = 0;
                this.visible = false;

                // this.destroyPopper(); // Destroyed by <transition> component after transition is finished
                this.$emit('update:modelValue', false);
            }
        },
        onClick() {
            if (this.visible) {
                this.hide();
            } else {
                this.show();
            }
        },
        onClickOutside() {
            if (this.modelValue) return;

            this.hide();
        },
        initElements() {
            if ((this.$slots.default() || []).length === 0) {
                throw new Error('Popup components require one child element to be used as trigger.');
            }

            this.triggerElement = this.$refs.trigger;
            this.popupElement = this.$refs.popup;

        },
        addEventListeners() {
            [].concat(this.trigger).forEach((trigger) => {
                switch (trigger) {
                    case 'hover':
                        on(this.triggerElement, 'mouseenter', this.show);
                        on(this.triggerElement, 'mouseleave', this.hide);
                        break;
                    case 'click':
                        on(this.triggerElement, 'click', this.onClick);
                        break;
                    case 'focus':
                        on(this.triggerElement, 'focus', this.show);
                        on(this.triggerElement, 'blur', this.hide);
                        break;
                    default:
                        break;
                }
            });
        },
        removeEventListeners() {
            [].concat(this.trigger).forEach((trigger) => {
                switch (trigger) {
                    case 'hover':
                        off(this.triggerElement, 'mouseenter', this.show);
                        off(this.triggerElement, 'mouseleave', this.hide);
                        break;
                    case 'click':
                        off(this.triggerElement, 'click', this.onClick);
                        break;
                    case 'focus':
                        off(this.triggerElement, 'focus', this.show);
                        off(this.triggerElement, 'blur', this.hide);
                        break;
                    default:
                        break;
                }
            });
        }
    },
    watch: {
        modelValue(value) {
            this.visible = value;
        }
    },
    mounted() {
        this.initElements();
        this.addEventListeners();
    },
    unmounted() {
        this.removeEventListeners();
    }
}
