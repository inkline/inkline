<script>
export default {
    props: {
        trigger: {
            type: [Array, String],
            default: 'click'
        },
        showTimeout: {
            type: Number,
            default: 250
        },
        hideTimeout: {
            type: Number,
            default: 150
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            timeout: null,
            popupElement: null,
            triggerElement: null,
            visible: false
        };
    },
    computed: {
        triggers() {
            return this.trigger.constructor === Array ? this.trigger : [this.trigger];
        }
    },
    mounted() {
        this.initElements();
        this.initAriaAttributes();
        this.addEvents();
    },
    destroyed() {
        this.removeEvents();
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
        onClickOutside() {
            if (this.value) return;

            this.hide();
        },
        initElements() {
            if (!(this.$slots.default || []).length > 0) {
                throw new Error(`${this.$options.name} component requires one child element to be used as trigger.`);
            }

            this.triggerElement = this.$refs.trigger || this.$slots.default[0].elm;
            this.popupElement = this.$refs.popup;
        },
        initAriaAttributes() {
            this.popupElement.setAttribute('id', this.id);
            this.triggerElement.setAttribute('aria-haspopup', this.basename);
            this.triggerElement.setAttribute('aria-controls', this.id);
        },
        addEvents() {
            this.triggers.forEach((trigger) => {
                switch (trigger) {
                case 'hover':
                    this.triggerElement.addEventListener('mouseenter', this.show);
                    this.triggerElement.addEventListener('mouseleave', this.hide);
                    break;
                case 'click':
                    this.triggerElement.addEventListener('click', this.onClick);
                    break;
                case 'focus':
                    this.triggerElement.addEventListener('focus', this.show);
                    this.triggerElement.addEventListener('blur', this.hide);
                    break;
                }
            });
        },
        removeEvents() {
            this.triggers.forEach((trigger) => {
                switch (trigger) {
                case 'hover':
                    this.triggerElement.removeEventListener('mouseenter', this.show);
                    this.triggerElement.removeEventListener('mouseleave', this.hide);
                    break;
                case 'click':
                    this.triggerElement.removeEventListener('click', this.onClick);
                    break;
                case 'focus':
                    this.triggerElement.removeEventListener('focus', this.show);
                    this.triggerElement.removeEventListener('blur', this.hide);
                }
            });
        }
    }
};
</script>