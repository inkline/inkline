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
 * @kind member
 * @type Boolean | String | Number
 * @default
 */

/**
 * The number of columns to span for small screen sizes. Setting the prop to true will set the width automatically
 * @name sm
 * @kind member
 * @type Boolean | String | Number
 * @default
 */

/**
 * The number of columns to span for medium screen sizes. Setting the prop to true will set the width automatically
 * @name md
 * @kind member
 * @type Boolean | String | Number
 * @default
 */

/**
 * The number of columns to span for large screen sizes. Setting the prop to true will set the width automatically
 * @name lg
 * @kind member
 * @type Boolean | String | Number
 * @default
 */

/**
 * The number of columns to span for extra-large screen sizes. Setting the prop to true will set the width automatically
 * @name xl
 * @kind member
 * @type Boolean | String | Number
 * @default
 */

/**
 * The number of columns to span for extra-extra-large screen sizes. Setting the prop to true will set the width automatically
 * @name xxl
 * @kind member
 * @type Boolean | String | Number
 * @default
 */

/**
 * Display the column as the first column
 * @name first
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Display the column as the first column on extra-small screens
 * @name first-xs
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Display the column as the first column on small screens
 * @name first-sm
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Display the column as the first column on medium screens
 * @name first-md
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Display the column as the first column on large screens
 * @name first-lg
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Display the column as the first column on extra-large screens
 * @name first-xl
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Display the column as the first column on extra-extra-large screens
 * @name first-xxl
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Display the column as the last column
 * @name last
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Display the column as the last column on extra-small screens
 * @name last-xs
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Display the column as the last column on small screens
 * @name last-sm
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Display the column as the last column on medium screens
 * @name last-md
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Display the column as the last column on large screens
 * @name last-lg
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Display the column as the last column on extra-large screens
 * @name last-xl
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Display the column as the last column on extra-extra-large screens
 * @name last-xxl
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * The number of columns to offset the column by
 * @name offset
 * @kind member
 * @type String | Number
 * @default
 */

/**
 * The number of columns to offset the column by on extra-small screens
 * @name offset-xs
 * @kind member
 * @type String | Number
 * @default
 */

/**
 * The number of columns to offset the column by on small screens
 * @name offset-sm
 * @kind member
 * @type String | Number
 * @default
 */

/**
 * The number of columns to offset the column by on medium screens
 * @name offset-md
 * @kind member
 * @type String | Number
 * @default
 */

/**
 * The number of columns to offset the column by on large screens
 * @name offset-lg
 * @kind member
 * @type String | Number
 * @default
 */

/**
 * The number of columns to offset the column by on extra-large screens
 * @name offset-xl
 * @kind member
 * @type String | Number
 * @default
 */

/**
 * The number of columns to offset the column by on extra-extra-large screens
 * @name offset-xxl
 * @kind member
 * @type String | Number
 * @default
 */

/**
 * The number of columns to push the column by
 * @name push
 * @kind member
 * @type String | Number
 * @default
 */

/**
 * The number of columns to push the column by on extra-small screens
 * @name push-xs
 * @kind member
 * @type String | Number
 * @default
 */

/**
 * The number of columns to push the column by on small screens
 * @name push-sm
 * @kind member
 * @type String | Number
 * @default
 */

/**
 * The number of columns to push the column by on medium screens
 * @name push-md
 * @kind member
 * @type String | Number
 * @default
 */

/**
 * The number of columns to push the column by on large screens
 * @name push-lg
 * @kind member
 * @type String | Number
 * @default
 */

/**
 * The number of columns to push the column by on extra-large screens
 * @name push-xl
 * @kind member
 * @type String | Number
 * @default
 */

/**
 * The number of columns to push the column by on extra-extra-large screens
 * @name push-xxl
 * @kind member
 * @type String | Number
 * @default
 */

/**
 * The number of columns to pull the column by
 * @name pull
 * @kind member
 * @type String | Number
 * @default
 */

/**
 * The number of columns to pull the column by on extra-small screens
 * @name pull-xs
 * @kind member
 * @type String | Number
 * @default
 */

/**
 * The number of columns to pull the column by on small screens
 * @name pull-sm
 * @kind member
 * @type String | Number
 * @default
 */

/**
 * The number of columns to pull the column by on medium screens
 * @name pull-md
 * @kind member
 * @type String | Number
 * @default
 */

/**
 * The number of columns to pull the column by on large screens
 * @name pull-lg
 * @kind member
 * @type String | Number
 * @default
 */

/**
 * The number of columns to pull the column by on extra-large screens
 * @name pull-xl
 * @kind member
 * @type String | Number
 * @default
 */

/**
 * The number of columns to pull the column by on extra-extra-large screens
 * @name pull-xxl
 * @kind member
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
