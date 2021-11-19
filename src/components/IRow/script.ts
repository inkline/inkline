import { defineComponent, Prop } from 'vue';
import { breakpointKeys } from '@inkline/inkline/constants';
import { breakpointClass, capitalizeFirst } from '@inkline/inkline/helpers';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default row content
 * @name default
 * @kind slot
 */

/**
 * Justify the content to the start of the row
 * @name start
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the start of the row on extra-small screens
 * @name start-xs
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the start of the row on small screens
 * @name start-sm
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the start of the row on medium screens
 * @name start-md
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the start of the row on large screens
 * @name start-lg
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the start of the row on extra-large screens
 * @name start-xl
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the start of the row on extra-extra-large screens
 * @name start-xxl
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the center of the row
 * @name center
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the center of the row on extra-small screens
 * @name center-xs
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the center of the row on small screens
 * @name center-sm
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the center of the row on medium screens
 * @name center-md
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the center of the row on large screens
 * @name center-lg
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the center of the row on extra-large screens
 * @name center-xl
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the center of the row on extra-extra-large screens
 * @name center-xxl
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the end of the row
 * @name end
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the end of the row on extra-small screens
 * @name end-xs
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the end of the row on small screens
 * @name end-sm
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the end of the row on medium screens
 * @name end-md
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the end of the row on large screens
 * @name end-lg
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the end of the row on extra-large screens
 * @name end-xl
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the end of the row on extra-extra-large screens
 * @name end-xxl
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the top of the row
 * @name top
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the top of the row on extra-small screens
 * @name top-xs
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the top of the row on small screens
 * @name top-sm
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the top of the row on medium screens
 * @name top-md
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the top of the row on large screens
 * @name top-lg
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the top of the row on extra-large screens
 * @name top-xl
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the top of the row on extra-extra-large screens
 * @name top-xxl
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the middle of the row
 * @name middle
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the middle of the row on extra-small screens
 * @name middle-xs
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the middle of the row on small screens
 * @name middle-sm
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the middle of the row on medium screens
 * @name middle-md
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the middle of the row on large screens
 * @name middle-lg
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the middle of the row on extra-large screens
 * @name middle-xl
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the middle of the row on extra-extra-large screens
 * @name middle-xxl
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the bottom of the row
 * @name bottom
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the bottom of the row on extra-small screens
 * @name bottom-xs
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the bottom of the row on small screens
 * @name bottom-sm
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the bottom of the row on medium screens
 * @name bottom-md
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the bottom of the row on large screens
 * @name bottom-lg
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the bottom of the row on extra-large screens
 * @name bottom-xl
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the bottom of the row on extra-extra-large screens
 * @name bottom-xxl
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space around each item inside the row
 * @name around
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space around each item inside the row on extra-small screens
 * @name around-xs
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space around each item inside the row on small screens
 * @name around-sm
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space around each item inside the row on medium screens
 * @name around-md
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space around each item inside the row on large screens
 * @name around-lg
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space around each item inside the row on extra-large screens
 * @name around-xl
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space around each item inside the row on extra-extra-large screens
 * @name around-xxl
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space between each item inside the row
 * @name between
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space between each item inside the row on extra-small screens
 * @name between-xs
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space between each item inside the row on small screens
 * @name between-sm
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space between each item inside the row on medium screens
 * @name between-md
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space between each item inside the row on large screens
 * @name between-lg
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space between each item inside the row on extra-large screens
 * @name between-xl
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space between each item inside the row on extra-extra-large screens
 * @name between-xxl
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Order the content in reverse order inside the row
 * @name reverse
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Order the content in reverse order inside the row on extra-small screens
 * @name reverse-xs
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Order the content in reverse order inside the row on small screens
 * @name reverse-sm
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Order the content in reverse order inside the row on medium screens
 * @name reverse-md
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Order the content in reverse order inside the row on large screens
 * @name reverse-lg
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Order the content in reverse order inside the row on extra-large screens
 * @name reverse-xl
 * @kind member
 * @type Boolean
 * @default false
 */

/**
 * Order the content in reverse order inside the row on extra-extra-large screens
 * @name reverse-xxl
 * @kind member
 * @type Boolean
 * @default false
 */

const properties: { [key: string]: Prop<any> } = {};
for (const breakpoint of breakpointKeys) {
    for (const property of ['start', 'center', 'end', 'top', 'middle', 'bottom', 'around', 'between', 'reverse']) {
        properties[`${property}${capitalizeFirst(breakpoint)}`] = {
            type: Boolean,
            default: false
        };
    }
}

const componentName = 'IRow';

export default defineComponent({
    name: componentName,
    props: {
        noGutter: {
            type: Boolean,
            default: false
        },
        noCollapse: {
            type: Boolean,
            default: false
        },
        ...properties
    },
    computed: {
        classes (): Classes {
            const responsiveClasses = Object.keys(properties)
                .reduce((acc: { [key: string]: boolean }, property) => {
                    if ((this as any)[property]) {
                        acc[breakpointClass(`-${property}`, (this as any)[property])] = true;
                    }

                    return acc;
                }, {});

            return {
                '-no-gutter': this.noGutter,
                '-no-collapse': this.noCollapse,
                ...responsiveClasses
            };
        }
    }
});
