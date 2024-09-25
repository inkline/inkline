<script lang="ts">
import { computed, defineComponent, toRef } from 'vue';
import { useLinkable } from '@inkline/inkline/composables';

const componentName = 'IBreadcrumbItem';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The active state of the breadcrumb item
         * @type Boolean
         * @default false
         * @name active
         */
        active: {
            type: Boolean,
            default: false
        },
        /**
         * The disabled state of the breadcrumb item
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         *
         * @type String
         * @default undefined
         * @name to
         */
        href: {
            type: String,
            default: undefined
        },
        /**
         * The tabindex of the breadcrumb item
         * @type Number | String
         * @default 0
         * @name tabindex
         */
        tabindex: {
            type: [Number, String],
            default: 0
        },
        /**
         * Set the HTML tag to be used for rendering the breadcrumb item
         * @name tag
         * @type String
         * @default a
         */
        tag: {
            type: String,
            default: 'a'
        },
        /**
         *
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
        const to = toRef(props, 'to');
        const href = toRef(props, 'href');
        const tag = toRef(props, 'tag');
        const { tag: renderTag } = useLinkable({ to, href, tag });

        const classes = computed(() => ({
            '-active': props.active,
            '-disabled': props.disabled
        }));

        const tabIndex = computed(() => (props.disabled || props.active ? -1 : props.tabindex));

        const bindings = computed(() => ({
            ...(to.value ? { to: to.value } : href.value ? { href: href.value } : {}),
            tabindex: tabIndex.value,
            'aria-disabled': props.disabled ? 'true' : null,
            'aria-current': props.active ? 'location' : undefined
        }));

        return {
            bindings,
            classes,
            renderTag
        };
    }
});
</script>

<template>
    <li v-bind="$attrs" class="breadcrumb-item" :class="classes" role="menuitem">
        <component v-bind="bindings" :is="renderTag" :tag="tag">
            <!-- @slot default Slot for default breadcrumb item content -->
            <slot />
        </component>
    </li>
</template>
`
