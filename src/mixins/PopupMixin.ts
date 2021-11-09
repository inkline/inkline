import { defineComponent } from 'vue';
import { createPopper, Instance, Placement } from '@popperjs/core';

export const offsetModifier = (offset: number) => ({
    name: 'offset',
    options: {
        offset: [0, offset]
    }
});

export const arrowModifier = () => ({
    name: 'arrow',
    options: {
        padding: 6 // padding from the edges of the popper
    }
});

export const preventOverflowModifier = () => ({
    name: 'preventOverflow',
    options: {
        padding: 8 // padding from the edges of the viewport
    }
});

export const computeStylesModifier = () => ({
    name: 'computeStyles',
    options: {
        gpuAcceleration: false,
        adaptive: false // true by default
    }
});

export const sameWidthModifier = () => ({
    name: 'sameWidth',
    enabled: true,
    phase: 'beforeWrite',
    requires: ['computeStyles'],
    fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
    },
    effect ({ state }: { state: any }) {
        state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
    }
});

export const useBaseModifiers = ({ offset }: { offset: number }) => [
    offsetModifier(offset),
    arrowModifier(),
    preventOverflowModifier(),
    computeStylesModifier()
];

/**
 * @param {HTMLElement} [popupElement=$refs.overlay]
 * The HTML element used as overlay, or a configuration used to generate the overlay.
 * @param {String} [placement=auto]
 * Placement of the overlay, accepted values:
 *  - auto(-start, -end)
 *  - top(-start, -end)
 *  - right(-start, -end)
 *  - bottom(-start, -end)
 *  - left(-start, -end)
 * @param {Boolean} [visible=false]
 * Visibility of the overlay
 * @param {Number} [offset=0]
 * Amount of pixels the overlay will be shifted (can be negative).
 */

export default defineComponent({
    props: {
        placement: {
            type: String,
            default: 'auto' as Placement
        },
        offset: {
            type: Number,
            default: 6
        },
        popperOptions: {
            type: Object,
            default: () => ({})
        }
    },
    data (): { popperInstance?: Instance } {
        return {
            popperInstance: undefined
        };
    },
    watch: {
        placement (placement: Placement) {
            if (this.popperInstance) {
                this.popperInstance.setOptions({ placement });
            }
        }
    },
    beforeUnmount () {
        this.destroyPopper();
    },
    methods: {
        createPopper () {
            if (typeof window === 'undefined') {
                return;
            }

            const modifiers = useBaseModifiers({ offset: this.offset });

            this.popperInstance = createPopper(
                (this as any).$refs.wrapper,
                (this as any).$refs.popup,
                {
                    strategy: 'fixed',
                    placement: this.placement as Placement,
                    modifiers,
                    ...this.popperOptions
                }
            );
        },
        destroyPopper () {
            if (this.popperInstance) {
                this.popperInstance.destroy();
                this.popperInstance = undefined;
            }
        }
    }
});
