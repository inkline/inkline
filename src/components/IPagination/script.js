import {
    defaultPropValue,
    colorVariantClass,
    sizePropValidator
} from '@inkline/inkline/src/mixins';
import { breakpointKeys, breakpoints } from '@inkline/inkline/src/constants';
import { debounce } from '@inkline/inkline/src/helpers';

/**
 * @name previous
 * @kind slot
 * @description Slot for previous button content
 */

/**
 * @name next
 * @kind slot
 * @description Slot for next button content
 */

const componentName = 'IPagination';

export default {
    name: componentName,
    emits: [
        /**
         * @event update:modelValue
         * @description Event emitted for setting the modelValue
         */
        'update:modelValue',
    ],
    props: {
        /**
         * @description The color variant of the pagination
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue(componentName, 'color')
        },
        /**
         * @description The number of items per page to be displayed
         * @type Number
         * @default 20
         */
        itemsPerPage: {
            type: Number,
            default: 20
        },
        /**
         * @description The total number of items
         * @type Number
         * @default 0
         */
        itemsTotal: {
            type: Number,
            default: 0
        },
        /**
         * @description The maximum number of pagination buttons to show on each breakpoint
         * @type Number | Object
         * @default
         * {
         *     xs: 3,
         *     sm: 5
         * }
         */
        limit: {
            type: [Number, Object],
            default() {
                return {
                    xs: 3,
                    sm: 5
                };
            }
        },
        /**
         * @description Display the quick link buttons
         * @type Boolean
         * @default false
         */
        quickLink: {
            type: Boolean,
            default: false
        },
        /**
         * @description Used to determine the current page
         * @type Number
         * @default 1
         */
        modelValue: {
            type: Number,
            default: 1
        },
        /**
         * @description The size variant of the pagination
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: defaultPropValue(componentName, 'size'),
            validator: sizePropValidator
        },
    },
    data() {
        return {
            pageLimit: 5
        };
    },
    computed: {
        classes() {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size)
            };
        },
        pageCount() {
            return Math.ceil(this.itemsTotal / this.itemsPerPage);
        },
        showQuickPrevious() {
            return this.pageCount > this.pageLimit && // Has more pages than limit
                this.modelValue > this.pageLimit - (this.pageLimit - 1) / 2; // Active page is after limit - (limit - 1) / 2
        },
        showQuickNext() {
            return this.pageCount > this.pageLimit && // Has more pages than limit
                this.modelValue < this.pageCount - (this.pageLimit - 1) / 2; // Active page is before pageCount - (limit - 1) / 2
        },
        pages() {
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

                for (let i = this.modelValue - offset ; i <= this.modelValue + offset; i++) {
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
    methods: {
        next() {
            if (this.modelValue === this.pageCount) { return; }

            this.onClick(this.modelValue + 1);
        },
        quickNext() {
            if (!this.quickLink) { return; }

            const jumpTo = this.modelValue + (this.pageLimit - 2);

            this.onClick(jumpTo > this.pageCount ? this.pageCount : jumpTo);
        },
        previous() {
            if (this.modelValue === 1) { return; }

            this.onClick(this.modelValue - 1);
        },
        quickPrevious() {
            if (!this.quickLink) { return; }

            const jumpTo = this.modelValue - (this.pageLimit - 2);

            this.onClick(jumpTo < 1 ? 1 : jumpTo);
        },
        onClick(item) {
            this.$emit('update:modelValue', item);
        },
        onWindowResize() {
            if (typeof this.limit === 'number') {
                this.pageLimit = this.limit;
                return this.pageLimit;
            }

            for (let breakpointKey of breakpointKeys.slice().reverse()) {
                if (this.limit.hasOwnProperty(breakpointKey) && (typeof window !== 'undefined' && window.innerWidth >= breakpoints[breakpointKey][0])) {
                    this.pageLimit = this.limit[breakpointKey];
                    return this.pageLimit;
                }
            }
        }
    },
    created() {
        this.debouncedOnWindowResize = debounce(this.onWindowResize, 250);

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this.debouncedOnWindowResize);

            this.onWindowResize();
        }
    },
    unmounted() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', this.debouncedOnWindowResize);
        }
    }
};
