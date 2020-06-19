<template>
    <div class="box" :class="classes">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'GridBox',
    props: {
        tall: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'primary'
        }
    },
    computed: {
        classes () {
            return [
                this.tall ? '-tall' : '',
                this.type ? `_background-${this.type}` : ''
            ];
        }
    }
};
</script>

<style src="./GridBox.scss" lang="scss" scoped></style>
