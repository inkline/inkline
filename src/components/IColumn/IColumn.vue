<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { breakpointClass } from '@grozav/utils';
import { Classes } from '@inkline/inkline/types';

const componentName = 'IColumn';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The number of columns to span for extra-small screen sizes. Setting the prop to true will set the width automatically
         * @name xs
         * @type Boolean | String | Number
         * @default
         */
        xs: { type: [Boolean, String, Number] as PropType<string>, default: '' },

        /**
         * The number of columns to span for small screen sizes. Setting the prop to true will set the width automatically
         * @name sm
         * @type Boolean | String | Number
         * @default
         */
        sm: { type: [Boolean, String, Number] as PropType<string>, default: '' },

        /**
         * The number of columns to span for medium screen sizes. Setting the prop to true will set the width automatically
         * @name md
         * @type Boolean | String | Number
         * @default
         */
        md: { type: [Boolean, String, Number] as PropType<string>, default: '' },

        /**
         * The number of columns to span for large screen sizes. Setting the prop to true will set the width automatically
         * @name lg
         * @type Boolean | String | Number
         * @default
         */
        lg: { type: [Boolean, String, Number] as PropType<string>, default: '' },

        /**
         * The number of columns to span for extra-large screen sizes. Setting the prop to true will set the width automatically
         * @name xl
         * @type Boolean | String | Number
         * @default
         */
        xl: { type: [Boolean, String, Number] as PropType<string>, default: '' },

        /**
         * The number of columns to span for extra-extra-large screen sizes. Setting the prop to true will set the width automatically
         * @name xxl
         * @type Boolean | String | Number
         * @default
         */
        xxl: { type: [Boolean, String, Number] as PropType<string>, default: '' },

        /**
         * Display the column as the first column
         * @name first
         * @type Boolean
         * @default false
         */
        first: { type: [Boolean], default: false },

        /**
         * Display the column as the first column on extra-small screens
         * @name first-xs
         * @type Boolean
         * @default false
         */
        firstXs: { type: [Boolean], default: false },

        /**
         * Display the column as the first column on small screens
         * @name first-sm
         * @type Boolean
         * @default false
         */
        firstSm: { type: [Boolean], default: false },

        /**
         * Display the column as the first column on medium screens
         * @name first-md
         * @type Boolean
         * @default false
         */
        firstMd: { type: [Boolean], default: false },

        /**
         * Display the column as the first column on large screens
         * @name first-lg
         * @type Boolean
         * @default false
         */
        firstLg: { type: [Boolean], default: false },

        /**
         * Display the column as the first column on extra-large screens
         * @name first-xl
         * @type Boolean
         * @default false
         */
        firstXl: { type: [Boolean], default: false },

        /**
         * Display the column as the first column on extra-extra-large screens
         * @name first-xxl
         * @type Boolean
         * @default false
         */
        firstXxl: { type: [Boolean], default: false },

        /**
         * Display the column as the last column
         * @name last
         * @type Boolean
         * @default false
         */
        last: { type: [Boolean], default: false },

        /**
         * Display the column as the last column on extra-small screens
         * @name last-xs
         * @type Boolean
         * @default false
         */
        lastXs: { type: [Boolean], default: false },

        /**
         * Display the column as the last column on small screens
         * @name last-sm
         * @type Boolean
         * @default false
         */
        lastSm: { type: [Boolean], default: false },

        /**
         * Display the column as the last column on medium screens
         * @name last-md
         * @type Boolean
         * @default false
         */
        lastMd: { type: [Boolean], default: false },

        /**
         * Display the column as the last column on large screens
         * @name last-lg
         * @type Boolean
         * @default false
         */
        lastLg: { type: [Boolean], default: false },

        /**
         * Display the column as the last column on extra-large screens
         * @name last-xl
         * @type Boolean
         * @default false
         */
        lastXl: { type: [Boolean], default: false },

        /**
         * Display the column as the last column on extra-extra-large screens
         * @name last-xxl
         * @type Boolean
         * @default false
         */
        lastXxl: { type: [Boolean], default: false },

        /**
         * The number of columns to offset the column by
         * @name offset
         * @type String | Number
         * @default
         */
        offset: { type: [String, Number] as PropType<string>, default: '' },

        /**
         * The number of columns to offset the column by on extra-small screens
         * @name offset-xs
         * @type String | Number
         * @default
         */
        offsetXs: { type: [String, Number] as PropType<string>, default: '' },

        /**
         * The number of columns to offset the column by on small screens
         * @name offset-sm
         * @type String | Number
         * @default
         */
        offsetSm: { type: [String, Number] as PropType<string>, default: '' },

        /**
         * The number of columns to offset the column by on medium screens
         * @name offset-md
         * @type String | Number
         * @default
         */
        offsetMd: { type: [String, Number] as PropType<string>, default: '' },

        /**
         * The number of columns to offset the column by on large screens
         * @name offset-lg
         * @type String | Number
         * @default
         */
        offsetLg: { type: [String, Number] as PropType<string>, default: '' },

        /**
         * The number of columns to offset the column by on extra-large screens
         * @name offset-xl
         * @type String | Number
         * @default
         */
        offsetXl: { type: [String, Number] as PropType<string>, default: '' },

        /**
         * The number of columns to offset the column by on extra-extra-large screens
         * @name offset-xxl
         * @type String | Number
         * @default
         */
        offsetXxl: { type: [String, Number] as PropType<string>, default: '' },

        /**
         * The number of columns to push the column by
         * @name push
         * @type String | Number
         * @default
         */
        push: { type: [String, Number] as PropType<string>, default: '' },

        /**
         * The number of columns to push the column by on extra-small screens
         * @name push-xs
         * @type String | Number
         * @default
         */
        pushXs: { type: [String, Number] as PropType<string>, default: '' },

        /**
         * The number of columns to push the column by on small screens
         * @name push-sm
         * @type String | Number
         * @default
         */
        pushSm: { type: [String, Number] as PropType<string>, default: '' },

        /**
         * The number of columns to push the column by on medium screens
         * @name push-md
         * @type String | Number
         * @default
         */
        pushMd: { type: [String, Number] as PropType<string>, default: '' },

        /**
         * The number of columns to push the column by on large screens
         * @name push-lg
         * @type String | Number
         * @default
         */
        pushLg: { type: [String, Number] as PropType<string>, default: '' },

        /**
         * The number of columns to push the column by on extra-large screens
         * @name push-xl
         * @type String | Number
         * @default
         */
        pushXl: { type: [String, Number] as PropType<string>, default: '' },

        /**
         * The number of columns to push the column by on extra-extra-large screens
         * @name push-xxl
         * @type String | Number
         * @default
         */
        pushXxl: { type: [String, Number] as PropType<string>, default: '' },

        /**
         * The number of columns to pull the column by
         * @name pull
         * @type String | Number
         * @default
         */
        pull: { type: [String, Number] as PropType<string>, default: '' },

        /**
         * The number of columns to pull the column by on extra-small screens
         * @name pull-xs
         * @type String | Number
         * @default
         */
        pullXs: { type: [String, Number] as PropType<string>, default: '' },

        /**
         * The number of columns to pull the column by on small screens
         * @name pull-sm
         * @type String | Number
         * @default
         */
        pullSm: { type: [String, Number] as PropType<string>, default: '' },

        /**
         * The number of columns to pull the column by on medium screens
         * @name pull-md
         * @type String | Number
         * @default
         */
        pullMd: { type: [String, Number] as PropType<string>, default: '' },

        /**
         * The number of columns to pull the column by on large screens
         * @name pull-lg
         * @type String | Number
         * @default
         */
        pullLg: { type: [String, Number] as PropType<string>, default: '' },

        /**
         * The number of columns to pull the column by on extra-large screens
         * @name pull-xl
         * @type String | Number
         * @default
         */
        pullXl: { type: [String, Number] as PropType<string>, default: '' },

        /**
         * The number of columns to pull the column by on extra-extra-large screens
         * @name pull-xxl
         * @type String | Number
         * @default
         */
        pullXxl: { type: [String, Number] as PropType<string>, default: '' }
    },
    setup(props) {
        const classes = computed(() =>
            Object.keys(props).reduce((acc: Classes, property) => {
                if ((props as Record<string, string | number | boolean>)[property]) {
                    acc[
                        breakpointClass(
                            `-${property}`,
                            (props as Record<string, string | number | boolean>)[property] as
                                | string
                                | number
                        )
                    ] = true;
                }

                return acc;
            }, {})
        );

        return {
            classes
        };
    }
});
</script>

<template>
    <div class="column" :class="classes">
        <!-- @slot default Slot for default column content -->
        <slot />
    </div>
</template>
