<script lang="ts">
import { defineComponent } from 'vue';
import { getStyleProperty } from '@inkline/utils';

export default defineComponent({
    name: 'ExpandTransition',
    setup() {
        function onEnter(componentElement: Element) {
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

        function onAfterEnter(componentElement: Element) {
            const element = componentElement as HTMLElement;
            element.style.height = 'auto';
        }

        function onLeave(componentElement: Element) {
            const element = componentElement as HTMLElement;
            const height = element.offsetHeight;

            element.style.height = `${height}px`;
            setTimeout(() => {
                element.style.height = '0';
            });
        }

        return {
            onEnter,
            onAfterEnter,
            onLeave
        };
    }
});
</script>

<template>
    <transition name="expand" @enter="onEnter" @after-enter="onAfterEnter" @leave="onLeave">
        <slot />
    </transition>
</template>
