<script>
import { createPopper } from '@popperjs/core';
import popupManager from '@inkline/inkline/src/factories/PopupManager';

/**
 * @param {HTMLElement} [reference=$refs.reference] - The reference element used to position the popper.
 * @param {HTMLElement} [popup=$refs.popper] - The HTML element used as popper, or a configuration used to generate the popper.
 * @param {String} [placement=button] - Placement of the popper accepted values: top(-start, -end), right(-start, -end), bottom(-start, -end), left(-start, -end)
 * @param {Number} [offset=0] - Amount of pixels the popper will be shifted (can be negative).
 */
export default {
    props: {
        transformOrigin: {
            type: [Boolean, String],
            default: true
        },
        placement: {
            type: String,
            default: 'bottom'
        },
        offset: {
            type: Number,
            default: null
        },
        arrow: {
            type: Boolean,
            default: true
        },
        arrowOffset: {
            type: Number,
            default: 10
        },
        appendToBody: {
            type: Boolean,
            default: false
        },
        popperOptions: {
            type: Object,
            default() {
                return {};
            }
        },
        reference: {
            type: null,
            default: null
        },
        popup: {
            type: null,
            default: null
        },
        value: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            visible: false,
            currentPlacement: ''
        };
    },

    watch: {
        value(value) {
            this.visible = value;
        },
        visible(value) {
            if (this.disabled) {
                return;
            }

            if (value) {
                this.updatePopper();
            }

            this.$emit('change', value);
        }
    },

    beforeDestroy() {
        this.destroyPopper(true);

        if (!this.$isServer && document && this.popupElement && this.popupElement.parentNode === document.body) {
            this.popupElement.removeEventListener('click', this.stopOnClickPropagation);

            document.body.removeChild(this.popupElement);
        }
    },

    // Call destroy in keep-alive mode
    deactivated() {
        this.$options.beforeDestroy[0].call(this);
    },

    methods: {
        stopOnClickPropagation(e) {
            e.stopPropagation();
        },
        createPopper() {
            if (this.$isServer) return;

            this.currentPlacement = this.currentPlacement || this.placement;

            this.popupElement = this.popupElement || this.popup || this.$refs.popup;
            this.referenceElement = this.referenceElement || this.reference || this.$refs.reference;
            this.arrowElement = this.arrowElement || this.$refs.arrow;

            if (!this.referenceElement &&
                this.$slots.reference &&
                this.$slots.reference[0]) {
                this.referenceElement = this.$slots.reference[0].elm;
            }

            if (!this.popupElement || !this.referenceElement) {
                return;
            }

            if (!this.$isServer && document && this.appendToBody) {
                document.body.appendChild(this.popupElement);
            }

            if (this.popperInstance && this.popperInstance.destroy) {
                this.popperInstance.destroy()
            }

            this.popperOptions.placement = this.currentPlacement;
            this.popperOptions.offset = this.offset;
            this.popperOptions.arrowOffset = this.arrowOffset;

            this.popperOptions.onFirstUpdate = () => {
                this.$emit('created', this);
                this.$nextTick().then(this.updatePopper);
            };

            const computeStylesModifier = {
                name: 'computeStyles',
                options: {
                    adaptive: false,
                    gpuAcceleration: false
                }
            };

            const offsetModifier = {
                name: 'offset',
                options: {
                    offset: ({ placement }) => {
                        if (placement.indexOf('left') !== -1 || placement.indexOf('right') !== -1) {
                            return this.offset || [0, this.arrowOffset];
                        } else {
                            return this.offset || [0, this.arrowOffset];
                        }
                    },
                }
            };

            const arrowModifier = {
                name: 'arrow',
                options: {
                    element: this.arrowElement || '.arrow',
                    padding: this.arrowOffset
                },
            };

            this.popperInstance = createPopper(this.referenceElement, this.popupElement, Object.assign({
                modifiers: [
                    computeStylesModifier
                ].concat(this.arrow ? [arrowModifier, offsetModifier] : [])
            }, this.popperOptions));

            this.popupElement.addEventListener('click', this.stopOnClickPropagation);
        },

        updatePopper() {
            if (!this.popperInstance) {
                return this.createPopper();
            }

            if (this.popperInstance.state.styles.popper) {
                this.popperInstance.state.styles.popper.zIndex = popupManager.nextZIndex();
            }

            this.popperInstance.forceUpdate();
        },

        destroyPopper(forceDestroy) {
            if (!this.popperInstance || (this.visible && !forceDestroy)) return;

            this.popperInstance.destroy();
            this.popperInstance = null;
        },

        onClickOutside() {
            if (this.value) return;

            this.hide();
        }
    }
};
</script>
