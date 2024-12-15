<script lang="ts">
import { computed, defineComponent } from 'vue';
import { Linkable } from '@inkline/component-linkable';

const componentName = 'BreadcrumbItem';

export default defineComponent({
    name: componentName,
    components: {
        Linkable
    },
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
        const classes = computed(() => ({
            '-active': props.active,
            '-disabled': props.disabled
        }));

        const tabIndex = computed(() => (props.disabled || props.active ? -1 : props.tabindex));

        return {
            classes,
            tabIndex
        };
    }
});
</script>

<template>
    <li class="breadcrumb-item" :class="classes" role="menuitem">
        <Linkable
            :to="to"
            :href="href"
            :tag="tag"
            :tabindex="tabIndex"
            :aria-disabled="disabled && 'true'"
            :aria-current="active && 'location'"
        >
            <!-- @slot default Slot for default breadcrumb item content -->
            <slot />
        </Linkable>
    </li>
</template>
`
