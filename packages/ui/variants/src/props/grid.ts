import { PropType } from 'vue';

export const gridProps = {
    /**
     * Align the items in the row
     * @param {'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch' | string} align-items
     * @default 'flex-start'
     */
    alignItems: {
        type: [String, Object] as PropType<
            'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch' | string
        >,
        default: undefined
    },
    /**
     * Justify the content of the row
     * @param {'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | string} justify-content
     * @default undefined
     */
    justifyContent: {
        type: [String, Object] as PropType<
            | 'flex-start'
            | 'flex-end'
            | 'center'
            | 'space-between'
            | 'space-around'
            | 'space-evenly'
            | string
        >,
        default: undefined
    },
    /**
     * Direction of the row content
     * @param {'row' | 'row-reverse' | 'column' | 'column-reverse' | string} direction
     * @default undefined
     */
    direction: {
        type: [String, Object] as PropType<
            'row' | 'row-reverse' | 'column' | 'column-reverse' | string
        >,
        default: undefined
    },
    /**
     * Display property of the grid
     * @param {'block' | 'inline-block' | 'flex' | 'inline-flex' | string} display
     * @default undefined
     */
    display: {
        type: String as PropType<'block' | 'inline-block' | 'flex' | 'inline-flex' | string>,
        default: undefined
    },
    /**
     * Gap between child elements
     * @param {'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | string} gap
     * @default undefined
     */
    gap: {
        type: String as PropType<'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | string>,
        default: undefined
    },
    /**
     * Disable wrapping of child elements
     * @param {boolean} no-wrap
     * @default false
     */
    noWrap: {
        type: Boolean,
        default: false
    }
} as const;
