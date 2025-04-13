<script lang="ts">
import { computed, defineComponent, h, PropType } from 'vue';
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
         * @param {boolean} container
         * @default false
         */
        container: {
            type: Boolean,
            default: false
        },
        /**
         * Set the size of the grid item
         * @param {'auto' | number | BreakpointProp<string>} size
         * @default undefined
         */
        size: {
            type: [String, Number, Object] as PropType<BreakpointProp<GridSizeProp>>,
            default: undefined
        },
        /**
         * Set the size of the grid item on various screen sizes
         * @param {'auto' | number} {breakpoint}
         * @default undefined
         */
        xs: {
            type: [String, Number] as PropType<GridSizeProp>,
            default: undefined
        },
        sm: {
            type: [String, Number] as PropType<GridSizeProp>,
            default: undefined
        },
        md: {
            type: [String, Number] as PropType<GridSizeProp>,
            default: undefined
        },
        lg: {
            type: [String, Number] as PropType<GridSizeProp>,
            default: undefined
        },
        xl: {
            type: [String, Number] as PropType<GridSizeProp>,
            default: undefined
        },
        /**
         * Align the items in the row
         * @param {'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch' | BreakpointProp<FlexAlignItemsProp>} align-items
         * @default 'flex-start'
         */
        alignItems: {
            type: [String, Object] as PropType<BreakpointProp<FlexAlignItemsProp>>,
            default: undefined
        },
        /**
         * Align the items in the row on various screen sizes
         * @param {'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'} align-items-{breakpoint}
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
         * @param {'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | BreakpointProp<FlexJustifyContentProp>} justify-content
         * @default undefined
         */
        justifyContent: {
            type: [String, Object] as PropType<BreakpointProp<FlexJustifyContentProp>>,
            default: undefined
        },
        /**
         * Justify the content of the row on various screen sizes
         * @param {'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'} direction-{breakpoint}
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
         * @param {'row' | 'row-reverse' | 'column' | 'column-reverse' | BreakpointProp<FlexDirectionProp>} direction
         * @default undefined
         */
        direction: {
            type: [String, Object] as PropType<BreakpointProp<FlexDirectionProp>>,
            default: undefined
        },
        /**
         * Direction of the row content on various screen sizes
         * @param {'row' | 'row-reverse' | 'column' | 'column-reverse'} direction-{breakpoint}
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
         * Display the grid as inline flex
         * @param {boolean} inline
         * @default false
         */
        inline: {
            type: Boolean,
            default: false
        },
        /**
         * Offset the grid item
         * @param {number | BreakpointProp<number>} offset
         * @default undefined
         */
        offset: {
            type: [String, Number, Object] as PropType<BreakpointProp<`${number}` | number>>,
            default: undefined
        },
        /**
         * Offset the grid item on various screen sizes
         * @param {number} offset-{breakpoint}
         * @default undefined
         */
        offsetXs: {
            type: [String, Number],
            default: undefined
        },
        offsetSm: {
            type: [String, Number],
            default: undefined
        },
        offsetMd: {
            type: [String, Number],
            default: undefined
        },
        offsetLg: {
            type: [String, Number],
            default: undefined
        },
        offsetXl: {
            type: [String, Number],
            default: undefined
        },
        /**
         * Remove gap between child elements
         * @param {boolean} no-gap
         * @default false
         */
        noGap: {
            type: Boolean,
            default: false
        },
        /**
         * Disable wrapping of child elements
         * @param {boolean} no-wrap
         * @default false
         */
        noWrap: {
            type: Boolean,
            default: false
        },
        /**
         * The tag to use for the grid element
         * @param {string} tag
         * @default 'div'
         */
        tag: {
            type: String,
            default: 'div'
        }
    },
    setup(props, { slots }) {
        const classes = computed(() => {
            const result: Record<string, boolean> = {
                grid: true,
                '-container': props.container,
                '-inline': props.inline,
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

        // <!-- @slot default Slot for default grid content -->
        return () => h(props.tag, { class: classes.value }, slots.default?.());
    }
});
</script>
