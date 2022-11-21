<script lang="ts" setup>
import {computed, defineComponent, provide, ref, toRef} from 'vue';
import {IContainer} from '@inkline/inkline/components/IContainer';
import {IRow} from '@inkline/inkline/components/IRow';
import {IColumn} from '@inkline/inkline/components/IColumn';
import {IHamburgerMenu} from '@inkline/inkline/components/IHamburgerMenu';
import {
    CollapsibleMixin,
    computedPropValue,
    computedColorValue,
    sizePropValidator, computedSizeValue
} from '@inkline/inkline/mixins';
import { ClickOutside } from '@inkline/inkline/directives';
import { Classes } from '@inkline/inkline/types';
import {NavbarKey} from "@inkline/inkline/components/INavbar/mixin";
import {useClickOutside, useCollapsible, useComponentColor, useComponentSize} from "@inkline/inkline/composables";

const componentName = 'INavbar';

const props = defineProps({
    /**
     * Determines if the navbar should close when clicking a navbar item
     * @type Boolean
     * @default true
     * @name collapseOnItemClick
     */
    collapseOnItemClick: {
        type: Boolean,
        default: true
    },
    /**
     * Determines if the navbar should close when clicking outside
     * @type Boolean
     * @default true
     * @name collapseOnClickOutside
     */
    collapseOnClickOutside: {
        type: Boolean,
        default: true
    },
    /**
     * Breakpoint to collapse the navbar at. If boolean value, sets to always or never collapse
     * @type Boolean | String
     * @default 'md'
     * @name collapse
     */
    collapse: {
        type: [String, Boolean],
        default: 'md'
    },
    /**
     * The color variant of the navbar
     * @type light | dark
     * @default light
     * @name color
     */
    color: {
        type: String,
        default: ''
    },
    /**
     * Display the inner container as fluid, spanning 100% width
     * @type Boolean
     * @default false
     * @name fluid
     */
    fluid: {
        type: Boolean,
        default: false
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
     * The animation of the hamburger menu component used for collapsing
     * @type close | arrow-up | arrow-down | arrow-left | arrow-right | plus | minus
     * @default close
     * @name menuAnimation
     */
    menuAnimation: {
        type: String,
        default: 'close'
    },
    /**
     * Used to manually control the collapsed state of the navbar
     * @type Boolean
     * @default false
     * @name modelValue
     */
    modelValue: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits([
    /**
     * Event emitted for setting the modelValue
     * @event update:modelValue
     */
    'update:modelValue'
]);

const navbarRef = ref<HTMLElement | null>(null);

const currentColor = computed(() => props.color);
const currentSize = computed(() => props.size);
const { color } = useComponentColor({ componentName, currentColor });
const { size } = useComponentSize({ componentName, currentSize });

const collapse = toRef(props, 'collapse');
const modelValue = toRef(props, 'modelValue');
const { open, collapsible, classes: collapsibleClasses, setOpen, toggleOpen } = useCollapsible({
    collapse,
    modelValue,
    emit
});

useClickOutside({
    elementRef: navbarRef,
    fn: onClickOutside
});

const classes = computed(() => ({
    ...collapsibleClasses.value,
    [`-${color.value}`]: true,
    [`-${size.value}`]: true,
}));

provide(NavbarKey, {
    collapsible,
    open,
    onItemClick
});

function onItemClick () {
    if (props.collapseOnItemClick && open.value) {
        setOpen(false);
    }
}

function onClickOutside () {
    if (props.collapseOnClickOutside && open.value) {
        setOpen(false);
    }
}
</script>

<template>
    <nav ref="navbarRef" class="navbar" :class="classes" v-bind="$attrs">
        <i-container :fluid="fluid">
            <i-row>
                <i-column>
                    <i-hamburger-menu
                        class="collapse-toggle"
                        :animation="menuAnimation"
                        :color="color"
                        :model-value="open"
                        @update:modelValue="toggleOpen"
                    />
                    <!-- @slot default Slot for default navbar content -->
                    <slot />
                </i-column>
            </i-row>
        </i-container>
    </nav>
</template>
