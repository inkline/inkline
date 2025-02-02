<script lang="ts">
import { computed, defineComponent, inject } from 'vue';
import { NavKey } from '@inkline/types';
import { Linkable } from '@inkline/component-linkable';

const componentName = 'NavItem';

export default defineComponent({
    name: componentName,
    components: { Linkable },
    props: {
        /**
         * The active state of the nav item
         * @type Boolean
         * @default false
         * @name active
         */
        active: {
            type: Boolean,
            default: false
        },
        /**
         * The disabled state of the nav item
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Renders the component as an anchor link with a `href` attribute
         * @type String
         * @default undefined
         * @name to
         */
        href: {
            type: String,
            default: undefined
        },
        /**
         * Used to close the nearest navbar or sidebar by propagating the onClick event
         * @type Boolean
         * @default false
         * @name stopPropagation
         */
        stopPropagation: {
            type: Boolean,
            default: false
        },
        /**
         * Set the HTML tag to be used for rendering the nav item
         * @type String
         * @default div
         * @name tag
         */
        tag: {
            type: String,
            default: 'div'
        },
        /**
         * The tabindex of the list group item
         * @type Number | String
         * @default 0
         * @name tabindex
         */
        tabindex: {
            type: [Number, String],
            default: 0
        },
        /**
         * Renders the component as a Router Link component with a `to` attribute
         * @type String
         * @default undefined
         * @name to
         */
        to: {
            type: [String, Object],
            default: undefined
        }
    },
    setup(props) {
        const nav = inject(NavKey, null);

        const disabled = computed(() => props.disabled);
        const ariaDisabled = computed(() => {
            return disabled.value ? 'true' : null;
        });

        const classes = computed(() => ({
            '-active': props.active,
            '-disabled': disabled.value
        }));

        const tabIndex = computed(() => (disabled.value ? -1 : props.tabindex));

        function onClick(event: Event) {
            if (props.stopPropagation || !nav) {
                return;
            }

            nav.onItemClick(event);
        }

        return {
            tabIndex,
            ariaDisabled,
            classes,
            onClick
        };
    }
});
</script>

<template>
    <Linkable
        :to="to"
        :href="href"
        :tag="tag"
        class="nav-item"
        :class="classes"
        role="menuitem"
        :tabindex="tabIndex"
        :disabled="disabled"
        :aria-disabled="ariaDisabled"
        aria-live="polite"
        @click="onClick"
    >
        <!-- @slot default Slot for default nav item content -->
        <slot />
    </Linkable>
</template>
