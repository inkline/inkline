<template>
    <div class="box -color" :class="classes">
        <h5 class="title">
            {{ title }}
        </h5>
        <p class="description">
            {{ description }}
        </p>
        <slot />
    </div>
</template>

<script>
import GridBox from '~/components/docs/GridBox';

export default {
    name: 'ColorBox',
    extends: GridBox,
    props: {
        title: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss" scoped>
@import '~@inkline/inkline/src/css/config/index';
@import './GridBox';

.box.-color {
    > .title {
        margin: 0;
        display: block;
        font-size: font-size('md');
        font-weight: font-weight('semibold');
    }

    > .description {
        margin-top: spacers('1/2');
        margin-bottom: 0;
        font-size: $small-font-size;
    }
}
</style>
