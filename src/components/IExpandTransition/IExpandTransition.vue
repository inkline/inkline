<script lang="ts">
import { defineComponent } from 'vue';
import { getStyleProperty } from '@grozav/utils';

export default defineComponent({
    name: 'IExpandTransition',
    setup() {
        function onEnter(element: HTMLElement) {
            const width = getStyleProperty(element, 'width');

            element.style.width = width;
            element.style.position = 'absolute';
            element.style.visibility = 'hidden';
            element.style.height = 'auto';

            const height = getStyleProperty(element, 'height');

            element.style.width = null as any;
            element.style.position = null as any;
            element.style.visibility = null as any;
            element.style.height = 0 as any;

            getStyleProperty(element, 'height'); // Force rerender element to set correct height
            setTimeout(() => {
                element.style.height = height;
            });
        }

        function onAfterEnter(element: HTMLElement) {
            element.style.height = 'auto';
        }

        function onLeave(element: HTMLElement) {
            element.style.height = getStyleProperty(element, 'height');

            getStyleProperty(element, 'height'); // Force rerender element to set correct height
            setTimeout(() => {
                element.style.height = 0 as any;
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

<style lang="scss" scoped>
@import '../../css/variables';

.expand-enter-active,
.expand-leave-active {
    transition-property: height;
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-easing);
    overflow: hidden;
}

.expand-enter,
.expand-leave-to {
    height: 0;
}

* {
    will-change: height;
    transform: translateZ(0);
    backface-visibility: hidden;
}

.expand-enter-from,
.expand-enter-active,
.expand-leave-active,
.expand-leave-to {
    will-change: height;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
}
</style>
