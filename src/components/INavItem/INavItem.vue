<script lang="ts">
import { computed, defineComponent, inject, toRef } from 'vue';
import { useLinkable } from '@inkline/inkline/composables';
import { NavKey } from '@inkline/inkline/components/INav/mixin';

const componentName = 'INavItem';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
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
    setup(props, { attrs }) {
        const nav = inject(NavKey, null);

        const to = toRef(props, 'to');
        const href = toRef(props, 'href');
        const currentTag = toRef(props, 'tag');
        const { tag } = useLinkable({ to, href, tag: currentTag });

        const disabled = computed(() => props.disabled);
        const ariaDisabled = computed(() => {
            if (attrs.role === 'link') {
                return null;
            }

            return disabled.value ? 'true' : null;
        });

        const classes = computed(() => ({
            '-active': props.active,
            '-disabled': disabled.value
        }));

        const role = computed(() => (props.to || props.href ? null : 'menuitem'));
        const tabIndex = computed(() => (disabled.value ? -1 : props.tabindex));

        function onClick(event: Event) {
            if (props.stopPropagation || !nav) {
                return;
            }

            nav.onItemClick(event);
        }

        return {
            classes,
            currentTag,
            disabled,
            ariaDisabled,
            role,
            tabIndex,
            onClick,
            tag
        };
    }
});
</script>

<template>
    <component
        v-bind="$attrs"
        :is="tag"
        :to="to"
        :href="href"
        class="nav-item"
        :role="role"
        :tag="currentTag"
        :tabindex="tabIndex"
        :class="classes"
        :disabled="disabled"
        :aria-disabled="ariaDisabled"
        @click="onClick"
    >
        <!-- @slot default Slot for default nav item content -->
        <slot />
    </component>
</template>
