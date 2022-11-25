<script lang="ts" setup>
import {computed, provide, ref, watch} from 'vue';
import {useComponentColor, useComponentSize} from "@inkline/inkline/composables";
import {TabsKey} from "@inkline/inkline/components/ITabs/mixin";

const componentName = 'ITabs';

const props = defineProps({
    /**
     * The color variant of the tabs
     * @type light | dark
     * @default light
     * @name color
     */
    color: {
        type: String,
        default: ''
    },
    /**
     * Used to set the currently active tab
     * @type String
     * @default
     * @name modelValue
     */
    modelValue: {
        type: String,
        default: ''
    },
    /**
     * The size variant of the tabs
     * @type sm | md | lg
     * @default md
     * @name size
     */
    size: {
        type: String,
        default: ''
    },
    /**
     * Display the tabs header as full width
     * @type Boolean
     * @default false
     * @name stretch
     */
    stretch: {
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

const active = ref(props.modelValue);
const tabs = ref<string[]>([]);

const currentColor = computed(() => props.color);
const currentSize = computed(() => props.size);
const { color } = useComponentColor({ componentName, currentColor });
const { size } = useComponentSize({ componentName, currentSize });

const classes = computed(() => ({
    [`-${color.value}`]: true,
    [`-${size.value}`]: true,
    '-stretch': props.stretch
}));

watch(() => props.modelValue, (value) => {
    active.value = value;
});

provide(TabsKey, {
    active,
    setActive
});

function setActive (id: string) {
    active.value = id;
    emit('update:modelValue', active.value);
}
</script>

<template>
    <div class="tabs" :class="classes" role="tablist" aria-multiselectable="true">
        <div class="tabs-header">
            <!-- @slot header Slot for tabs header -->
            <slot name="header" />
        </div>

        <!-- @slot default Slot for tab components -->
        <slot />
    </div>
</template>
