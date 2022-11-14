<script lang="ts">
import { defineComponent } from 'vue';
import {
    CollapsibleMixin,
    computedPropValue,
    computedColorValue,
    sizePropValidator, computedSizeValue
} from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default sidebar content
 * @name default
 * @kind slot
 */

const componentName = 'ISidebar';

export default defineComponent({
    name: componentName,
    mixins: [
        CollapsibleMixin
    ],
    provide (): { sidebar: any } {
        return {
            sidebar: this
        };
    },
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
        }
    },
    emits: [
        /**
         * Event emitted for setting the modelValue
         * @event update:modelValue
         */
        'update:modelValue'
    ],
    computed: {
        computedColor (): string | undefined {
            return computedColorValue(componentName, this.color);
        },
        computedSize (): string | undefined {
            return computedSizeValue(componentName, this.size);
        },
        classes (): Classes {
            return {
                ...this.collapsibleClasses,
                [`-${this.computedColor}`]: Boolean(this.computedColor),
                [`-${this.computedSize}`]: Boolean(this.computedSize),
                [`-collapse-${this.collapsePosition}`]: true,
                [`-placement-${this.placement}`]: true
            };
        },
        sidebarWrapperTransition (): string {
            return this.collapsePosition !== 'relative'
                ? 'sidebar-wrapper-none-transition'
                : 'sidebar-wrapper-transition';
        },
        sidebarTransition (): string {
            return this.collapsePosition !== 'relative'
                ? 'sidebar-transition'
                : 'sidebar-none-transition';
        }
    },
    methods: {
        onItemClick () {
            if (this.collapseOnItemClick && this.open) {
                this.setOpen(false);
            }
        },
        onOverlayClick () {
            if (this.collapseOnClickOutside && this.open) {
                this.setOpen(false);
            }
        }
    }
});
</script>

<template>
    <transition :name="sidebarWrapperTransition">
        <aside
            role="complementary"
            class="sidebar-wrapper"
            :class="classes"
            :aria-label="ariaLabel"
            ref="wrapper"
            v-show="open || !collapsible"
        >
            <transition :name="sidebarTransition">
                <div class="sidebar" v-show="collapsePosition === 'relative' || open || !collapsible">
                    <div class="sidebar-content">
                        <slot />
                    </div>
                </div>
            </transition>
            <transition name="sidebar-overlay-transition">
                <div
                    class="sidebar-overlay"
                    @click="onOverlayClick"
                    v-if="collapsePosition !== 'relative'"
                    v-show="open"
                />
            </transition>
        </aside>
    </transition>
</template>