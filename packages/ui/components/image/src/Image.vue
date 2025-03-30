<script lang="ts">
import { computed, defineComponent } from 'vue';
import type { PropType } from 'vue';

const componentName = 'Image';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The source of the image
         * @param {string} src
         * @default
         */
        src: {
            type: String,
            required: true
        },
        /**
         * The alt text of the image
         * @param {string} alt
         * @default
         */
        alt: {
            type: String,
            default: ''
        },
        /**
         * Make the image fluid, always taking up the full width of its container
         * @param {boolean} fluid
         * @default false
         */
        fluid: {
            type: Boolean,
            default: false
        },
        /**
         * Make the image responsive, always scaling to the size of its container, up to its original size
         * @param {boolean} responsive
         * @default false
         */
        responsive: {
            type: Boolean,
            default: false
        },
        /**
         * Float the image to the left or right
         * @param {'left' | 'right'} float
         * @default ''
         */
        float: {
            type: String as PropType<'left' | 'right'>,
            default: ''
        }
    },
    setup(props) {
        const classes = computed(() => ({
            '-fluid': Boolean(props.fluid),
            '-responsive': Boolean(props.responsive),
            [`-float-${props.float}`]: Boolean(props.float)
        }));

        return {
            classes
        };
    }
});
</script>

<template>
    <img class="image" :class="classes" :src="src" :alt="alt" />
</template>
