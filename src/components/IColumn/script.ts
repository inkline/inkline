import { defineComponent, Prop } from 'vue';
import { breakpointKeys } from '@inkline/inkline/constants';
import { breakpointClass, capitalizeFirst } from '@inkline/inkline/helpers';

/**
 * @name default
 * @kind slot
 * @description Slot for default column content
 */

/**
 * @name xs
 * @kind member
 * @description The number of columns to span for extra-small screen sizes. Setting the prop to true will set the width automatically
 * @type Boolean | String | Number
 * @default
 */

/**
 * @name sm
 * @kind member
 * @description The number of columns to span for small screen sizes. Setting the prop to true will set the width automatically
 * @type Boolean | String | Number
 * @default
 */

/**
 * @name md
 * @kind member
 * @description The number of columns to span for medium screen sizes. Setting the prop to true will set the width automatically
 * @type Boolean | String | Number
 * @default
 */

/**
 * @name lg
 * @kind member
 * @description The number of columns to span for large screen sizes. Setting the prop to true will set the width automatically
 * @type Boolean | String | Number
 * @default
 */

/**
 * @name xl
 * @kind member
 * @description The number of columns to span for extra-large screen sizes. Setting the prop to true will set the width automatically
 * @type Boolean | String | Number
 * @default
 */

/**
 * @name xxl
 * @kind member
 * @description The number of columns to span for extra-extra-large screen sizes. Setting the prop to true will set the width automatically
 * @type Boolean | String | Number
 * @default
 */

/**
 * @name first
 * @kind member
 * @description Display the column as the first column
 * @type Boolean
 * @default false
 */

/**
 * @name first-xs
 * @kind member
 * @description Display the column as the first column on extra-small screens
 * @type Boolean
 * @default false
 */

/**
 * @name first-sm
 * @kind member
 * @description Display the column as the first column on small screens
 * @type Boolean
 * @default false
 */

/**
 * @name first-md
 * @kind member
 * @description Display the column as the first column on medium screens
 * @type Boolean
 * @default false
 */

/**
 * @name first-lg
 * @kind member
 * @description Display the column as the first column on large screens
 * @type Boolean
 * @default false
 */

/**
 * @name first-xl
 * @kind member
 * @description Display the column as the first column on extra-large screens
 * @type Boolean
 * @default false
 */

/**
 * @name first-xxl
 * @kind member
 * @description Display the column as the first column on extra-extra-large screens
 * @type Boolean
 * @default false
 */

/**
 * @name last
 * @kind member
 * @description Display the column as the last column
 * @type Boolean
 * @default false
 */

/**
 * @name last-xs
 * @kind member
 * @description Display the column as the last column on extra-small screens
 * @type Boolean
 * @default false
 */

/**
 * @name last-sm
 * @kind member
 * @description Display the column as the last column on small screens
 * @type Boolean
 * @default false
 */

/**
 * @name last-md
 * @kind member
 * @description Display the column as the last column on medium screens
 * @type Boolean
 * @default false
 */

/**
 * @name last-lg
 * @kind member
 * @description Display the column as the last column on large screens
 * @type Boolean
 * @default false
 */

/**
 * @name last-xl
 * @kind member
 * @description Display the column as the last column on extra-large screens
 * @type Boolean
 * @default false
 */

/**
 * @name last-xxl
 * @kind member
 * @description Display the column as the last column on extra-extra-large screens
 * @type Boolean
 * @default false
 */

/**
 * @name offset
 * @kind member
 * @description The number of columns to offset the column by
 * @type String | Number
 * @default
 */

/**
 * @name offset-xs
 * @kind member
 * @description The number of columns to offset the column by on extra-small screens
 * @type String | Number
 * @default
 */

/**
 * @name offset-sm
 * @kind member
 * @description The number of columns to offset the column by on small screens
 * @type String | Number
 * @default
 */

/**
 * @name offset-md
 * @kind member
 * @description The number of columns to offset the column by on medium screens
 * @type String | Number
 * @default
 */

/**
 * @name offset-lg
 * @kind member
 * @description The number of columns to offset the column by on large screens
 * @type String | Number
 * @default
 */

/**
 * @name offset-xl
 * @kind member
 * @description The number of columns to offset the column by on extra-large screens
 * @type String | Number
 * @default
 */

/**
 * @name offset-xxl
 * @kind member
 * @description The number of columns to offset the column by on extra-extra-large screens
 * @type String | Number
 * @default
 */

/**
 * @name push
 * @kind member
 * @description The number of columns to push the column by
 * @type String | Number
 * @default
 */

/**
 * @name push-xs
 * @kind member
 * @description The number of columns to push the column by on extra-small screens
 * @type String | Number
 * @default
 */

/**
 * @name push-sm
 * @kind member
 * @description The number of columns to push the column by on small screens
 * @type String | Number
 * @default
 */

/**
 * @name push-md
 * @kind member
 * @description The number of columns to push the column by on medium screens
 * @type String | Number
 * @default
 */

/**
 * @name push-lg
 * @kind member
 * @description The number of columns to push the column by on large screens
 * @type String | Number
 * @default
 */

/**
 * @name push-xl
 * @kind member
 * @description The number of columns to push the column by on extra-large screens
 * @type String | Number
 * @default
 */

/**
 * @name push-xxl
 * @kind member
 * @description The number of columns to push the column by on extra-extra-large screens
 * @type String | Number
 * @default
 */

/**
 * @name pull
 * @kind member
 * @description The number of columns to pull the column by
 * @type String | Number
 * @default
 */

/**
 * @name pull-xs
 * @kind member
 * @description The number of columns to pull the column by on extra-small screens
 * @type String | Number
 * @default
 */

/**
 * @name pull-sm
 * @kind member
 * @description The number of columns to pull the column by on small screens
 * @type String | Number
 * @default
 */

/**
 * @name pull-md
 * @kind member
 * @description The number of columns to pull the column by on medium screens
 * @type String | Number
 * @default
 */

/**
 * @name pull-lg
 * @kind member
 * @description The number of columns to pull the column by on large screens
 * @type String | Number
 * @default
 */

/**
 * @name pull-xl
 * @kind member
 * @description The number of columns to pull the column by on extra-large screens
 * @type String | Number
 * @default
 */

/**
 * @name pull-xxl
 * @kind member
 * @description The number of columns to pull the column by on extra-extra-large screens
 * @type String | Number
 * @default
 */

const properties: { [key: string]: Prop<any> } = {};
for (let breakpoint of breakpointKeys) {
    if (breakpoint !== '') {
        properties[breakpoint] = {
            type: [String, Boolean, Number],
            default: false
        };
    }

    for (let property of ['first', 'last']) {
        properties[`${property}${capitalizeFirst(breakpoint)}`] = {
            type: Boolean,
            default: false
        };
    }

    for (let property of ['offset', 'push', 'pull']) {
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
        classes() {
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
