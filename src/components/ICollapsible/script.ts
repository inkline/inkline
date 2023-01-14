import { defineComponent } from 'vue';
import {
    colorVariantClass,
    defaultPropValue,
    sizePropValidator
} from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default collapsible content
 * @name default
 * @kind slot
 */

const componentName = 'ICollapsible';

export default defineComponent({
    name: componentName,
    provide () {
        return {
            collapsible: this
        };
    },
    inheritAttrs: false,
    props: {
        /**
         * Display the collapsible as an accordion, keeping a maximum of one open collapsible item
         * @type Boolean
         * @default false
         * @name accordion
         */
        accordion: {
            type: Boolean,
            default: false
        },
        /**
         * The color variant of the button
         * @type light | dark | blank
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * The size variant of the collapsible
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        },
        /**
         * Used to determine which collapsible item is open
         * @type String[]
         * @default
         * @name modelValue
         */
        modelValue: {
            type: Array,
            default: (): any[] => []
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
            activeItems: ([] as any[]).concat(this.modelValue)
        };
    },
    computed: {
        classes (): Classes {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size)
            };
        }
    },
    watch: {
        modelValue (value) {
            this.activeItems = [].concat(value);
        }
    },
    methods: {
        onItemClick (item: any) {
            if (this.accordion) {
                this.activeItems = this.activeItems.indexOf(item.name) > -1 ? [] : [item.name];
                return this.activeItems;
            }

            const index = this.activeItems.indexOf(item.name);

            if (index > -1) {
                this.activeItems.splice(index, 1);
            } else {
                this.activeItems.push(item.name);
            }

            this.$emit('update:modelValue', this.activeItems);
        }
    }
});
