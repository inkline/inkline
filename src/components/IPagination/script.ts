import { defineComponent } from 'vue';
import {
    defaultPropValue,
    colorVariantClass,
    sizePropValidator
} from '@inkline/inkline/mixins';
import { breakpointKeys, breakpoints } from '@inkline/inkline/constants';
import { debounce } from '@inkline/inkline/helpers';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for previous button content
 * @name previous
 * @kind slot
 */

/**
 * Slot for next button content
 * @name next
 * @kind slot
 */

const componentName = 'IPagination';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The aria-label of the pagination
         * @type String
         * @default Pagination
         * @name ariaLabel
         */
        ariaLabel: {
            type: String,
            default: 'Pagination'
        },
        /**
         * The color variant of the pagination
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * The number of items per page to be displayed
         * @type Number
         * @default 20
         * @name itemsPerPage
         */
        itemsPerPage: {
            type: Number,
            default: 20
        },
        /**
         * The total number of items
         * @type Number
         * @default 0
         * @name itemsTotal
         */
        itemsTotal: {
            type: Number,
            default: 0
        },
        /**
         * The maximum number of pagination buttons to show on each breakpoint
         * @type Number | Object
         * @name limit
         * @default { xs: 3, sm: 5 }
         */
        limit: {
            type: [Number, Object],
            default (): { [key: string]: number } {
                return {
                    xs: 3,
                    sm: 5
                };
            }
        },
        /**
         * Display the quick link buttons
         * @type Boolean
         * @default false
         * @name quickLink
         */
        quickLink: {
            type: Boolean,
            default: false
        },
        /**
         * Used to determine the current page
         * @type Number
         * @default 1
         * @name modelValue
         */
        modelValue: {
            type: Number,
            default: 1
        },
        /**
         * The size variant of the pagination
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        }
    },
    emits: [
        /**
         * Event emitted for setting the modelValue
         * @event update:modelValue
         */
        'update:modelValue'
    ],
    data (): { pageLimit: number } {
        return {
            pageLimit: 5
        };
    },
    computed: {
        classes (): Classes {
            return {
                ...colorVariantClass(this),
                [`-${(this as any).size}`]: Boolean((this as any).size)
            };
        },
        pageCount (): number {
            return Math.ceil((this as any).itemsTotal / (this as any).itemsPerPage);
        },
        showQuickPrevious (): boolean {
            return this.pageCount > this.pageLimit && // Has more pages than limit
                (this as any).modelValue > this.pageLimit - (this.pageLimit - 1) / 2; // Active page is after limit - (limit - 1) / 2
        },
        showQuickNext (): boolean {
            return this.pageCount > this.pageLimit && // Has more pages than limit
                (this as any).modelValue < this.pageCount - (this.pageLimit - 1) / 2; // Active page is before pageCount - (limit - 1) / 2
        },
        pages (): number[] {
            const pages = [];

            if (this.showQuickPrevious && !this.showQuickNext) {
                const startPage = this.pageCount - (this.pageLimit - 2);

                for (let i = startPage; i < this.pageCount; i++) {
                    pages.push(i);
                }
            } else if (!this.showQuickPrevious && this.showQuickNext) {
                for (let i = 2; i < this.pageLimit; i++) {
                    pages.push(i);
                }
            } else if (this.showQuickPrevious && this.showQuickNext) {
                const offset = Math.floor(this.pageLimit / 2) - 1;

                for (let i = (this as any).modelValue - offset; i <= (this as any).modelValue + offset; i++) {
                    pages.push(i);
                }
            } else {
                for (let i = 2; i < this.pageCount; i++) {
                    pages.push(i);
                }
            }

            return pages;
        }
    },
    created () {
        (this as any).debouncedOnWindowResize = debounce(this.onWindowResize, 250);

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', (this as any).debouncedOnWindowResize);

            this.onWindowResize();
        }
    },
    unmounted () {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', (this as any).debouncedOnWindowResize);
        }
    },
    methods: {
        next () {
            if ((this as any).modelValue === this.pageCount) { return; }

            this.onClick((this as any).modelValue + 1);
        },
        quickNext () {
            if (!(this as any).quickLink) { return; }

            const jumpTo = (this as any).modelValue + (this.pageLimit - 2);

            this.onClick(jumpTo > this.pageCount ? this.pageCount : jumpTo);
        },
        previous () {
            if ((this as any).modelValue === 1) { return; }

            this.onClick((this as any).modelValue - 1);
        },
        quickPrevious () {
            if (!(this as any).quickLink) { return; }

            const jumpTo = (this as any).modelValue - (this.pageLimit - 2);

            this.onClick(jumpTo < 1 ? 1 : jumpTo);
        },
        onClick (item: number) {
            this.$emit('update:modelValue', item);
        },
        onWindowResize () {
            if (typeof (this as any).limit === 'number') {
                this.pageLimit = (this as any).limit;
                return this.pageLimit;
            }

            for (const breakpointKey of breakpointKeys.slice().reverse()) {
                if ((this as any).limit.hasOwnProperty(breakpointKey) && (typeof window !== 'undefined' && window.innerWidth >= breakpoints[breakpointKey][0])) {
                    this.pageLimit = (this as any).limit[breakpointKey];
                    return this.pageLimit;
                }
            }
        }
    }
});
