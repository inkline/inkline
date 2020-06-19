<template>
    <div class="api-table">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'ApiTable'
};
</script>

<style lang="scss" scoped>
@import '~@inkline/inkline/src/css/config/index';
@import '~@inkline/inkline/src/css/mixins/index';

.api-table {
    display: block;
    position: relative;
    transition-property: background-color;
    transition-duration: $transition-duration;
    transition-timing-function: $transition-easing;
}

.inkline {
    &.-light .api-table {
        background-color: $color-white;
    }

    &.-dark .api-table {
        background-color: darken($color-dark, 5%);
    }
}
</style>
