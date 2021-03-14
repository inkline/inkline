import { h, resolveComponent } from 'vue'
import {
    PopupMixin,
    PopupControlsMixin,
    sizePropValidator,
    colorVariantClass
} from '@inkline/inkline/src/mixins';
import ClickOutside from '@inkline/inkline/src/directives/click-outside';

export default {
    name: 'ITooltip',
    mixins: [
        PopupMixin,
        PopupControlsMixin
    ],
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
         * @description The color variant of the tooltip
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * @description The delay to hide tooltip
         * @type Boolean
         * @default false
         */
        hideDelay: {
            type: Number,
            default: 300
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
        modelValue: {
            type: Boolean,
            default: undefined
        },
        arrow: {
            type: Boolean,
            default: true
        },
        placement: {
            type: String,
            default: 'bottom',
        },
        trigger: {
            type: [String, Array],
            default: ['hover']
        },
        offset: {
            type: Number,
            default: 6
        },
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
            default: '',
            validator: sizePropValidator
        },
    },
    computed: {
        classes() {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
            }
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
}

