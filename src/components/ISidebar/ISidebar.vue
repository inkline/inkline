<script lang="ts">
import { computed, defineComponent, provide, ref, toRef } from 'vue';
import { SidebarKey } from '@inkline/inkline/components/ISidebar/mixin';
import { useCollapsible, useComponentColor, useComponentSize } from '@inkline/inkline/composables';

const componentName = 'ISidebar';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The aria-label of the sidebar
         * @type String
         * @default Sidebar
         * @name ariaLabel
         */
        ariaLabel: {
            type: String,
            default: 'Sidebar'
        },
        /**
         * Breakpoint to collapse the sidebar at. If boolean value, sets to always or never collapse
         * @type Boolean | String
         * @default 'md'
         * @name collapse
         */
        collapse: {
            type: [String, Boolean],
            default: 'md'
        },
        /**
         * Determines if the sidebar should close when clicking a sidebar item
         * @type Boolean
         * @default true
         * @name collapseOnItemClick
         */
        collapseOnItemClick: {
            type: Boolean,
            default: true
        },
        /**
         * Determines if the sidebar should close when clicking outside, on the overlay
         * @type Boolean
         * @default true
         * @name collapseOnClickOutside
         */
        collapseOnClickOutside: {
            type: Boolean,
            default: true
        },
        /**
         * The collapse position of the sidebar
         * @type fixed | absolute | relative
         * @default absolute
         * @name collapsePosition
         */
        collapsePosition: {
            type: String,
            default: 'absolute'
        },
        /**
         * The color variant of the sidebar
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * The placement of the sidebar
         * @type left | right
         * @default left
         * @name placement
         */
        placement: {
            type: String,
            default: 'left'
        },
        /**
         * The size variant of the navbar
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: ''
        },
        /**
         * Used to manually control the collapsed state of the sidebar
         * @type Boolean
         * @default false
         * @name modelValue
         */
        modelValue: {
            type: Boolean,
            default: false
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
        const wrapperRef = ref<HTMLElement | null>(null);

        const currentColor = computed(() => props.color);
        const currentSize = computed(() => props.size);
        const { color } = useComponentColor({ componentName, currentColor });
        const { size } = useComponentSize({ componentName, currentSize });

        const collapse = toRef(props, 'collapse');
        const modelValue = toRef(props, 'modelValue');
        const {
            open,
            collapsible,
            classes: collapsibleClasses,
            setOpen,
            toggleOpen
        } = useCollapsible({
            collapse,
            modelValue,
            emit
        });

        const classes = computed(() => ({
            ...collapsibleClasses.value,
            [`-${color.value}`]: true,
            [`-${size.value}`]: true,
            [`-collapse-${props.collapsePosition}`]: true,
            [`-placement-${props.placement}`]: true
        }));

        const sidebarWrapperTransition = computed(() => {
            return props.collapsePosition !== 'relative'
                ? 'sidebar-wrapper-none-transition'
                : 'sidebar-wrapper-transition';
        });

        const sidebarTransition = computed(() => {
            return props.collapsePosition !== 'relative'
                ? 'sidebar-transition'
                : 'sidebar-none-transition';
        });

        provide(SidebarKey, {
            onItemClick
        });

        function onItemClick() {
            if (props.collapseOnItemClick && open.value) {
                setOpen(false);
            }
        }

        function onOverlayClick() {
            if (props.collapseOnClickOutside && open.value) {
                setOpen(false);
            }
        }

        return {
            wrapperRef,
            classes,
            sidebarWrapperTransition,
            sidebarTransition,
            collapsible,
            open,
            toggleOpen,
            onOverlayClick
        };
    }
});
</script>

<template>
    <transition :name="sidebarWrapperTransition">
        <aside
            v-show="open || !collapsible"
            ref="wrapperRef"
            role="complementary"
            class="sidebar-wrapper"
            :class="classes"
            :aria-label="ariaLabel"
        >
            <transition :name="sidebarTransition">
                <div
                    v-show="collapsePosition === 'relative' || open || !collapsible"
                    class="sidebar"
                >
                    <div class="sidebar-content">
                        <!-- @slot default Slot for sidebar content -->
                        <slot />
                    </div>
                </div>
            </transition>
            <transition name="sidebar-overlay-transition">
                <div
                    v-if="collapsePosition !== 'relative'"
                    v-show="open"
                    class="sidebar-overlay"
                    @click="onOverlayClick"
                />
            </transition>
        </aside>
    </transition>
</template>
