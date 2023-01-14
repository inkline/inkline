import { defineComponent, Prop } from 'vue';
import { breakpointKeys } from '@inkline/inkline/constants';
import { breakpointClass, capitalizeFirst } from '@inkline/inkline/helpers';

/**
 * Slot for default column content
 * @name default
 * @kind slot
 */

/**
 * The number of columns to span for extra-small screen sizes. Setting the prop to true will set the width automatically
 * @name xs
 * @type Boolean | String | Number
 * @default
 */

/**
 * The number of columns to span for small screen sizes. Setting the prop to true will set the width automatically
 * @name sm
 * @type Boolean | String | Number
 * @default
 */

/**
 * The number of columns to span for medium screen sizes. Setting the prop to true will set the width automatically
 * @name md
 * @type Boolean | String | Number
 * @default
 */

/**
 * The number of columns to span for large screen sizes. Setting the prop to true will set the width automatically
 * @name lg
 * @type Boolean | String | Number
 * @default
 */

/**
 * The number of columns to span for extra-large screen sizes. Setting the prop to true will set the width automatically
 * @name xl
 * @type Boolean | String | Number
 * @default
 */

/**
 * The number of columns to span for extra-extra-large screen sizes. Setting the prop to true will set the width automatically
 * @name xxl
 * @type Boolean | String | Number
 * @default
 */

/**
 * Display the column as the first column
 * @name first
 * @type Boolean
 * @default false
 */

/**
 * Display the column as the first column on extra-small screens
 * @name first-xs
 * @type Boolean
 * @default false
 */

/**
 * Display the column as the first column on small screens
 * @name first-sm
 * @type Boolean
 * @default false
 */

/**
 * Display the column as the first column on medium screens
 * @name first-md
 * @type Boolean
 * @default false
 */

/**
 * Display the column as the first column on large screens
 * @name first-lg
 * @type Boolean
 * @default false
 */

/**
 * Display the column as the first column on extra-large screens
 * @name first-xl
 * @type Boolean
 * @default false
 */

/**
 * Display the column as the first column on extra-extra-large screens
 * @name first-xxl
 * @type Boolean
 * @default false
 */

/**
 * Display the column as the last column
 * @name last
 * @type Boolean
 * @default false
 */

/**
 * Display the column as the last column on extra-small screens
 * @name last-xs
 * @type Boolean
 * @default false
 */

/**
 * Display the column as the last column on small screens
 * @name last-sm
 * @type Boolean
 * @default false
 */

/**
 * Display the column as the last column on medium screens
 * @name last-md
 * @type Boolean
 * @default false
 */

/**
 * Display the column as the last column on large screens
 * @name last-lg
 * @type Boolean
 * @default false
 */

/**
 * Display the column as the last column on extra-large screens
 * @name last-xl
 * @type Boolean
 * @default false
 */

/**
 * Display the column as the last column on extra-extra-large screens
 * @name last-xxl
 * @type Boolean
 * @default false
 */

/**
 * The number of columns to offset the column by
 * @name offset
 * @type String | Number
 * @default
 */

/**
 * The number of columns to offset the column by on extra-small screens
 * @name offset-xs
 * @type String | Number
 * @default
 */

/**
 * The number of columns to offset the column by on small screens
 * @name offset-sm
 * @type String | Number
 * @default
 */

/**
 * The number of columns to offset the column by on medium screens
 * @name offset-md
 * @type String | Number
 * @default
 */

/**
 * The number of columns to offset the column by on large screens
 * @name offset-lg
 * @type String | Number
 * @default
 */

/**
 * The number of columns to offset the column by on extra-large screens
 * @name offset-xl
 * @type String | Number
 * @default
 */

/**
 * The number of columns to offset the column by on extra-extra-large screens
 * @name offset-xxl
 * @type String | Number
 * @default
 */

/**
 * The number of columns to push the column by
 * @name push
 * @type String | Number
 * @default
 */

/**
 * The number of columns to push the column by on extra-small screens
 * @name push-xs
 * @type String | Number
 * @default
 */

/**
 * The number of columns to push the column by on small screens
 * @name push-sm
 * @type String | Number
 * @default
 */

/**
 * The number of columns to push the column by on medium screens
 * @name push-md
 * @type String | Number
 * @default
 */

/**
 * The number of columns to push the column by on large screens
 * @name push-lg
 * @type String | Number
 * @default
 */

/**
 * The number of columns to push the column by on extra-large screens
 * @name push-xl
 * @type String | Number
 * @default
 */

/**
 * The number of columns to push the column by on extra-extra-large screens
 * @name push-xxl
 * @type String | Number
 * @default
 */

/**
 * The number of columns to pull the column by
 * @name pull
 * @type String | Number
 * @default
 */

/**
 * The number of columns to pull the column by on extra-small screens
 * @name pull-xs
 * @type String | Number
 * @default
 */

/**
 * The number of columns to pull the column by on small screens
 * @name pull-sm
 * @type String | Number
 * @default
 */

/**
 * The number of columns to pull the column by on medium screens
 * @name pull-md
 * @type String | Number
 * @default
 */

/**
 * The number of columns to pull the column by on large screens
 * @name pull-lg
 * @type String | Number
 * @default
 */

/**
 * The number of columns to pull the column by on extra-large screens
 * @name pull-xl
 * @type String | Number
 * @default
 */

/**
 * The number of columns to pull the column by on extra-extra-large screens
 * @name pull-xxl
 * @type String | Number
 * @default
 */

export const properties: { [key: string]: Prop<any> } = {};
for (const breakpoint of breakpointKeys) {
    if (breakpoint !== '') {
        properties[breakpoint] = {
            type: [String, Boolean, Number],
            default: false
        };
    }

    for (const property of ['first', 'last']) {
        properties[`${property}${capitalizeFirst(breakpoint)}`] = {
            type: Boolean,
            default: false
        };
    }

    for (const property of ['offset', 'push', 'pull']) {
        properties[`${property}${capitalizeFirst(breakpoint)}`] = {
            type: [String, Number],
            default: ''
        };
    }
}

const componentName = 'IColumn';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: properties,
    computed: {
        classes () {
            return Object.keys(properties)
                .reduce((acc: { [key: string]: boolean }, property) => {
                    if (this[property]) {
                        acc[breakpointClass(`-${property}`, this[property])] = true;
                    }

                    return acc;
                }, {});
        }
    }
});
