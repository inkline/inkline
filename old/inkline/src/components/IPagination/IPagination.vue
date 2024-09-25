<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import { breakpointKeys, breakpoints } from '@inkline/inkline/constants';
import { debounce } from '@grozav/utils';
import { useComponentColor, useComponentSize } from '@inkline/inkline/composables';

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
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined
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
            default: (): { [key: string]: number } => {
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
         * @default
         * @name sizeMultiplier
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * Show or hide navigation buttons for first or last page
         * @type boolean
         * @default true
         * @name showNavigationWhenDisabled
         */
        showNavigationWhenDisabled: {
            type: Boolean,
            default: true
        }
    },
    emits: [
        /**
         * Event emitted for setting the modelValue
         * @event update:modelValue
         */
        'update:modelValue'
    ],
    setup(props, { emit }) {
        const pageLimit = ref(5);

        const currentColor = computed(() => props.color);
        const currentSize = computed(() => props.size);
        const { color } = useComponentColor({ componentName, color: currentColor });
        const { size } = useComponentSize({ componentName, size: currentSize });

        const classes = computed(() => ({
            [`-${color.value}`]: true,
            [`-${size.value}`]: true
        }));

        const pageCount = computed(() => {
            return Math.ceil(props.itemsTotal / props.itemsPerPage);
        });

        const showQuickPrevious = computed(() => {
            return (
                pageCount.value > pageLimit.value && // Has more pages than limit
                props.modelValue > pageLimit.value - (pageLimit.value - 1) / 2
            ); // Active page is after limit - (limit - 1) / 2
        });
        const showQuickNext = computed(() => {
            return (
                pageCount.value > pageLimit.value && // Has more pages than limit
                props.modelValue < pageCount.value - (pageLimit.value - 1) / 2
            ); // Active page is before pageCount - (limit - 1) / 2
        });

        const showPrevious = computed(() => {
            return (
                pageCount.value > 0 &&
                (props.showNavigationWhenDisabled ? true : props.modelValue !== 1)
            );
        });
        const showNext = computed(() => {
            return (
                pageCount.value > 0 &&
                (props.showNavigationWhenDisabled ? true : props.modelValue !== pageCount.value)
            );
        });

        const pages = computed(() => {
            const pages = [];

            if (showQuickPrevious.value && !showQuickNext.value) {
                const startPage = pageCount.value - (pageLimit.value - 2);

                for (let i = startPage; i < pageCount.value; i++) {
                    pages.push(i);
                }
            } else if (!showQuickPrevious.value && showQuickNext.value) {
                for (let i = 2; i < pageLimit.value; i++) {
                    pages.push(i);
                }
            } else if (showQuickPrevious.value && showQuickNext.value) {
                const offset = Math.floor(pageLimit.value / 2) - 1;

                for (let i = props.modelValue - offset; i <= props.modelValue + offset; i++) {
                    pages.push(i);
                }
            } else {
                for (let i = 2; i < pageCount.value; i++) {
                    pages.push(i);
                }
            }

            return pages;
        });

        const debouncedOnWindowResize = debounce(onWindowResize, 250);

        onMounted(() => {
            if (typeof window !== 'undefined') {
                window.addEventListener('resize', debouncedOnWindowResize);

                onWindowResize();
            }
        });

        onBeforeUnmount(() => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', debouncedOnWindowResize);
            }
        });

        function next() {
            if (props.modelValue === pageCount.value) {
                return;
            }

            onClick(props.modelValue + 1);
        }

        function quickNext() {
            if (!props.quickLink) {
                return;
            }

            const jumpTo = props.modelValue + (pageLimit.value - 2);

            onClick(jumpTo > pageCount.value ? pageCount.value : jumpTo);
        }

        function previous() {
            if (props.modelValue === 1) {
                return;
            }

            onClick(props.modelValue - 1);
        }

        function quickPrevious() {
            if (!props.quickLink) {
                return;
            }

            const jumpTo = props.modelValue - (pageLimit.value - 2);

            onClick(jumpTo < 1 ? 1 : jumpTo);
        }

        function onClick(item: number) {
            emit('update:modelValue', item);
        }

        function onWindowResize() {
            if (typeof props.limit === 'number') {
                pageLimit.value = props.limit;
                return pageLimit.value;
            }

            for (const breakpointKey of breakpointKeys.slice().reverse()) {
                if (
                    breakpointKey in props.limit &&
                    typeof window !== 'undefined' &&
                    window.innerWidth >= breakpoints[breakpointKey][0]
                ) {
                    pageLimit.value = props.limit[breakpointKey];
                    return pageLimit.value;
                }
            }
        }

        return {
            classes,
            pageCount,
            pages,
            showQuickPrevious,
            showQuickNext,
            showPrevious,
            showNext,
            next,
            quickNext,
            previous,
            quickPrevious,
            onClick
        };
    }
});
</script>

<template>
    <nav
        v-bind="$attrs"
        class="pagination"
        :class="classes"
        role="navigation"
        :aria-label="ariaLabel"
    >
        <ul class="pagination-items">
            <li
                v-if="showPrevious"
                class="pagination-item -previous"
                :class="{ '-disabled': modelValue === 1 }"
                @click="previous"
            >
                <span aria-hidden="true">
                    <!-- @slot previous Slot for previous button content -->
                    <slot name="previous">&lt;</slot>
                </span>
            </li>
            <li
                v-if="pageCount > 0"
                class="pagination-item -first"
                :class="{ '-active': modelValue === 1 }"
                @click="onClick(1)"
            >
                1
            </li>
            <li
                v-if="showQuickPrevious"
                class="pagination-item -quick-previous"
                :class="{ '-disabled': !quickLink }"
                @click="quickPrevious"
            >
                &hellip;
            </li>
            <li
                v-for="(page, index) in pages"
                :key="index"
                class="pagination-item"
                :class="{ '-active': modelValue === page }"
                :aria-current="modelValue === page ? 'page' : false"
                @click="onClick(page)"
            >
                {{ page }}
            </li>
            <li
                v-if="showQuickNext"
                class="pagination-item -quick-next"
                :class="{ '-disabled': !quickLink }"
                @click="quickNext"
            >
                &hellip;
            </li>
            <li
                v-if="pageCount > 1"
                class="pagination-item -last"
                :class="{ '-active': modelValue === pageCount }"
                @click="onClick(pageCount)"
            >
                {{ pageCount }}
            </li>
            <li
                v-if="showNext"
                class="pagination-item -next"
                :class="{ '-disabled': modelValue === pageCount }"
                @click="next"
            >
                <span aria-hidden="true">
                    <!-- @slot next Slot for next button content -->
                    <slot name="next">&gt;</slot>
                </span>
            </li>
        </ul>
    </nav>
</template>
