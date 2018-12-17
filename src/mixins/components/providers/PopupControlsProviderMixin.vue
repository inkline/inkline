<script>
    export default {
        props: {
            trigger: {
                type: String,
                default: 'click'
            },
            showTimeout: {
                type: Number,
                default: 250
            },
            hideTimeout: {
                type: Number,
                default: 150
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
            initEvents() {
                if (this.trigger === 'hover') {
                    this.triggerElement.addEventListener('mouseenter', this.show);
                    this.triggerElement.addEventListener('mouseleave', this.hide);
                } else if (this.trigger === 'click') {
                    this.triggerElement.addEventListener('click', this.onClick);
                }
            }
        },
        mounted () {
            this.initElements();
            this.initEvents();
            this.initAriaAttributes();
        }
    };
</script>