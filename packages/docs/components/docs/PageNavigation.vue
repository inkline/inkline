<template>
    <div class="page-navigation" :class="classes">
        <ol>
            <li v-show="items.length > 0">
                <span>{{ title }}</span>
                <ul>
                    <li v-for="(item, index) in items" :key="index">
                        <a :class="{ '-active': item.active }" @click="scrollTo(item.element)">{{ item.title }}</a>
                    </li>
                </ul>
            </li>
        </ol>
    </div>
</template>

<script>
import findIndex from 'lodash-es/findIndex';
import findLastIndex from 'lodash-es/findLastIndex';
import throttle from 'lodash-es/throttle';
import { on, off } from '@inkline/inkline/src/helpers';
import {
    ClassesProviderMixin,
    VariantPropertyMixin
} from '@inkline/inkline/src/mixins';

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
    mixins: [
        ClassesProviderMixin,
        VariantPropertyMixin
    ],
    data () {
        return {
            title: '',
            items: []
        };
    },
    methods: {
        update () {
            this.title = (document.querySelector('.layout-content > article > h1') || {}).textContent;
            this.items = [].map.call(document.querySelectorAll('.layout-content > article > .nuxt-content > h3, .layout-content > article > h3'), (element) => ({
                title: element.textContent,
                active: false,
                element
            }));

            (this.items[0] || {}).active = true;
        },
        onScroll () {
            const firstVisibleIndex = findIndex(this.items, (item) => isInViewport(item.element));
            const lastVisibleIndex = findLastIndex(this.items, (item) => wasInViewport(item.element));

            this.items.forEach((item) => {
                item.active = false;

                return item.active;
            });

            if (firstVisibleIndex === -1 && this.items[lastVisibleIndex]) {
                this.items[lastVisibleIndex].active = true;
            } else if (this.items[firstVisibleIndex]) {
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
</script>

<style lang="scss" scoped>
@import '~@inkline/inkline/src/css/config/index';

.page-navigation {
    display: block;
    padding-top: ($spacer * 2.5);
    text-align: right;

    ol {
        list-style: none;
        padding: 0;

        > li {
            > span {
                font-weight: bold;
                color: $text-muted;
                transition: color 0.3s ease;
            }

            + li {
                margin-top: $spacer;
            }
        }
    }

    ul {
        list-style: none;
        padding: 0;
        margin-top: ($spacer / 2);
        margin-right: ($spacer / 2);

        > li {
            margin: 0;
            position: relative;

            > a {
                display: block;
                padding-top: ($spacer / 3);
                padding-bottom: ($spacer / 3);
                padding-right: $spacer;
                color: $body-color;
                border-right: 1px solid $color-gray-20;
                transition: color 0.3s ease, font-weight 0.3s ease, border 0.3s ease;

                &:hover,
                &:focus {
                    text-decoration: underline;
                    cursor: pointer;
                }

                &.-active {
                    color: $link-color;
                    border-right: 1px solid $link-color;
                }
            }
        }
    }

    &.-dark {
        ol {
            > li {
                > span {
                    color: colors('white');
                }
            }
        }

        ul {
            > li {
                > a {
                    color: colors('gray-40');
                    border-right: 1px solid $border-color-dark;

                    &.-active {
                        color: $link-color;
                        border-right-color: $link-color;
                    }
                }
            }
        }
    }
}
</style>
