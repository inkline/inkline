import { defineComponent } from 'vue';
import { addClass, removeClass, uid } from '@inkline/inkline/helpers';
import { OverlayController } from '@inkline/inkline/controllers';
import {
    defaultPropValue,
    colorVariantClass,
    sizePropValidator,
} from '@inkline/inkline/mixins';
import { ClickOutside } from '@inkline/inkline/directives';
import { Classes } from '@inkline/inkline/types';

/**
 * @event update:modelValue
 * @description Event emitted for setting the modelValue
 */

/**
 * @name default
 * @kind slot
 * @description Slot for modal body content
 */

/**
 * @name header
 * @kind slot
 * @description Slot for modal header content
 */

/**
 * @name footer
 * @kind slot
 * @description Slot for modal footer content
 */

const componentName = 'IModal';

export default defineComponent({
    name: componentName,
    directives: {
        ClickOutside
    },
    props: {
        /**
         * @description Determines if the modal should close when pressing escape
         * @type Boolean
         * @default true
         */
        closeOnPressEscape: {
            type: Boolean,
            default: true
        },
        /**
         * @description The color variant of the modal
         * @type primary | success | light | dark | info | success | warning | danger
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * @description The disabled state of the modal
         * @type Boolean
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * @description Determines if the modal should close when clicking the overlay
         * @type Boolean
         * @default true
         */
        hideOnClickOutside: {
            type: Boolean,
            default: true
        },
        /**
         * @description The identifier of the modal
         * @type String
         * @default uid()
         */
        id: {
            type: String,
            default(): string {
                return uid('modal');
            }
        },
        /**
         * @description Determines if the close icon should be visible in the modal header
         * @type Boolean
         * @default false
         */
        showClose: {
            type: Boolean,
            default: true
        },
        /**
         * @description The size variant of the modal
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        },
        /**
         * @description Used to determine if modal is visible or not
         * @type Boolean
         * @default false
         */
        modelValue: {
            type: Boolean,
            default: false
        },
        /**
         * @description The modal opening and closing animation
         * @type fade-in-transition | fade-in-linear-transition | zoom-in-top-transition | zoom-in-bottom-transition | zoom-in-center-transition | zoom-in-left-transition | zoom-in-right-transition
         * @default zoom-in-center-transition
         */
        transition: {
            type: String,
            default: 'zoom-in-center-transition'
        }
    },
    emits: [
        /**
         * @event update:modelValue
         * @description Event emitted for setting the modelValue
         */
        'update:modelValue'
    ],
    data(): { visible: boolean } {
        return {
            visible: (this as any).modelValue as boolean
        };
    },
    computed: {
        classes(): Classes {
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
    mounted() {
        OverlayController.register(this as any);
    },
    unmounted() {
        OverlayController.unregister(this as any);
    },
    methods: {
        show(): void {
            if ((this as any).disabled) {
                return;
            }

            this.visible = true;
            this.$emit('update:modelValue', true);

            OverlayController.open((this as any).id);

            addClass(window.document.body, '-modal');
        },
        hide(): void {
            if ((this as any).disabled) {
                return;
            }

            this.visible = false;
            this.$emit('update:modelValue', false);

            OverlayController.close((this as any).id);

            removeClass(window.document.body, '-modal');
        },
        onClickOutside(): void {
            if (!(this as any).hideOnClickOutside) {
                return;
            }

            this.hide();
        }
    }
});
