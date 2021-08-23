import { defineComponent } from 'vue';
import { on, off, focusFirstDescendant } from '@inkline/inkline/helpers';

export default defineComponent({
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        modelValue: {
            type: Boolean,
            default: undefined
        },
        trigger: {
            type: Array,
            default: () => ['hover', 'click', 'focus']
        }
    },
    emits: ['update:modelValue'],
    data() {
        return {
            visible: this.modelValue,
            triggerStack: 0
        };
    },
    watch: {
        modelValue(value) {
            if (value) {
                this.show();
            } else {
                this.hide();
            }
        }
    },
    mounted() {
        if (((this as any).$slots.default() || []).length === 0) {
            throw new Error('Popup components require one child element to be used as trigger.');
        }

        this.addEventListeners();
    },
    beforeUnmount() {
        this.removeEventListeners();
    },
    methods: {
        show() {
            if (this.disabled || this.visible) {
                return;
            }

            this.triggerStack += 1;
            this.visible = true;

            (this as any).createPopper();
            this.$emit('update:modelValue', true);
        },
        hide() {
            if (this.disabled || !this.visible) {
                return;
            }

            this.triggerStack -= 1;

            if (this.triggerStack <= 0) {
                this.triggerStack = 0;
                this.visible = false;

                // Destroyed by <transition> component after transition is finished
                // this.destroyPopper();
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
        addEventListeners() {
            [].concat((this as any).trigger).forEach((trigger) => {
                switch (trigger) {
                case 'hover':
                    on(this.$refs.trigger as HTMLElement, 'mouseenter', this.show);
                    on(this.$refs.trigger as HTMLElement, 'mouseleave', this.hide);
                    break;
                case 'click':
                    on(this.$refs.trigger as HTMLElement, 'click', this.onClick);
                    break;
                case 'focus':
                    for (const child of (this as any).$refs.trigger.children) {
                        on(child, 'focus', this.show);
                        on(child, 'blur', this.hide);
                    }
                    break;
                default:
                    break;
                }
            });
        },
        removeEventListeners() {
            [].concat((this as any).trigger).forEach((trigger) => {
                switch (trigger) {
                case 'hover':
                    off(this.$refs.trigger as HTMLElement, 'mouseenter', this.show);
                    off(this.$refs.trigger as HTMLElement, 'mouseleave', this.hide);
                    break;
                case 'click':
                    off(this.$refs.trigger as HTMLElement, 'click', this.onClick);
                    break;
                case 'focus':
                    for (const child of (this as any).$refs.trigger.children) {
                        off(child, 'focus', this.show);
                        off(child, 'blur', this.hide);
                    }
                    break;
                default:
                    break;
                }
            });
        },
        focusTrigger() {
            for (const child of (this as any).$refs.trigger.children) {
                if (focusFirstDescendant(child)) {
                    child.focus();
                    break;
                }
            }
        }
    }
});
