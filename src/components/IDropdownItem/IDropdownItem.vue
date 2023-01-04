<script lang="ts">
import { computed, defineComponent, inject, toRef, useAttrs } from 'vue';
import { useLinkable } from '@inkline/inkline/composables';
import { DropdownKey } from '@inkline/inkline/components/IDropdown/mixin';

const componentName = 'IDropdownItem';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The active state of the dropdown item
         * @type Boolean
         * @default false
         * @name active
         */
        active: {
            type: Boolean,
            default: false
        },
        /**
         * The disabled state of the dropdown item
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
         * Display the dropdown item as plaintext
         * @type String
         * @default div
         * @name plaintext
         */
        plaintext: {
            type: Boolean,
            default: false
        },
        /**
         * Set the HTML tag to be used for rendering the dropdown item
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
        const dropdown = inject(DropdownKey, null);
        const attrs = useAttrs();

        const to = toRef(props, 'to');
        const href = toRef(props, 'href');
        const currentTag = toRef(props, 'tag');
        const { tag } = useLinkable({ to, href, tag: currentTag });

        const classes = computed(() => ({
            '-active': props.active,
            '-disabled': props.disabled,
            '-plaintext': props.plaintext
        }));

        const disabled = computed(() => props.disabled || dropdown?.disabled.value);
        const ariaDisabled = computed(() => {
            if (attrs.role === 'link') {
                return null;
            }

            return disabled.value ? 'true' : null;
        });

        const role = computed(() => (props.to || props.href ? 'link' : 'menuitem'));
        const tabIndex = computed(() => (disabled.value ? -1 : props.tabindex));

        function onClick(event: Event) {
            dropdown?.onItemClick(event);
        }

        return {
            classes,
            disabled,
            ariaDisabled,
            role,
            tabIndex,
            tag,
            currentTag,
            onClick
        };
    }
});
</script>

<template>
    <component
        v-bind="$attrs"
        :is="tag"
        class="dropdown-item"
        :class="classes"
        :role="role"
        :tag="currentTag"
        :tabindex="tabIndex"
        :disabled="disabled"
        :aria-disabled="ariaDisabled"
        :aria-pressed="active"
        @click="onClick"
    >
        <!-- @slot default Slot for default dropdown item content -->
        <slot />
    </component>
</template>
