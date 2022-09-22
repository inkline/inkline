import { defineComponent } from 'vue';
import {
    computedPropValue,
    computedColorValue,
    sizePropValidator
} from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default tabs content
 * @name default
 * @kind slot
 */

const componentName = 'ITabs';

export default defineComponent({
    name: componentName,
    provide () {
        return {
            tabs: this
        };
    },
    props: {
        /**
         * The color variant of the tabs
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: computedPropValue<string>(componentName, 'color')
        },
        /**
         * Used to set the currently active tab
         * @type String
         * @default
         * @name modelValue
         */
        modelValue: {
            type: String,
            default: ''
        },
        /**
         * The size variant of the tabs
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: computedPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        },
        /**
         * Display the tabs header as full width
         * @type Boolean
         * @default false
         * @name stretch
         */
        stretch: {
            type: Boolean,
            default: false
        }
    },
    emits: [
        /**
         * Event emitted for setting the modelValue
         * @event update:modelValue
         */
        'update:modelValue'
    ],
    data () {
        return {
            active: this.modelValue,
            tabs: []
        };
    },
    computed: {
        classes (): Classes {
            return {
                [`-${computedColorValue(componentName, this.color)}`]: true,
                [`-${this.size}`]: Boolean(this.size),
                '-stretch': this.stretch
            };
        }
    },
    watch: {
        modelValue (value) {
            this.active = value;
        }
    },
    methods: {
        setActive (id: string) {
            this.active = id;
            this.$emit('update:modelValue', this.active);
        }
    }
});
