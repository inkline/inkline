<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useComponentColor } from '@inkline/inkline/composables';

const componentName = 'ITable';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * Display the table with borders
         * @type Boolean
         * @default false
         * @name border
         */
        border: {
            type: Boolean,
            default: false
        },
        /**
         * Display the table rows as condensed
         * @type Boolean
         * @default false
         * @name condensed
         */
        condensed: {
            type: Boolean,
            default: false
        },
        /**
         * Display the table rows as alternating stripes
         * @type Boolean
         * @default false
         * @name striped
         */
        striped: {
            type: Boolean,
            default: false
        },
        /**
         * Set the table rows as hoverable
         * @type Boolean
         * @default false
         * @name hover
         */
        hover: {
            type: Boolean,
            default: false
        },
        /**
         * Set the table to be responsive, enabling horizontal scroll when overflowing the parent container
         * @type Boolean | xs | sm | md | lg | xl | xxl
         * @default false
         * @name responsive
         */
        responsive: {
            type: [Boolean, String],
            default: true
        },
        /**
         * Display the table rows without wrapping white-space
         * @type Boolean
         * @default false
         * @name nowrap
         */
        nowrap: {
            type: Boolean,
            default: false
        },
        /**
         * The color variant of the table
         * @type primary | success | light | dark | info | success | warning | danger
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const currentColor = computed(() => props.color);
        const { color } = useComponentColor({ componentName, currentColor });

        const classes = computed(() => ({
            [`-${color.value}`]: true,
            '-border': props.border,
            '-condensed': props.condensed,
            '-striped': props.striped,
            '-hover': props.hover,
            '-nowrap': props.nowrap,
            [`-responsive${typeof props.responsive === 'boolean' ? '' : `-${props.responsive}`}`]:
                Boolean(props.responsive)
        }));

        return {
            classes
        };
    }
});
</script>

<template>
    <div class="table-wrapper" :class="classes">
        <table class="table">
            <!-- @slot default Slot for table rows and data -->
            <slot />
        </table>
    </div>
</template>
