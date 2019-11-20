<script>
import PopperJS from 'popper.js';
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
            default: 0
        },
        arrow: {
            type: Boolean,
            default: true
        },
        arrowOffset: {
            type: Number,
            default: 35
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

            value ? this.updatePopper() : this.destroyPopper();

            this.$emit('change', value);
        }
    },

    beforeDestroy() {
        this.doDestroy(true);

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
            if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.currentPlacement)) {
                return;
            }

            this.popupElement = this.popupElement || this.popup || this.$refs.popup;
            this.referenceElement = this.referenceElement || this.reference || this.$refs.reference;

            if (!this.referenceElement &&
                this.$slots.reference &&
                this.$slots.reference[0]) {
                this.referenceElement = this.$slots.reference[0].elm;
            }

            if (!this.popupElement || !this.referenceElement) return;

            if (!this.$isServer && document && this.appendToBody) document.body.appendChild(this.popupElement);
            if (this.popperJS && this.popperJS.destroy) {
                this.popperJS.destroy();
            }

            this.popperOptions.placement = this.currentPlacement;
            this.popperOptions.offset = this.offset;
            this.popperOptions.arrowOffset = this.arrowOffset;

            this.popperOptions.onCreate = () => {
                this.$emit('created', this);
                this.resetTransformOrigin();
                this.$nextTick(this.updatePopper);
            };

            if (typeof this.popperOptions.onUpdate === 'function') {
                this.popperJS.onUpdate(this.popperOptions.onUpdate);
            }

            this.popperJS = new PopperJS(this.referenceElement, this.popupElement, Object.assign({
                modifiers: {
                    computeStyle: {
                        gpuAcceleration: false
                    }
                }
            }, this.popperOptions));

            this.popperJS.popper.style.zIndex = popupManager.nextZIndex();

            this.popupElement.addEventListener('click', this.stopOnClickPropagation);
        },

        updatePopper() {
            if (!this.popperJS) return this.createPopper();

            this.popperJS.update();

            if (this.popperJS.popper) {
                this.popperJS.popper.style.zIndex = popupManager.nextZIndex();
            }
        },

        doDestroy(forceDestroy) {
            if (!this.popperJS || (this.visible && !forceDestroy)) return;

            this.popperJS.destroy();
            this.popperJS = null;
        },

        destroyPopper() {
            if (this.popperJS) {
                this.resetTransformOrigin();
            }
        },

        resetTransformOrigin() {
            if (!this.transformOrigin) return;

            let placementMap = {
                top: 'bottom',
                bottom: 'top',
                left: 'right',
                right: 'left'
            };
            let placement = this.popperJS.popper.getAttribute('x-placement').split('-')[0];
            let origin = placementMap[placement];

            this.popperJS.popper.style.transformOrigin = typeof this.transformOrigin === 'string' ?
                this.transformOrigin :
                ['top', 'bottom'].indexOf(placement) > -1 ? `center ${ origin }` : `${ origin } center`;
        },
        onClickOutside() {
            if (this.value) return;

            this.hide();
        }
    }
};
</script>
