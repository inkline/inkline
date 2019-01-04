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
                    const width = getComputedStyle(element).width;

                    element.style.width = width;
                    element.style.position = 'absolute';
                    element.style.visibility = 'hidden';
                    element.style.height = 'auto';

                    const height = getComputedStyle(element).height;

                    element.style.width = null;
                    element.style.position = null;
                    element.style.visibility = null;
                    element.style.height = 0;

                    getComputedStyle(element).height; // Force rerender element to set correct height
                    setTimeout(() => {
                        element.style.height = height;
                    });
                },
                afterEnter(element) {
                    element.style.height = 'auto';
                },
                leave(element) {
                    element.style.height = getComputedStyle(element).height;

                    getComputedStyle(element).height; // Force rerender element to set correct height
                    setTimeout(() => {
                        element.style.height = 0;
                    });
                }
            }
        };

        return h('transition', data, context.children);
    }
};
