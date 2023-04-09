<script lang="ts">
import { computed, defineComponent, toRef } from 'vue';
import { useLinkable } from '@inkline/inkline/composables';

const componentName = 'IListGroupItem';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The active state of the list group item
         * @type Boolean
         * @default false
         * @name active
         */
        active: {
            type: Boolean,
            default: false
        },
        /**
         * The disabled state of the list group item
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

        const role = computed(() => (props.to || props.href ? null : 'listitem'));
        const tabIndex = computed(() => (disabled.value ? -1 : props.tabindex));

        const classes = computed(() => ({
            '-active': props.active,
            '-disabled': disabled.value
        }));

        const bindings = computed(() => ({
            ...attrs,
            ...(to.value ? { to: to.value } : href.value ? { href: href.value } : {}),
            ...(disabled.value ? { disabled: disabled.value } : {}),
            role: role.value,
            tabindex: tabIndex.value,
            'aria-disabled': ariaDisabled.value
        }));

        return {
            bindings,
            classes,
            currentTag,
            tag
        };
    }
});
</script>

<template>
    <component
        v-bind="bindings"
        :is="tag"
        :tag="currentTag"
        class="list-group-item"
        :class="classes"
    >
        <!-- @slot default Slot for list group item content -->
        <slot />
    </component>
</template>
