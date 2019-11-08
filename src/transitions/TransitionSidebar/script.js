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
                    const height = getStyleProperty(element, 'height');

                    element.style.height = height;
                    element.style.position = 'absolute';
                    element.style.visibility = 'hidden';
                    element.style.width = 'auto';

                    const width = getStyleProperty(element, 'width');

                    element.style.height = null;
                    element.style.position = null;
                    element.style.visibility = null;
                    element.style.width = 0;

                    getStyleProperty(element, 'width'); // Force rerender element to set correct width
                    setTimeout(() => {
                        element.style.width = width;
                    });
                },
                afterEnter(element) {
                    element.style.width = 'auto';
                },
                leave(element) {
                    element.style.width = getStyleProperty(element, 'width');

                    getStyleProperty(element, 'width'); // Force rerender element to set correct width
                    setTimeout(() => {
                        element.style.width = 0;
                    });
                }
            }
        };

        return h('transition', data, context.children);
    }
};
