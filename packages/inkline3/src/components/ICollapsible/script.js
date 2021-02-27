import {
    colorVariantClass,
    sizePropValidator
} from '@inkline/inkline/src/mixins';

/**
 * @event update:modelValue
 * @description Event emitted for setting the modelValue
 */

/**
 * @name default
 * @kind slot
 * @description Slot for default collapsible content
 */

export default {
    name: 'ICollapsible',
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
            default: ''
        },
        /**
         * @description The size variant of the collapsible
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: '',
            validator: sizePropValidator
        },
        /**
         * @description Used to determine which collapsible item is open
         * @type String[]
         * @default
         */
        modelValue: {
            type: Array,
            default () {
                return [];
            }
        }
    },
    provide() {
        return {
            collapsible: this
        };
    },
    data() {
        return {
            activeItems: [].concat(this.modelValue)
        };
    },
    computed: {
        classes() {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size)
            }
        },
    },
    methods: {
        onItemClick(item) {
            if (this.accordion) {
                return this.activeItems = this.activeItems.indexOf(item.name) > -1 ? [] : [item.name];
            }

            let index = this.activeItems.indexOf(item.name);

            if (index > -1) {
                this.activeItems.splice(index, 1);
            } else {
                this.activeItems.push(item.name);
            }

            this.$emit('update:modelValue', this.activeItems);
        }
    },
    watch: {
        modelValue(value) {
            this.activeItems = [].concat(value);
        }
    }
};
