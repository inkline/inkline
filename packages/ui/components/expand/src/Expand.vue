<script lang="ts">
import { defineComponent } from 'vue';
import { getStyleProperty } from '@inkline/utils';

const componentName = 'Expand';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The axis to expand on
         * @param {'x' | 'y'} axis
         * @default 'y'
         */
        axis: {
            type: String,
            default: 'x'
        }
    },
    setup(props) {
        function onEnterX(componentElement: Element) {
            const element = componentElement as HTMLElement;
            const height = getStyleProperty(element, 'height') ?? '';

            console.log({ height });

            element.style.height = typeof height === 'number' ? `${height}px` : height;
            element.style.position = 'absolute';
            element.style.visibility = 'hidden';
            element.style.width = 'auto';

            const width = element.offsetWidth;

            element.style.height = '';
            element.style.position = '';
            element.style.visibility = '';
            element.style.width = '0';

            setTimeout(() => {
                element.style.width = `${width}px`;
            });
        }

        function onEnterY(componentElement: Element) {
            const element = componentElement as HTMLElement;
            const width = getStyleProperty(element, 'width') ?? '';

            element.style.width = typeof width === 'number' ? `${width}px` : width;
            element.style.position = 'absolute';
            element.style.visibility = 'hidden';
            element.style.height = 'auto';

            const height = element.offsetHeight;

            element.style.width = '';
            element.style.position = '';
            element.style.visibility = '';
            element.style.height = '0';

            setTimeout(() => {
                element.style.height = `${height}px`;
            });
        }

        function onAfterEnterX(componentElement: Element) {
            const element = componentElement as HTMLElement;
            element.style.width = 'auto';
        }

        function onAfterEnterY(componentElement: Element) {
            const element = componentElement as HTMLElement;
            element.style.height = 'auto';
        }

        function onLeaveX(componentElement: Element) {
            const element = componentElement as HTMLElement;
            const width = element.offsetWidth;

            element.style.width = `${width}px`;
            setTimeout(() => {
                element.style.width = '0';
            });
        }

        function onLeaveY(componentElement: Element) {
            const element = componentElement as HTMLElement;
            const height = element.offsetHeight;

            element.style.height = `${height}px`;
            setTimeout(() => {
                element.style.height = '0';
            });
        }

        return {
            onEnter: props.axis === 'x' ? onEnterX : onEnterY,
            onAfterEnter: props.axis === 'x' ? onAfterEnterX : onAfterEnterY,
            onLeave: props.axis === 'x' ? onLeaveX : onLeaveY
        };
    }
});
</script>

<template>
    <Transition
        :name="`expand-${axis}`"
        @enter="onEnter"
        @after-enter="onAfterEnter"
        @leave="onLeave"
    >
        <slot />
    </Transition>
</template>
