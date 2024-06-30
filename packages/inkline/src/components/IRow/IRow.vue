<script lang="ts">
import { computed, defineComponent } from 'vue';
import { breakpointClassName } from '@inkline/inkline/utils';

const componentName = 'IRow';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * Justify the content to the start of the row
         * @name start
         * @type Boolean
         * @default false
         */
        start: { type: Boolean, default: false },

        /**
         * Justify the content to the start of the row on extra-small screens
         * @name start-xs
         * @type Boolean
         * @default false
         */
        startXs: { type: Boolean, default: false },

        /**
         * Justify the content to the start of the row on small screens
         * @name start-sm
         * @type Boolean
         * @default false
         */
        startSm: { type: Boolean, default: false },

        /**
         * Justify the content to the start of the row on medium screens
         * @name start-md
         * @type Boolean
         * @default false
         */
        startMd: { type: Boolean, default: false },

        /**
         * Justify the content to the start of the row on large screens
         * @name start-lg
         * @type Boolean
         * @default false
         */
        startLg: { type: Boolean, default: false },

        /**
         * Justify the content to the start of the row on extra-large screens
         * @name start-xl
         * @type Boolean
         * @default false
         */
        startXl: { type: Boolean, default: false },

        /**
         * Justify the content to the start of the row on extra-extra-large screens
         * @name start-xxl
         * @type Boolean
         * @default false
         */
        startXxl: { type: Boolean, default: false },

        /**
         * Justify the content to the center of the row
         * @name center
         * @type Boolean
         * @default false
         */
        center: { type: Boolean, default: false },

        /**
         * Justify the content to the center of the row on extra-small screens
         * @name center-xs
         * @type Boolean
         * @default false
         */
        centerXs: { type: Boolean, default: false },

        /**
         * Justify the content to the center of the row on small screens
         * @name center-sm
         * @type Boolean
         * @default false
         */
        centerSm: { type: Boolean, default: false },

        /**
         * Justify the content to the center of the row on medium screens
         * @name center-md
         * @type Boolean
         * @default false
         */
        centerMd: { type: Boolean, default: false },

        /**
         * Justify the content to the center of the row on large screens
         * @name center-lg
         * @type Boolean
         * @default false
         */
        centerLg: { type: Boolean, default: false },

        /**
         * Justify the content to the center of the row on extra-large screens
         * @name center-xl
         * @type Boolean
         * @default false
         */
        centerXl: { type: Boolean, default: false },

        /**
         * Justify the content to the center of the row on extra-extra-large screens
         * @name center-xxl
         * @type Boolean
         * @default false
         */
        centerXxl: { type: Boolean, default: false },

        /**
         * Justify the content to the end of the row
         * @name end
         * @type Boolean
         * @default false
         */
        end: { type: Boolean, default: false },

        /**
         * Justify the content to the end of the row on extra-small screens
         * @name end-xs
         * @type Boolean
         * @default false
         */
        endXs: { type: Boolean, default: false },

        /**
         * Justify the content to the end of the row on small screens
         * @name end-sm
         * @type Boolean
         * @default false
         */
        endSm: { type: Boolean, default: false },

        /**
         * Justify the content to the end of the row on medium screens
         * @name end-md
         * @type Boolean
         * @default false
         */
        endMd: { type: Boolean, default: false },

        /**
         * Justify the content to the end of the row on large screens
         * @name end-lg
         * @type Boolean
         * @default false
         */
        endLg: { type: Boolean, default: false },

        /**
         * Justify the content to the end of the row on extra-large screens
         * @name end-xl
         * @type Boolean
         * @default false
         */
        endXl: { type: Boolean, default: false },

        /**
         * Justify the content to the end of the row on extra-extra-large screens
         * @name end-xxl
         * @type Boolean
         * @default false
         */
        endXxl: { type: Boolean, default: false },

        /**
         * Align the content to the top of the row
         * @name top
         * @type Boolean
         * @default false
         */
        top: { type: Boolean, default: false },

        /**
         * Align the content to the top of the row on extra-small screens
         * @name top-xs
         * @type Boolean
         * @default false
         */
        topXs: { type: Boolean, default: false },

        /**
         * Align the content to the top of the row on small screens
         * @name top-sm
         * @type Boolean
         * @default false
         */
        topSm: { type: Boolean, default: false },

        /**
         * Align the content to the top of the row on medium screens
         * @name top-md
         * @type Boolean
         * @default false
         */
        topMd: { type: Boolean, default: false },

        /**
         * Align the content to the top of the row on large screens
         * @name top-lg
         * @type Boolean
         * @default false
         */
        topLg: { type: Boolean, default: false },

        /**
         * Align the content to the top of the row on extra-large screens
         * @name top-xl
         * @type Boolean
         * @default false
         */
        topXl: { type: Boolean, default: false },

        /**
         * Align the content to the top of the row on extra-extra-large screens
         * @name top-xxl
         * @type Boolean
         * @default false
         */
        topXxl: { type: Boolean, default: false },

        /**
         * Align the content to the middle of the row
         * @name middle
         * @type Boolean
         * @default false
         */
        middle: { type: Boolean, default: false },

        /**
         * Align the content to the middle of the row on extra-small screens
         * @name middle-xs
         * @type Boolean
         * @default false
         */
        middleXs: { type: Boolean, default: false },

        /**
         * Align the content to the middle of the row on small screens
         * @name middle-sm
         * @type Boolean
         * @default false
         */
        middleSm: { type: Boolean, default: false },

        /**
         * Align the content to the middle of the row on medium screens
         * @name middle-md
         * @type Boolean
         * @default false
         */
        middleMd: { type: Boolean, default: false },

        /**
         * Align the content to the middle of the row on large screens
         * @name middle-lg
         * @type Boolean
         * @default false
         */
        middleLg: { type: Boolean, default: false },

        /**
         * Align the content to the middle of the row on extra-large screens
         * @name middle-xl
         * @type Boolean
         * @default false
         */
        middleXl: { type: Boolean, default: false },

        /**
         * Align the content to the middle of the row on extra-extra-large screens
         * @name middle-xxl
         * @type Boolean
         * @default false
         */
        middleXxl: { type: Boolean, default: false },

        /**
         * Align the content to the bottom of the row
         * @name bottom
         * @type Boolean
         * @default false
         */
        bottom: { type: Boolean, default: false },

        /**
         * Align the content to the bottom of the row on extra-small screens
         * @name bottom-xs
         * @type Boolean
         * @default false
         */
        bottomXs: { type: Boolean, default: false },

        /**
         * Align the content to the bottom of the row on small screens
         * @name bottom-sm
         * @type Boolean
         * @default false
         */
        bottomSm: { type: Boolean, default: false },

        /**
         * Align the content to the bottom of the row on medium screens
         * @name bottom-md
         * @type Boolean
         * @default false
         */
        bottomMd: { type: Boolean, default: false },

        /**
         * Align the content to the bottom of the row on large screens
         * @name bottom-lg
         * @type Boolean
         * @default false
         */
        bottomLg: { type: Boolean, default: false },

        /**
         * Align the content to the bottom of the row on extra-large screens
         * @name bottom-xl
         * @type Boolean
         * @default false
         */
        bottomXl: { type: Boolean, default: false },

        /**
         * Align the content to the bottom of the row on extra-extra-large screens
         * @name bottom-xxl
         * @type Boolean
         * @default false
         */
        bottomXxl: { type: Boolean, default: false },

        /**
         * Justify the content to have space around each item inside the row
         * @name around
         * @type Boolean
         * @default false
         */
        around: { type: Boolean, default: false },

        /**
         * Justify the content to have space around each item inside the row on extra-small screens
         * @name around-xs
         * @type Boolean
         * @default false
         */
        aroundXs: { type: Boolean, default: false },

        /**
         * Justify the content to have space around each item inside the row on small screens
         * @name around-sm
         * @type Boolean
         * @default false
         */
        aroundSm: { type: Boolean, default: false },

        /**
         * Justify the content to have space around each item inside the row on medium screens
         * @name around-md
         * @type Boolean
         * @default false
         */
        aroundMd: { type: Boolean, default: false },

        /**
         * Justify the content to have space around each item inside the row on large screens
         * @name around-lg
         * @type Boolean
         * @default false
         */
        aroundLg: { type: Boolean, default: false },

        /**
         * Justify the content to have space around each item inside the row on extra-large screens
         * @name around-xl
         * @type Boolean
         * @default false
         */
        aroundXl: { type: Boolean, default: false },

        /**
         * Justify the content to have space around each item inside the row on extra-extra-large screens
         * @name around-xxl
         * @type Boolean
         * @default false
         */
        aroundXxl: { type: Boolean, default: false },

        /**
         * Justify the content to have space between each item inside the row
         * @name between
         * @type Boolean
         * @default false
         */
        between: { type: Boolean, default: false },

        /**
         * Justify the content to have space between each item inside the row on extra-small screens
         * @name between-xs
         * @type Boolean
         * @default false
         */
        betweenXs: { type: Boolean, default: false },

        /**
         * Justify the content to have space between each item inside the row on small screens
         * @name between-sm
         * @type Boolean
         * @default false
         */
        betweenSm: { type: Boolean, default: false },

        /**
         * Justify the content to have space between each item inside the row on medium screens
         * @name between-md
         * @type Boolean
         * @default false
         */
        betweenMd: { type: Boolean, default: false },

        /**
         * Justify the content to have space between each item inside the row on large screens
         * @name between-lg
         * @type Boolean
         * @default false
         */
        betweenLg: { type: Boolean, default: false },

        /**
         * Justify the content to have space between each item inside the row on extra-large screens
         * @name between-xl
         * @type Boolean
         * @default false
         */
        betweenXl: { type: Boolean, default: false },

        /**
         * Justify the content to have space between each item inside the row on extra-extra-large screens
         * @name between-xxl
         * @type Boolean
         * @default false
         */
        betweenXxl: { type: Boolean, default: false },

        /**
         * Order the content in reverse order inside the row
         * @name reverse
         * @type Boolean
         * @default false
         */
        reverse: { type: Boolean, default: false },

        /**
         * Order the content in reverse order inside the row on extra-small screens
         * @name reverse-xs
         * @type Boolean
         * @default false
         */
        reverseXs: { type: Boolean, default: false },

        /**
         * Order the content in reverse order inside the row on small screens
         * @name reverse-sm
         * @type Boolean
         * @default false
         */
        reverseSm: { type: Boolean, default: false },

        /**
         * Order the content in reverse order inside the row on medium screens
         * @name reverse-md
         * @type Boolean
         * @default false
         */
        reverseMd: { type: Boolean, default: false },

        /**
         * Order the content in reverse order inside the row on large screens
         * @name reverse-lg
         * @type Boolean
         * @default false
         */
        reverseLg: { type: Boolean, default: false },

        /**
         * Order the content in reverse order inside the row on extra-large screens
         * @name reverse-xl
         * @type Boolean
         * @default false
         */
        reverseXl: { type: Boolean, default: false },

        /**
         * Order the content in reverse order inside the row on extra-extra-large screens
         * @name reverse-xxl
         * @type Boolean
         * @default false
         */
        reverseXxl: { type: Boolean, default: false },

        /**
         * Remove gutter between columns
         * @name no-gutter
         * @type Boolean
         * @default false
         */
        noGutter: {
            type: Boolean,
            default: false
        },

        /**
         * Disable wrapping of columns
         * @name no-collapse
         * @type Boolean
         * @default false
         */
        noCollapse: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const classes = computed(() => {
            const responsiveClasses = Object.keys(props).reduce<Record<string, boolean>>(
                (acc, property) => {
                    const value = (props as Record<string, string | number | boolean>)[property] as
                        | string
                        | number
                        | boolean;

                    if (value) {
                        const className = breakpointClassName(property, value);

                        acc[className] = true;
                    }

                    return acc;
                },
                {}
            );

            return {
                '-no-gutter': props.noGutter,
                '-no-collapse': props.noCollapse,
                ...responsiveClasses
            };
        });

        return {
            classes
        };
    }
});
</script>

<template>
    <div v-bind="$attrs" class="row" :class="classes">
        <!-- @slot default Slot for default row content -->
        <slot />
    </div>
</template>
