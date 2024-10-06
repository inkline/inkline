<script lang="ts">
import { computed, defineComponent, inject, toRef } from 'vue';
import { useLinkable } from '@inkline/inkline/composables';
import { NavKey } from '@inkline/inkline/constants';

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
        const tag = toRef(props, 'tag');
        const { tag: renderTag } = useLinkable({ to, href, tag: tag });

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

        const bindings = computed(() => ({
            ...attrs,
            ...(to.value ? { to: to.value } : href.value ? { href: href.value } : {}),
            ...(disabled.value ? { disabled: disabled.value } : {}),
            role: role.value,
            tabindex: tabIndex.value,
            'aria-disabled': ariaDisabled.value
        }));

        function onClick(event: Event) {
            if (props.stopPropagation || !nav) {
                return;
            }

            nav.onItemClick(event);
        }

        return {
            bindings,
            classes,
            renderTag,
            onClick
        };
    }
});
</script>

<template>
    <component
        v-bind="bindings"
        :is="renderTag"
        :tag="tag"
        class="nav-item"
        :class="classes"
        @click="onClick"
    >
        <!-- @slot default Slot for default nav item content -->
        <slot />
    </component>
</template>
