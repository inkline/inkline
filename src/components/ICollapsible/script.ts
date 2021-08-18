import { defineComponent } from 'vue';
import {
    colorVariantClass,
    defaultPropValue,
    sizePropValidator
} from '@inkline/inkline/src/mixins';
import { Classes } from '@inkline/inkline/src/types';

/**
 * @name default
 * @kind slot
 * @description Slot for default collapsible content
 */

const componentName = 'ICollapsible';

export default defineComponent({
    name: componentName,
    provide() {
        return {
            collapsible: this
        };
    },
    props: {
        /**
         * @description Display the collapsible as an accordion, keeping a maximum of one open collapsible item
         * @type Boolean
         * @default false
         */
        accordion: {
            type: Boolean,
            default: false
        },
        /**
         * @description The color variant of the button
         * @type light | dark | blank
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * @description The size variant of the collapsible
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        },
        /**
         * @description Used to determine which collapsible item is open
         * @type String[]
         * @default
         */
        modelValue: {
            type: Array,
            default: (): any[] => []
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
            activeItems: ([] as any[]).concat(this.modelValue)
        };
    },
    computed: {
        classes(): Classes {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size)
            };
        },
    },
    watch: {
        modelValue(value) {
            this.activeItems = [].concat(value);
        }
    },
    methods: {
        onItemClick(item: any) {
            if (this.accordion) {
                this.activeItems = this.activeItems.indexOf(item.name) > -1 ? [] : [item.name];
                return this.activeItems;
            }

            let index = this.activeItems.indexOf(item.name);

            if (index > -1) {
                this.activeItems.splice(index, 1);
            } else {
                this.activeItems.push(item.name);
            }

            this.$emit('update:modelValue', this.activeItems);
        }
    }
});
