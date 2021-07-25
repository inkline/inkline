import { addClass, removeClass, uid } from '@inkline/inkline/src/helpers';
import { OverlayController } from '@inkline/inkline/src/controllers';
import {
    defaultPropValue,
    colorVariantClass,
    sizePropValidator,
} from '@inkline/inkline/src/mixins';
import { ClickOutside } from '@inkline/inkline/src/directives';

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

export default {
    name: componentName,
    directives: {
        ClickOutside
    },
    emits: [
        /**
         * @event update:modelValue
         * @description Event emitted for setting the modelValue
         */
        'update:modelValue'
    ],
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
            default: defaultPropValue(componentName, 'color')
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
            default() {
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
            default: defaultPropValue(componentName, 'size'),
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
    data() {
        return {
            visible: this.modelValue
        };
    },
    computed: {
        classes() {
            return {
                '-disabled': this.disabled,
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size)
            };
        }
    },
    methods: {
        show() {
            if (this.disabled) {
                return;
            }

            this.visible = true;
            this.$emit('update:modelValue', true);

            OverlayController.open(this.id);

            addClass(window.document.body, '-modal');
        },
        hide() {
            if (this.disabled) {
                return;
            }

            this.visible = false;
            this.$emit('update:modelValue', false);

            OverlayController.close(this.id);

            removeClass(window.document.body, '-modal');
        },
        onClickOutside() {
            if (!this.hideOnClickOutside) {
                return;
            }

            this.hide();
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
        OverlayController.register(this);
    },
    unmounted() {
        OverlayController.unregister(this);
    }
};
