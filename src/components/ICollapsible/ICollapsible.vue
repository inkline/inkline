<script lang="ts">
import { defineComponent } from 'vue';
import {
    computedColorValue,
    computedSizeValue
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
            default: ''
        },
        /**
         * The size variant of the collapsible
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: ''
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
        computedColor (): string | undefined {
            return computedColorValue(componentName, this.color);
        },
        computedSize (): string | undefined {
            return computedSizeValue(componentName, this.size);
        },
        classes (): Classes {
            return {
                [`-${this.computedColor}`]: Boolean(this.computedColor),
                [`-${this.computedSize}`]: Boolean(this.computedSize),
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
</script>

<template>
    <div
        class="collapsible"
        :class="classes"
        role="tablist"
        aria-multiselectable="true"
        v-bind="$attrs"
    >
        <slot />
    </div>
</template>