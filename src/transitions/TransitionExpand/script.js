import { getStyleProperty } from "@inkline/inkline/src/helpers";

export default {
    name: 'ITransitionExpand',
    functional: true,

    render(h, context) {
        const data = {
            props: {
                name: 'expand',
            },
            on: {
                enter(element) {
                    const width = getStyleProperty(element, 'width');

                    element.style.width = width;
                    element.style.position = 'absolute';
                    element.style.visibility = 'hidden';
                    element.style.height = 'auto';

                    const height = getStyleProperty(element, 'height');

                    element.style.width = null;
                    element.style.position = null;
                    element.style.visibility = null;
                    element.style.height = 0;

                    getStyleProperty(element, 'height'); // Force rerender element to set correct height
                    setTimeout(() => {
                        element.style.height = height;
                    });
                },
                afterEnter(element) {
                    element.style.height = 'auto';
                },
                leave(element) {
                    element.style.height = getStyleProperty(element, 'height');

                    getStyleProperty(element, 'height'); // Force rerender element to set correct height
                    setTimeout(() => {
                        element.style.height = 0;
                    });
                }
            }
        };

        return h('transition', data, context.children);
    }
};
