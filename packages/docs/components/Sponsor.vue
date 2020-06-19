<template>
    <a class="sponsor" :href="data.url" :title="data.title" :class="classes" rel="noopener noreferrer">
        <div class="content">
            <img v-if="data.image" :src="data.image" :alt="data.title">
            <i-icon v-else icon="plus" />
        </div>
    </a>
</template>

<script>
export default {
    name: 'Sponsor',
    props: {
        data: {
            type: Object,
            default: () => ({})
        },
        size: {
            type: String,
            default: ''
        }
    },
    computed: {
        classes() {
            return {
                '-default': this.data.default,
                '-placeholder': this.data.placeholder,
                [`-${this.size}`]: Boolean(this.size)
            };
        }
    }
};
</script>

<style lang="scss">
@import '~@inkline/inkline/src/css/config/index';
@import '~@inkline/inkline/src/css/mixins/index';

$sponsor-size-base: 5rem !default;
$sponsor-size: size-map($sponsor-size-base, $sizes, $size-multipliers) !default;

$sponsor-padding-base: spacers('1') !default;
$sponsor-padding: size-map($sponsor-padding-base, $sizes, $size-multipliers) !default;

//
// Sponsor sizes
//
@each $size in $sizes {
    $_size: map_get($sponsor-size, $size);
    $_border-radius: map_get($border-radius, $size);
    $_padding: map_get($sponsor-padding, $size);

    .sponsor.-#{$size} {
        border-radius: $_border-radius;

        > .content {
            padding: $_padding;
            width: $_size;
            height: $_size;
        }
    }
}

.sponsor {
    display: inline-block;
    border-radius: 10px;
    border: 1px solid $color-gray-40;
    background: rgba($color-white, 0.75);
    cursor: pointer;
    transition: background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
    text-decoration: none;

    > .content {
        display: flex;
        justify-content: center;
        align-items: center;
        color: $color-gray-60;
        transition: color 0.3s ease;

        img {
            height: auto;
            width: 100%;
        }
    }

    &:hover,
    &:focus {
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        background: $color-white;
        transform: translateY(-5px);
        text-decoration: none;
    }

    &.-placeholder {
        border-style: dashed;
        background: transparent;

        &:hover,
        &:focus {
            background: rgba($color-white, 0.5);
            border-style: solid;

            > .content {
                color: $color-gray-70;
            }
        }
    }

    @extend .sponsor.-md;
}
</style>
