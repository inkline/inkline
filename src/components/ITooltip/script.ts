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
 * Slot for tooltip body content
 * @name body
 * @kind slot
 */

const componentName = 'ITooltip';

export default defineComponent({
    name: componentName,
    directives: {
        ClickOutside
    },
    mixins: [PopupMixin, PopupControlsMixin],
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the tooltip
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * The disabled state of the tooltip
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Used to manually control the visibility of the tooltip
         * @type Boolean
         * @default false
         * @name modelValue
         */
        modelValue: {
            type: Boolean,
            default: false
        },
        /**
         * The identifier of the tooltip
         * @type String
         * @default uid()
         * @name name
         */
        name: {
            type: String,
            default (): string {
                return uid('tooltip');
            }
        },
        /**
         * Displays an arrow on the tooltip pointing to the trigger element
         * @type Boolean
         * @default true
         * @name arrow
         */
        arrow: {
            type: Boolean,
            default: true
        },
        /**
         * The placement of the tooltip
         * @type top | top-start | top-end | bottom | bottom-start | bottom-end | left | left-start | left-end | right | right-start | right-end
         * @default false
         * @name placement
         */
        placement: {
            type: String,
            default: 'top'
        },
        /**
         * The events used to trigger the tooltip
         * @type hover | focus | click | manual
         * @default [hover, focus]
         * @name trigger
         */
        trigger: {
            type: [String, Array],
            default: (): string[] => ['hover', 'focus']
        },
        /**
         * The offset of the tooltip relative to the trigger element
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
         * Used to override the popper.js options used for creating the tooltip
         * @type Object
         * @default {}
         * @name popperOptions
         */
        popperOptions: {
            type: Object,
            default: (): any => ({})
        },
        /**
         * The size variant of the tooltip
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
         * Event emitted when clicking outside the tooltip elements
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
