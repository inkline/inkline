<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/inkline/composables';
import { Container } from '@inkline/inkline/components/Container';
import { Row } from '@inkline/inkline/components/Row';
import { Column } from '@inkline/inkline/components/Column';

const componentName = 'Header';

export default defineComponent({
    name: componentName,
    components: {
        Container,
        Row,
        Column
    },
    inheritAttrs: false,
    props: {
        /**
         * The color variant of the header
         * @type primary | light | dark
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * Display the header background as cover, always covering the whole header width or height
         * @type Boolean
         * @default false
         * @name cover
         */
        cover: {
            type: Boolean,
            default: false
        },
        /**
         * Display the inner content container as fluid, covering 100% of the header width
         * @type Boolean
         * @default false
         * @name fluid
         */
        fluid: {
            type: Boolean,
            default: false
        },
        /**
         * Display the header as fullscreen, covering 100% screen height and 100% screen width
         * @type Boolean
         * @default true
         * @name fullscreen
         */
        fullscreen: {
            type: Boolean,
            default: false
        },
        /**
         * The size variant of the header
         * @type sm | md | lg
         * @default
         * @name sizeMultiplier
         */
        size: {
            type: String,
            default: undefined
        }
    },
    setup(props) {
        const currentColor = computed(() => props.color);
        const currentSize = computed(() => props.size);
        const { color } = useComponentColor({ componentName, color: currentColor });
        const { size } = useComponentSize({ componentName, size: currentSize });

        const classes = computed(() => ({
            [`-${color.value}`]: true,
            [`-${size.value}`]: true,
            '-cover': props.cover,
            '-fullscreen': props.fullscreen
        }));

        return { classes };
    }
});
</script>

<template>
    <header v-bind="$attrs" class="header" :class="classes">
        <Container :fluid="fluid">
            <Row>
                <Column>
                    <!-- @slot default Slot for default header content -->
                    <slot />
                </Column>
            </Row>
        </Container>
    </header>
</template>
