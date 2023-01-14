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
 * Slot for tooltip trigger
 * @name default
 * @kind slot
 */

/**
 * Slot for tooltip header content
 * @name header
 * @kind slot
 */

/**
 * Slot for tooltip body content
 * @name body
 * @kind slot
 */

/**
 * Slot for tooltip footer content
 * @name footer
 * @kind slot
 */

const componentName = 'IPopover';

export default defineComponent({
    name: componentName,
    directives: {
        ClickOutside
    },
    mixins: [PopupMixin, PopupControlsMixin],
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the popover
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * The disabled state of the popover
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Used to manually control the visibility of the popover
         * @type Boolean
         * @default false
         * @name modelValue
         */
        modelValue: {
            type: Boolean,
            default: false
        },
        /**
         * The identifier of the popover
         * @type String
         * @default uid()
         * @name name
         */
        name: {
            type: String,
            default (): string {
                return uid('popover');
            }
        },
        /**
         * Displays an arrow on the popover pointing to the trigger element
         * @type Boolean
         * @default true
         * @name arrow
         */
        arrow: {
            type: Boolean,
            default: true
        },
        /**
         * The placement of the popover
         * @type top | top-start | top-end | bottom | bottom-start | bottom-end | left | left-start | left-end | right | right-start | right-end
         * @default false
         * @name placement
         */
        placement: {
            type: String,
            default: 'top'
        },
        /**
         * The events used to trigger the popover
         * @type hover | focus | click | manual
         * @default [click]
         * @name trigger
         */
        trigger: {
            type: [String, Array],
            default: (): string[] => ['click']
        },
        /**
         * The offset of the popover relative to the trigger element
         * @type Number
         * @default 6
         * @name offset
         */
        offset: {
            type: Number,
            default: 6
        },
        /**
         * Determines whether hover state should be transferred from trigger to popup
         * @type Boolean
         * @default false
         * @name interactable
         */
        interactable: {
            type: Boolean,
            default: false
        },
        /**
         * Used to override the popper.js options used for creating the popover
         * @type Object
         * @default {}
         * @name popperOptions
         */
        popperOptions: {
            type: Object,
            default: (): any => ({})
        },
        /**
         * The size variant of the popover
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        }
    },
    emits: [
        /**
         * Event emitted when clicking outside the popover elements
         * @event click-outside
         */
        'click-outside',
        /**
         * Event emitted for setting the modelValue
         * @event update:modelValue
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
        handleClickOutside (event: MouseEvent) {
            this.visible = false;
            this.$emit('update:modelValue', false);
            this.onClickOutside(event);
        }
    }
});
