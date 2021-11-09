import { defineComponent } from 'vue';
import {
    PopupMixin,
    PopupControlsMixin,
    sizePropValidator,
    colorVariantClass,
    defaultPropValue
} from '@inkline/inkline/mixins';
import ClickOutside from '@inkline/inkline/directives/click-outside';
import { Classes } from '@inkline/inkline/types';
import { uid } from '@inkline/inkline/helpers';

/**
 * @name default
 * @kind slot
 * @description Slot for tooltip trigger
 */

/**
 * @name header
 * @kind slot
 * @description Slot for tooltip header content
 */

/**
 * @name body
 * @kind slot
 * @description Slot for tooltip body content
 */

/**
 * @name footer
 * @kind slot
 * @description Slot for tooltip footer content
 */

const componentName = 'IPopover';

export default defineComponent({
    name: componentName,
    directives: {
        ClickOutside
    },
    mixins: [
        PopupMixin,
        PopupControlsMixin
    ],
    props: {
        /**
         * @description The color variant of the popover
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * @description The disabled state of the popover
         * @type Boolean
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * @description Used to manually control the visibility of the popover
         * @type Boolean
         * @default false
         */
        modelValue: {
            type: Boolean,
            default: false
        },
        /**
         * @description The identifier of the popover
         * @type String
         * @default uid()
         */
        name: {
            type: String,
            default (): string {
                return uid('popover');
            }
        },
        /**
         * @description Displays an arrow on the popover pointing to the trigger element
         * @type Boolean
         * @default true
         */
        arrow: {
            type: Boolean,
            default: true
        },
        /**
         * @description The placement of the popover
         * @type top | top-start | top-end | bottom | bottom-start | bottom-end | left | left-start | left-end | right | right-start | right-end
         * @default false
         */
        placement: {
            type: String,
            default: 'top'
        },
        /**
         * @description The events used to trigger the popover
         * @type hover | focus | click | manual
         * @default [click]
         */
        trigger: {
            type: [String, Array],
            default: (): string[] => ['click']
        },
        /**
         * @description The offset of the popover relative to the trigger element
         * @type Number
         * @default 6
         */
        offset: {
            type: Number,
            default: 6
        },
        /**
         * @description Used to override the popper.js options used for creating the popover
         * @type Object
         * @default {}
         */
        popperOptions: {
            type: Object,
            default: (): any => ({})
        },
        /**
         * @description The size variant of the popover
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        }
    },
    emits: [
        /**
         * @event update:modelValue
         * @description Event emitted for setting the modelValue
         */
        'update:modelValue'
    ],
    computed: {
        classes (): Classes {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size)
            };
        }
    },
    methods: {
        onEscape () {
            this.visible = false;
            this.$emit('update:modelValue', false);
        },
        handleClickOutside () {
            this.visible = false;
            this.$emit('update:modelValue', false);
            this.onClickOutside();
        }
    }
});
