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
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the start of the row on extra-small screens
 * @name start-xs
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the start of the row on small screens
 * @name start-sm
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the start of the row on medium screens
 * @name start-md
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the start of the row on large screens
 * @name start-lg
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the start of the row on extra-large screens
 * @name start-xl
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the start of the row on extra-extra-large screens
 * @name start-xxl
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the center of the row
 * @name center
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the center of the row on extra-small screens
 * @name center-xs
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the center of the row on small screens
 * @name center-sm
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the center of the row on medium screens
 * @name center-md
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the center of the row on large screens
 * @name center-lg
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the center of the row on extra-large screens
 * @name center-xl
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the center of the row on extra-extra-large screens
 * @name center-xxl
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the end of the row
 * @name end
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the end of the row on extra-small screens
 * @name end-xs
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the end of the row on small screens
 * @name end-sm
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the end of the row on medium screens
 * @name end-md
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the end of the row on large screens
 * @name end-lg
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the end of the row on extra-large screens
 * @name end-xl
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to the end of the row on extra-extra-large screens
 * @name end-xxl
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the top of the row
 * @name top
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the top of the row on extra-small screens
 * @name top-xs
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the top of the row on small screens
 * @name top-sm
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the top of the row on medium screens
 * @name top-md
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the top of the row on large screens
 * @name top-lg
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the top of the row on extra-large screens
 * @name top-xl
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the top of the row on extra-extra-large screens
 * @name top-xxl
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the middle of the row
 * @name middle
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the middle of the row on extra-small screens
 * @name middle-xs
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the middle of the row on small screens
 * @name middle-sm
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the middle of the row on medium screens
 * @name middle-md
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the middle of the row on large screens
 * @name middle-lg
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the middle of the row on extra-large screens
 * @name middle-xl
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the middle of the row on extra-extra-large screens
 * @name middle-xxl
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the bottom of the row
 * @name bottom
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the bottom of the row on extra-small screens
 * @name bottom-xs
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the bottom of the row on small screens
 * @name bottom-sm
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the bottom of the row on medium screens
 * @name bottom-md
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the bottom of the row on large screens
 * @name bottom-lg
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the bottom of the row on extra-large screens
 * @name bottom-xl
 * @type Boolean
 * @default false
 */

/**
 * Align the content to the bottom of the row on extra-extra-large screens
 * @name bottom-xxl
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space around each item inside the row
 * @name around
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space around each item inside the row on extra-small screens
 * @name around-xs
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space around each item inside the row on small screens
 * @name around-sm
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space around each item inside the row on medium screens
 * @name around-md
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space around each item inside the row on large screens
 * @name around-lg
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space around each item inside the row on extra-large screens
 * @name around-xl
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space around each item inside the row on extra-extra-large screens
 * @name around-xxl
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space between each item inside the row
 * @name between
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space between each item inside the row on extra-small screens
 * @name between-xs
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space between each item inside the row on small screens
 * @name between-sm
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space between each item inside the row on medium screens
 * @name between-md
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space between each item inside the row on large screens
 * @name between-lg
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space between each item inside the row on extra-large screens
 * @name between-xl
 * @type Boolean
 * @default false
 */

/**
 * Justify the content to have space between each item inside the row on extra-extra-large screens
 * @name between-xxl
 * @type Boolean
 * @default false
 */

/**
 * Order the content in reverse order inside the row
 * @name reverse
 * @type Boolean
 * @default false
 */

/**
 * Order the content in reverse order inside the row on extra-small screens
 * @name reverse-xs
 * @type Boolean
 * @default false
 */

/**
 * Order the content in reverse order inside the row on small screens
 * @name reverse-sm
 * @type Boolean
 * @default false
 */

/**
 * Order the content in reverse order inside the row on medium screens
 * @name reverse-md
 * @type Boolean
 * @default false
 */

/**
 * Order the content in reverse order inside the row on large screens
 * @name reverse-lg
 * @type Boolean
 * @default false
 */

/**
 * Order the content in reverse order inside the row on extra-large screens
 * @name reverse-xl
 * @type Boolean
 * @default false
 */

/**
 * Order the content in reverse order inside the row on extra-extra-large screens
 * @name reverse-xxl
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
    inheritAttrs: false,
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
