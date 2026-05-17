<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

const componentName = 'Typography';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The alignment of the blockquote
         * @param {'left' | 'center' | 'right'} align
         * @default 'left'
         */
        align: {
            type: String as PropType<'left' | 'center' | 'right'>,
            default: 'left'
        },
        /**
         * Display the blockquote with a thick border
         * @param {boolean} border
         * @default true
         */
        border: {
            type: Boolean,
            default: true
        },
        /**
         * Display the blockquote cite as dashed
         * @param {boolean} dashCite
         * @default true
         */
        dash: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {
        const classes = computed(() => ({
            [`-align-${props.align}`]: Boolean(props.align),
            '-dash': props.dash,
            '-border': props.border
        }));

        return {
            classes
        };
    }
});
</script>

<template>
    <blockquote class="blockquote" :class="classes">
        <!-- @slot default Slot for default blockquote content -->
        <slot />
        <cite v-if="$slots.cite">
            <!-- @slot cite Slot for blockquote citation -->
            <slot name="cite" />
        </cite>
    </blockquote>
</template>
