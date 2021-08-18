import { defineComponent } from 'vue';
import { PopupMixin, PopupControlsMixin, sizePropValidator, colorVariantClass, defaultPropValue } from '../../mixins';
import ClickOutside from '../../directives/click-outside';
/**
 * @name default
 * @kind slot
 * @description Slot for tooltip trigger
 */
/**
 * @name body
 * @kind slot
 * @description Slot for tooltip body content
 */
const componentName = 'ITooltip';
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
         * @description The color variant of the tooltip
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue(componentName, 'color')
        },
        /**
         * @description The disabled state of the tooltip
         * @type Boolean
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * @description Used to manually control the visibility of the tooltip
         * @type Boolean
         * @default false
         */
        modelValue: {
            type: Boolean,
            default: false
        },
        /**
         * @description Displays an arrow on the tooltip pointing to the trigger element
         * @type Boolean
         * @default true
         */
        arrow: {
            type: Boolean,
            default: true
        },
        /**
         * @description The placement of the tooltip
         * @type top | top-start | top-end | bottom | bottom-start | bottom-end | left | left-start | left-end | right | right-start | right-end
         * @default false
         */
        placement: {
            type: String,
            default: 'top',
        },
        /**
         * @description The events used to trigger the tooltip
         * @type hover | focus | click | manual
         * @default [hover, focus]
         */
        trigger: {
            type: [String, Array],
            default: () => ['hover', 'focus']
        },
        /**
         * @description The offset of the tooltip relative to the trigger element
         * @type Number
         * @default 6
         */
        offset: {
            type: Number,
            default: 6
        },
        /**
         * @description Used to override the popper.js options used for creating the tooltip
         * @type Object
         * @default {}
         */
        popperOptions: {
            type: Object,
            default: () => ({})
        },
        /**
         * @description The size variant of the tooltip
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: defaultPropValue(componentName, 'size'),
            validator: sizePropValidator
        },
    },
    emits: [
        /**
         * @event update:modelValue
         * @description Event emitted for setting the modelValue
         */
        'update:modelValue'
    ],
    computed: {
        classes() {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
            };
        }
    },
    methods: {
        onEscape() {
            this.visible = false;
            this.$emit('update:modelValue', false);
        },
        handleClickOutside() {
            this.visible = false;
            this.$emit('update:modelValue', false);
            this.onClickOutside();
        }
    }
});
//# sourceMappingURL=script.js.map