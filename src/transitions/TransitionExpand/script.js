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
                    element.style.position = 'absolute';
                    element.style.visibility = 'hidden';
                    element.style.height = 'auto';

                    const height = getComputedStyle(element).height;
                    element.style.position = null;
                    element.style.visibility = null;
                    element.style.height = '0px';

                    setTimeout(() => {
                        element.style.height = height;
                    }, 0);
                },
                afterEnter(element) {
                    element.style.height = 'auto';
                },
                leave(element) {
                    element.style.height = getComputedStyle(element).height;

                    setTimeout(() => {
                        element.style.height = '0px';
                    }, 0);
                }
            }
        };

        return h('transition', data, context.children);
    }
};
