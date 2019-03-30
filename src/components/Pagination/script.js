import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';

import SizePropertyMixin from '@inkline/inkline/src/mixins/components/properties/SizePropertyMixin';
import VariantPropertyMixin from '@inkline/inkline/src/mixins/components/properties/VariantPropertyMixin';

export default {
    name: 'IPagination',
    mixins: [
        ClassesProviderMixin,

        SizePropertyMixin,
        VariantPropertyMixin,
    ],
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
            type: Number,
            default: 5
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
            return this.pageCount > this.limit && // Has more pages than limit
                this.value > this.limit - (this.limit - 1) / 2; // Active page is after limit - (limit - 1) / 2
        },
        showQuickNext() {
            return this.pageCount > this.limit && // Has more pages than limit
                this.value < this.pageCount - (this.limit - 1) / 2; // Active page is before pageCount - (limit - 1) / 2
        },
        pages() {
            const pages = [];

            if (this.showQuickPrevious && !this.showQuickNext) {
                const startPage = this.pageCount - (this.limit - 2);

                for (let i = startPage; i < this.pageCount; i++) {
                    pages.push(i);
                }
            } else if (!this.showQuickPrevious && this.showQuickNext) {
                for (let i = 2; i < this.limit; i++) {
                    pages.push(i);
                }
            } else if (this.showQuickPrevious && this.showQuickNext) {
                const offset = Math.floor(this.limit / 2) - 1;

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
            const jumpTo = this.value + (this.limit - 2);

            this.onClick(jumpTo > this.pageCount ? this.pageCount : jumpTo);
        },
        previous() {
            if (this.value === 1) { return; }

            this.onClick(this.value - 1);
        },
        quickPrevious() {
            const jumpTo = this.value - (this.limit - 2);

            this.onClick(jumpTo < 1 ? 1 : jumpTo);
        },
        onClick(item) {
            this.$emit('input', item);
            this.$emit('change', item);
        }
    }
};