<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/inkline/composables';
import { IContainer } from '@inkline/inkline/components/IContainer';
import { IRow } from '@inkline/inkline/components/IRow';
import { IColumn } from '@inkline/inkline/components/IColumn';

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
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined
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
         * @default
         * @name size
         */
        size: {
            type: String,
            default: undefined
        }
    },
    setup(props) {
        const currentColor = computed(() => props.color);
        const currentSize = computed(() => props.size);
        const { color } = useComponentColor({ componentName, currentColor });
        const { size } = useComponentSize({ componentName, currentSize });

        const classes = computed(() => ({
            [`-${color.value}`]: true,
            [`-${size.value}`]: true,
            '-cover': props.cover,
            '-fullscreen': props.fullscreen
        }));

        return { classes };
    }
});
</script>

<template>
    <header class="header" :class="classes">
        <i-container :fluid="fluid">
            <i-row>
                <i-column>
                    <!-- @slot default Slot for default header content -->
                    <slot />
                </i-column>
            </i-row>
        </i-container>
    </header>
</template>
