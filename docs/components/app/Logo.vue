<script setup lang="ts">
import logoBlack from '~/assets/images/logo/logo-black.svg';
import logoWhite from '~/assets/images/logo/logo-white.svg';
import { computed } from 'vue';
import { useComponentColor } from 'inkline';

const props = defineProps({
    size: {
        type: String,
        default: 'md'
    }
});

const { color } = useComponentColor('Logo', undefined);

const classes = computed(() => ({
    [`-${color.value}`]: true,
    [`-${props.size}`]: true
}));
</script>

<template>
    <img
        v-if="color === 'dark'"
        alt="Inkline Logo"
        class="app-logo -white"
        :class="classes"
        height="24"
        width="22.5"
        :src="logoWhite"
    />
    <img
        v-else
        alt="Inkline Logo"
        class="app-logo -black"
        :class="classes"
        height="24"
        width="22.5"
        :src="logoBlack"
    />
</template>

<style lang="scss">
.app-logo {
    height: 24px;
    width: auto;

    &.-sm {
        height: 24px;
    }

    &.-md {
        height: 32px;
    }

    &.-lg {
        height: 48px;
    }
}
</style>
