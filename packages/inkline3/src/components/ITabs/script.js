import {
    colorVariantClass,
    sizePropValidator,
} from '@inkline/inkline/src/mixins';

/**
 * @name default
 * @kind slot
 * @description Slot for default tabs content
 */

export default {
    name: 'ITabs',
    emits: [
        /**
         * @event update:modelValue
         * @description Event emitted for setting the modelValue
         */
        'update:modelValue'
    ],
    props: {
        /**
         * @description The color variant of the header
         * @type primary | light | dark
         * @default light
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * @description Used to set the currently active tab
         * @type Boolean
         * @default false
         */
        modelValue: {
            type: Boolean,
            default: false
        },
        /**
         * @description The size variant of the tabs
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: '',
            validator: sizePropValidator
        },
        /**
         * @description Display the tabs header as full width
         * @type Boolean
         * @default false
         */
        stretch: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            active: this.modelValue,
            tabs: []
        }
    },
    provide() {
        return {
            tabs: this
        };
    },
    computed: {
        classes() {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
                '-stretch': this.stretch
            };
        }
    },
    methods: {
        setActive(id) {
            this.active = id;
            this.$emit('update:modelValue', this.active);
        }
    },
    watch: {
        modelValue(value) {
            this.active = value;
        }
    }
};
