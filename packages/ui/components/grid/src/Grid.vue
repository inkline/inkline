<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import {
    BreakpointProp,
    FlexAlignItemsProp,
    FlexDirectionProp,
    FlexJustifyContentProp,
    GridSizeProp
} from './types';
import { toBreakpointClasses } from './utils';

const componentName = 'Grid';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * Mark the grid as a container, setting a max-width and centering the content
         * @name container
         * @type Boolean
         * @default false
         */
        container: {
            type: Boolean,
            default: false
        },
        /**
         * Set the size of the grid item
         * @name size
         * @type 'auto' | number | BreakpointProp<string>
         * @default undefined
         */
        size: {
            type: [String, Object] as PropType<BreakpointProp<GridSizeProp>>,
            default: undefined
        },
        /**
         * Set the size of the grid item on various screen sizes
         * @name {breakpoint}
         * @type 'auto' | number
         * @default undefined
         */
        xs: {
            type: String as PropType<GridSizeProp>,
            default: undefined
        },
        sm: {
            type: String as PropType<GridSizeProp>,
            default: undefined
        },
        md: {
            type: String as PropType<GridSizeProp>,
            default: undefined
        },
        lg: {
            type: String as PropType<GridSizeProp>,
            default: undefined
        },
        xl: {
            type: String as PropType<GridSizeProp>,
            default: undefined
        },
        /**
         * Align the items in the row
         * @name align-items
         * @type 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch' | BreakpointProp<FlexAlignItemsProp>
         * @default 'flex-start'
         */
        alignItems: {
            type: [String, Object] as PropType<BreakpointProp<FlexAlignItemsProp>>,
            default: undefined
        },
        /**
         * Align the items in the row on various screen sizes
         * @name align-items-{breakpoint}
         * @type 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
         * @default undefined
         */
        alignItemsXs: {
            type: String as PropType<FlexAlignItemsProp>,
            default: undefined
        },
        alignItemsSm: {
            type: String as PropType<FlexAlignItemsProp>,
            default: undefined
        },
        alignItemsMd: {
            type: String as PropType<FlexAlignItemsProp>,
            default: undefined
        },
        alignItemsLg: {
            type: String as PropType<FlexAlignItemsProp>,
            default: undefined
        },
        alignItemsXl: {
            type: String as PropType<FlexAlignItemsProp>,
            default: undefined
        },
        /**
         * Justify the content of the row
         * @name justify-content
         * @type 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | BreakpointProp<FlexJustifyContentProp>
         * @default undefined
         */
        justifyContent: {
            type: [String, Object] as PropType<BreakpointProp<FlexJustifyContentProp>>,
            default: undefined
        },
        /**
         * Justify the content of the row on various screen sizes
         * @name direction-{breakpoint}
         * @type 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
         * @default 'flex-start'
         */
        justifyContentXs: {
            type: String as PropType<FlexJustifyContentProp>,
            default: undefined
        },
        justifyContentSm: {
            type: String as PropType<FlexJustifyContentProp>,
            default: undefined
        },
        justifyContentMd: {
            type: String as PropType<FlexJustifyContentProp>,
            default: undefined
        },
        justifyContentLg: {
            type: String as PropType<FlexJustifyContentProp>,
            default: undefined
        },
        justifyContentXl: {
            type: String as PropType<FlexJustifyContentProp>,
            default: undefined
        },
        /**
         * Direction of the row content
         * @name direction
         * @type 'row' | 'row-reverse' | 'column' | 'column-reverse' | BreakpointProp<FlexDirectionProp>
         * @default undefined
         */
        direction: {
            type: [String, Object] as PropType<BreakpointProp<FlexDirectionProp>>,
            default: undefined
        },
        /**
         * Direction of the row content on various screen sizes
         * @name direction-{breakpoint}
         * @type 'row' | 'row-reverse' | 'column' | 'column-reverse'
         * @default undefined
         */
        directionXs: {
            type: String as PropType<FlexDirectionProp>,
            default: undefined
        },
        directionSm: {
            type: String as PropType<FlexDirectionProp>,
            default: undefined
        },
        directionMd: {
            type: String as PropType<FlexDirectionProp>,
            default: undefined
        },
        directionLg: {
            type: String as PropType<FlexDirectionProp>,
            default: undefined
        },
        directionXl: {
            type: String as PropType<FlexDirectionProp>,
            default: undefined
        },
        /**
         * Offset the grid item
         * @name offset
         * @type number | BreakpointProp<number>
         * @default undefined
         */
        offset: {
            type: [Number, Object] as PropType<BreakpointProp<number>>,
            default: undefined
        },
        /**
         * Offset the grid item on various screen sizes
         * @name offset-{breakpoint}
         * @type number
         * @default undefined
         */
        offsetXs: {
            type: Number,
            default: undefined
        },
        offsetSm: {
            type: Number,
            default: undefined
        },
        offsetMd: {
            type: Number,
            default: undefined
        },
        offsetLg: {
            type: Number,
            default: undefined
        },
        offsetXl: {
            type: Number,
            default: undefined
        },
        /**
         * Remove gap between child elements
         * @name no-gap
         * @type Boolean
         * @default false
         */
        noGap: {
            type: Boolean,
            default: false
        },
        /**
         * Disable wrapping of child elements
         * @name no-wrap
         * @type Boolean
         * @default false
         */
        noWrap: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const classes = computed(() => {
            const result: Record<string, boolean> = {
                '-container': props.container,
                '-no-gap': props.noGap,
                '-no-wrap': props.noWrap,
                ...toBreakpointClasses('size', props.size, {
                    xs: props.xs,
                    sm: props.sm,
                    md: props.md,
                    lg: props.lg,
                    xl: props.xl
                }),
                ...toBreakpointClasses('direction', props.direction, {
                    xs: props.directionXs,
                    sm: props.directionSm,
                    md: props.directionMd,
                    lg: props.directionLg,
                    xl: props.directionXl
                }),
                ...toBreakpointClasses('align-items', props.alignItems, {
                    xs: props.alignItemsXs,
                    sm: props.alignItemsSm,
                    md: props.alignItemsMd,
                    lg: props.alignItemsLg,
                    xl: props.alignItemsXl
                }),
                ...toBreakpointClasses('justify-content', props.justifyContent, {
                    xs: props.justifyContentXs,
                    sm: props.justifyContentSm,
                    md: props.justifyContentMd,
                    lg: props.justifyContentLg,
                    xl: props.justifyContentXl
                }),
                ...toBreakpointClasses('offset', props.offset, {
                    xs: props.offsetXs,
                    sm: props.offsetSm,
                    md: props.offsetMd,
                    lg: props.offsetLg,
                    xl: props.offsetXl
                })
            };

            return result;
        });

        return {
            classes
        };
    }
});
</script>

<template>
    <div class="grid" :class="classes">
        <!-- @slot default Slot for default row content -->
        <slot />
    </div>
</template>
