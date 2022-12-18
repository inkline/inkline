<script lang="ts">
import { computed, defineComponent, toRef } from 'vue';
import { useLinkable } from '@inkline/inkline/composables';

const componentName = 'IBreadcrumbItem';

export default defineComponent({
    name: componentName,
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
        const currentHref = toRef(props, 'href');
        const currentTag = toRef(props, 'tag');
        const currentTo = toRef(props, 'to');
        const { tag } = useLinkable({ to: currentTo, href: currentHref, tag: currentTag });

        const classes = computed(() => ({
            '-active': props.active,
            '-disabled': props.disabled
        }));

        const tabIndex = computed(() => (props.disabled || props.active ? -1 : props.tabindex));

        return {
            tag,
            classes,
            tabIndex
        };
    }
});
</script>

<template>
    <li class="breadcrumb-item" :class="classes">
        <component
            v-bind="$attrs"
            :is="tag"
            :tabindex="tabIndex"
            :aria-current="active ? 'location' : undefined"
        >
            <!-- @slot default Slot for default breadcrumb item content -->
            <slot />
        </component>
    </li>
</template>
`
