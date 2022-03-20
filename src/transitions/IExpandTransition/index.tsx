import { defineComponent } from 'vue';
import { getStyleProperty } from '@inkline/inkline/helpers';

export default defineComponent({
    name: 'IExpandTransition',
    methods: {
        onEnter (element: HTMLElement) {
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
        },
        onAfterEnter (element: HTMLElement) {
            element.style.height = 'auto';
        },
        onLeave (element: HTMLElement) {
            element.style.height = getStyleProperty(element, 'height');

            getStyleProperty(element, 'height'); // Force rerender element to set correct height
            setTimeout(() => {
                element.style.height = 0 as any;
            });
        }
    }
});
