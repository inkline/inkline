import { createPopper } from '@popperjs/core';

/**
 * @param {HTMLElement} [popupElement=$refs.overlay]
 * The HTML element used as overlay, or a configuration used to generate the overlay.
 * @param {String} [placement=auto]
 * Placement of the overlay, accepted values:
 *	- auto(-start, -end)
 *	- top(-start, -end)
 *	- right(-start, -end)
 *	- bottom(-start, -end)
 *	- left(-start, -end)
 * @param {Boolean} [visible=false]
 * Visibility of the overlay
 * @param {Number} [offset=0]
 * Amount of pixels the overlay will be shifted (can be negative).
 */

export default {
    props: {
        placement: {
            type: String,
            default: 'auto'
        },
        offset: {
            type: Number,
            default: 6
        }
    },
    data() {
        return {
            referenceElement: null,
            popperInstance: null,
            popupElement: null
        };
    },
    methods: {
        createPopper() {
            if (typeof window === 'undefined') {
                return;
            }

            const modifiers = [
                {
                    name: 'offset',
                    options: {
                        offset: [0, this.offset]
                    }
                },
                {
                    name: 'arrow',
                    options: {
                        padding: 6, // padding from the edges of the popper
                    },
                },
                {
                    name: 'preventOverflow',
                    options: {
                        padding: 8, // padding from the edges of the viewport
                    },
                },
                {
                    name: 'computeStyles',
                    options: {
                        gpuAcceleration: false,
                        adaptive: false, // true by default
                    },
                },
            ];

            this.popperInstance = createPopper(
                this.referenceElement,
                this.popupElement,
                {
                    strategy: 'fixed',
                    modifiers,
                    placement: this.placement,
                    ...this.popperOptions
                }
            );
        },
        destroyPopper() {
            if (this.popperInstance) {
                this.popperInstance.destroy();
                this.popperInstance = null;
            }
        },
    },
    watch: {
        placement(placement) {
            if (this.popperInstance) {
                this.popperInstance.setOptions({ placement });
            }
        }
    },
    mounted() {
        this.referenceElement = this.$refs.wrapper;
    },
    beforeUnmount() {
        this.destroyPopper();
    }
};
