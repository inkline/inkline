<script lang="ts">
import { defineComponent } from 'vue';
import {
    computedColorValue,
    computedSizeValue
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
            default: ''
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
            default: ''
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
</script>

<template>
    <div class="tabs" :class="classes" role="tablist" aria-multiselectable="true">
        <div class="tabs-header">
            <slot name="header" />
        </div>
    
        <slot />
    </div>
</template>