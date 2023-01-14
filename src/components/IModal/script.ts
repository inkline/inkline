import { defineComponent } from 'vue';
import { addClass, removeClass, uid } from '@inkline/inkline/helpers';
import { OverlayController } from '@inkline/inkline/controllers';
import {
    defaultPropValue,
    colorVariantClass,
    sizePropValidator
} from '@inkline/inkline/mixins';
import { ClickOutside } from '@inkline/inkline/directives';
import { Classes } from '@inkline/inkline/types';

/**
 * Event emitted for setting the modelValue
 * @event update:modelValue
 */

/**
 * Slot for modal body content
 * @name default
 * @kind slot
 */

/**
 * Slot for modal header content
 * @name header
 * @kind slot
 */

/**
 * Slot for modal footer content
 * @name footer
 * @kind slot
 */

const componentName = 'IModal';

export default defineComponent({
    name: componentName,
    directives: {
        ClickOutside
    },
    inheritAttrs: false,
    props: {
        /**
         * Determines if the modal should close when pressing escape
         * @type Boolean
         * @default true
         * @name closeOnPressEscape
         */
        closeOnPressEscape: {
            type: Boolean,
            default: true
        },
        /**
         * The aria-label attribute of the close button
         * @type String
         * @default Close
         * @name closeAriaLabel
         */
        closeAriaLabel: {
            type: String,
            default: 'Close'
        },
        /**
         * The color variant of the modal
         * @type primary | success | light | dark | info | success | warning | danger
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * The disabled state of the modal
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Determines if the modal should close when clicking the overlay
         * @type Boolean
         * @default true
         * @name hideOnClickOutside
         */
        hideOnClickOutside: {
            type: Boolean,
            default: true
        },
        /**
         * The identifier of the modal
         * @type String
         * @default uid()
         * @name name
         */
        name: {
            type: String,
            default (): string {
                return uid('modal');
            }
        },
        /**
         * Determines if the close icon should be visible in the modal header
         * @type Boolean
         * @default false
         * @name showClose
         */
        showClose: {
            type: Boolean,
            default: true
        },
        /**
         * The size variant of the modal
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        },
        /**
         * Used to determine if modal is visible or not
         * @type Boolean
         * @default false
         * @name modelValue
         */
        modelValue: {
            type: Boolean,
            default: false
        },
        /**
         * The modal opening and closing animation
         * @type fade-in-transition | fade-in-linear-transition | zoom-in-top-transition | zoom-in-bottom-transition | zoom-in-center-transition | zoom-in-left-transition | zoom-in-right-transition
         * @default zoom-in-center-transition
         * @name transition
         */
        transition: {
            type: String,
            default: 'zoom-in-center-transition'
        }
    },
    emits: [
        /**
         * Event emitted for setting the modelValue
         * @event update:modelValue
         */
        'update:modelValue'
    ],
    data (): { visible: boolean } {
        return {
            visible: (this as any).modelValue as boolean
        };
    },
    computed: {
        classes (): Classes {
            return {
                '-disabled': (this as any).disabled,
                ...colorVariantClass(this),
                [`-${(this as any).size}`]: Boolean((this as any).size)
            };
        }
    },
    watch: {
        modelValue (value) {
            if (value) {
                this.show();
            } else {
                this.hide();
            }
        }
    },
    mounted () {
        OverlayController.register(this as any);
    },
    unmounted () {
        OverlayController.unregister(this as any);
    },
    methods: {
        show (): void {
            if ((this as any).disabled) {
                return;
            }

            this.visible = true;
            this.$emit('update:modelValue', true);

            OverlayController.open((this as any).name);

            if (typeof window !== 'undefined') {
                addClass(window.document.body, '-modal');
            }
        },
        hide (): void {
            if ((this as any).disabled) {
                return;
            }

            this.visible = false;
            this.$emit('update:modelValue', false);

            OverlayController.close((this as any).name);

            if (typeof window !== 'undefined') {
                removeClass(window.document.body, '-modal');
            }
        },
        onClickOutside (): void {
            if (!(this as any).hideOnClickOutside) {
                return;
            }

            this.hide();
        }
    }
});
