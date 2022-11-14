<script lang="ts">
import { defineComponent } from 'vue';
import {
    computedPropValue,
    computedColorValue,
    sizePropValidator, computedSizeValue
} from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default nav content
 * @name default
 * @kind slot
 */

const componentName = 'INav';

export default defineComponent({
    name: componentName,
    provide () {
        return {
            nav: this
        };
    },
    inject: {
        navbar: {
            default: () => ({
                onItemClick: () => {}
            })
        },
        sidebar: {
            default: () => ({
                onItemClick: () => {}
            })
        }
    },
    props: {
        /**
         * The color variant of the nav
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * The size variant of the nav
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: ''
        },
        /**
         * Display the nav with vertical orientation
         * @type Boolean
         * @default false
         * @name vertical
         */
        vertical: {
            type: Boolean,
            default: false
        }
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
                '-vertical': this.vertical
            };
        }
    },
    methods: {
        onItemClick () {
            [(this as any).navbar, (this as any).sidebar].forEach((parent) => {
                parent.onItemClick();
            });
        }
    }
});
</script>

<template>
    <nav class="nav" :class="classes" role="menubar">
        <slot />
    </nav>
</template>