<script lang="ts">
import { defineComponent } from 'vue';
import {
    computedPropValue,
    sizePropValidator,
    computedColorValue, computedSizeValue
} from '@inkline/inkline/mixins';

import IContainer from '@inkline/inkline/components/IContainer/index.vue';
import IRow from '@inkline/inkline/components/IRow/index.vue';
import IColumn from '@inkline/inkline/components/IColumn/index.vue';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default header content
 * @name default
 * @kind slot
 */

const componentName = 'IHeader';

export default defineComponent({
    name: componentName,
    components: {
        IContainer,
        IRow,
        IColumn
    },
    props: {
        /**
         * The color variant of the header
         * @type primary | light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * Display the header background as cover, always covering the whole header width or height
         * @type Boolean
         * @default false
         * @name cover
         */
        cover: {
            type: Boolean,
            default: false
        },
        /**
         * Display the inner content container as fluid, covering 100% of the header width
         * @type Boolean
         * @default false
         * @name fluid
         */
        fluid: {
            type: Boolean,
            default: false
        },
        /**
         * Display the header as fullscreen, covering 100% screen height and 100% screen width
         * @type Boolean
         * @default true
         * @name fullscreen
         */
        fullscreen: {
            type: Boolean,
            default: false
        },
        /**
         * The size variant of the header
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: '',
            validator: sizePropValidator
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
                '-cover': this.cover,
                '-fullscreen': this.fullscreen
            };
        }
    }
});
</script>

<template>
    <header class="header" :class="classes">
        <i-container :fluid="fluid">
            <i-row>
                <i-column>
                    <slot></slot>
                </i-column>
            </i-row>
        </i-container>
    </header>
</template>