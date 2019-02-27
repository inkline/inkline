import { findIndex, findLastIndex, throttle } from 'lodash';
import { on, off } from "@inkline/inkline/src/helpers";

function wasInViewport (element) {
    if (!element) { return; }

    const rect = element.getBoundingClientRect();

    return (
        rect.top <= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

function isInViewport (element) {
    if (!element) { return; }

    const rect = element.getBoundingClientRect();

    return (
        rect.top >= -1 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

export default {
    name: 'PageNavigation',
    data () {
        return {
            title: '',
            items: []
        };
    },
    methods: {
        update () {
            this.title = (document.querySelector('.layout-content > article > h1') || {}).textContent;
            this.items = [].map.call(document.querySelectorAll('.layout-content > article > h3'), (element) => ({
                title: element.textContent,
                element: element,
                active: false
            }));

            (this.items[0] || {}).active = true;
        },
        onScroll () {
            const firstVisibleIndex = findIndex(this.items, (item) => isInViewport(item.element));
            const lastVisibleIndex = findLastIndex(this.items, (item) => wasInViewport(item.element));

            this.items.forEach((item) => item.active = false);

            if (firstVisibleIndex === -1) {
                this.items[lastVisibleIndex].active = true;
            } else {
                this.items[firstVisibleIndex].active = true;
            }
        },
        scrollTo (element) {
            const clone = element.cloneNode();

            clone.style.position = 'absolute';
            clone.style.marginTop = '-50px';

            element.parentNode.insertBefore(clone, element);

            clone.scrollIntoView({
                block: 'start',
                behavior: 'smooth'
            });

            element.parentNode.removeChild(clone);
        }
    },
    mounted () {
        this.update();
        this.$nuxt.$on('viewLoaded', this.update);

        on(window, 'scroll', throttle(this.onScroll, 250));
    },
    destroyed () {
        off(window, 'scroll', throttle(this.onScroll, 250));
    }
};
