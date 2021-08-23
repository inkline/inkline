import { defineComponent } from 'vue';
import {
    defaultPropValue,
    colorVariantClass,
    sizePropValidator,
} from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * @name default
 * @kind slot
 * @description Slot for default tabs content
 */

const componentName = 'ITabs';

export default defineComponent({
    name: componentName,
    provide() {
        return {
            tabs: this
        };
    },
    props: {
        /**
         * @description The color variant of the header
         * @type primary | light | dark
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * @description Used to set the currently active tab
         * @type String
         * @default
         */
        modelValue: {
            type: String,
            default: ''
        },
        /**
         * @description The size variant of the tabs
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size'),
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
    emits: [
        /**
         * @event update:modelValue
         * @description Event emitted for setting the modelValue
         */
        'update:modelValue'
    ],
    data() {
        return {
            active: this.modelValue,
            tabs: []
        };
    },
    computed: {
        classes(): Classes {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
                '-stretch': this.stretch
            };
        }
    },
    watch: {
        modelValue(value) {
            this.active = value;
        }
    },
    methods: {
        setActive(id: string) {
            this.active = id;
            this.$emit('update:modelValue', this.active);
        }
    }
});
