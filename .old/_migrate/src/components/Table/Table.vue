<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useComponentColor } from '@inkline/inkline/composables';

const componentName = 'Table';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * Display the table with borders
         * @type Boolean
         * @default false
         * @name bordered
         */
        bordered: {
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
         * @name hoverable
         */
        hoverable: {
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
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined
        }
    },
    setup(props) {
        const currentColor = computed(() => props.color);
        const { color } = useComponentColor({ componentName, color: currentColor });

        const classes = computed(() => ({
            [`-${color.value}`]: true,
            '-bordered': props.bordered,
            '-condensed': props.condensed,
            '-striped': props.striped,
            '-hoverable': props.hoverable,
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
    <div v-bind="$attrs" class="table" :class="classes">
        <table>
            <!-- @slot default Slot for table rows and data -->
            <slot />
        </table>
    </div>
</template>
