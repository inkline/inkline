import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';

import SizePropertyMixin from '@inkline/inkline/src/mixins/components/properties/SizePropertyMixin';
import VariantPropertyMixin from '@inkline/inkline/src/mixins/components/properties/VariantPropertyMixin';

import { debounce } from "@inkline/inkline/src/helpers";
import { breakpointKeys, breakpoints } from "@inkline/inkline/src/constants";

export default {
    name: 'IPagination',
    mixins: [
        ClassesProviderMixin,

        SizePropertyMixin,
        VariantPropertyMixin,
    ],
    data() {
        return {
            pageLimit: 5
        }
    },
    props: {
        itemsPerPage: {
            type: Number,
            default: 20
        },
        items: {
            type: Number,
            default: 0
        },
        limit: {
            type: [Number, Object],
            default() {
                return {
                    xs: 3,
                    sm: 5
                }
            }
        },
        quickLink: {
            type: Boolean,
            default: true
        },
        value: {
            type: Number,
            default: 1
        }
    },
    computed: {
        pageCount() {
            return Math.ceil(this.items / this.itemsPerPage);
        },
        showQuickPrevious() {
            return this.pageCount > this.pageLimit && // Has more pages than limit
                this.value > this.pageLimit - (this.pageLimit - 1) / 2; // Active page is after limit - (limit - 1) / 2
        },
        showQuickNext() {
            return this.pageCount > this.pageLimit && // Has more pages than limit
                this.value < this.pageCount - (this.pageLimit - 1) / 2; // Active page is before pageCount - (limit - 1) / 2
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

                for (let i = this.value - offset ; i <= this.value + offset; i++) {
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
            if (this.value === this.pageCount) { return; }

            this.onClick(this.value + 1);
        },
        quickNext() {
            if (!this.quickLink) { return; }

            const jumpTo = this.value + (this.pageLimit - 2);

            this.onClick(jumpTo > this.pageCount ? this.pageCount : jumpTo);
        },
        previous() {
            if (this.value === 1) { return; }

            this.onClick(this.value - 1);
        },
        quickPrevious() {
            if (!this.quickLink) { return; }

            const jumpTo = this.value - (this.pageLimit - 2);

            this.onClick(jumpTo < 1 ? 1 : jumpTo);
        },
        onClick(item) {
            this.$emit('input', item);
            this.$emit('change', item);
        },
        onWindowResize() {
            if (typeof this.limit === 'number') {
                return this.pageLimit = this.limit;
            }

            for (let breakpointKey of breakpointKeys.slice().reverse()) {
                if (this.limit.hasOwnProperty(breakpointKey) && (this.$isServer ||
                    !this.$isServer && typeof window !== 'undefined' && window.innerWidth >= breakpoints[breakpointKey][0])) {
                    return this.pageLimit = this.limit[breakpointKey];
                }
            }
        }
    },
    created() {
        this.debouncedOnWindowResize = debounce(this.onWindowResize, 250);

        if (!this.$isServer && typeof window !== 'undefined') {
            window.addEventListener('resize', this.debouncedOnWindowResize);
        }
    },
    mounted() {
        this.onWindowResize();
    },
    destroyed() {
        if (!this.$isServer && typeof window !== 'undefined') {
            window.removeEventListener('resize', this.debouncedOnWindowResize)
        }
    }
};
