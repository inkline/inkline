<template>
    <div class="site-navigation" :class="classes">
        <slot name="header" />
        <ol>
            <li v-for="(category, categoryIndex) in sidebar.items" :key="categoryIndex">
                <span>{{ category.title }}</span>
                <ul>
                    <li v-for="(page, pageIndex) in category.children" :key="pageIndex">
                        <i-collapsible
                            v-if="page.children"
                            v-model="menu[page.id]"
                            :class="{ '-active': subroutes[page.id] }">
                            <i-collapsible-item :id="page.id" :title="page.title">
                                <ul>
                                    <li v-for="(subPage, subPageIndex) in page.children" :key="subPageIndex">
                                        <nuxt-link :to="subPage.path">
                                            {{ subPage.title || pages.byId[subPage.path].title }}
                                        </nuxt-link>
                                    </li>
                                </ul>
                            </i-collapsible-item>
                        </i-collapsible>
                        <nuxt-link v-else :to="page.path">
                            {{ page.title || pages.byId[page.path].title }}
                        </nuxt-link>
                    </li>
                </ul>
            </li>
        </ol>
    </div>
</template>

<script>
import {
    ClassesProviderMixin,
    VariantPropertyMixin
} from '@inkline/inkline/src/mixins';
import { mapGetters } from 'vuex';

export default {
    name: 'Sidebar',
    mixins: [
        ClassesProviderMixin,
        VariantPropertyMixin
    ],
    data() {
        return {
            menu: {
                'docs-components-datatable': [],
                'docs-forms-validation': []
            }
        };
    },
    computed: {
        ...mapGetters([
            'sidebar',
            'pages'
        ]),
        subroutes() {
            const routeParts = this.$nuxt.$route.name.split('-');
            return routeParts
                .reduce((acc, part, index) => {
                    acc[routeParts.slice(0, index + 1).join('-')] = true;
                    return acc;
                }, {});
        }
    },
    mounted() {
        Object.keys(this.menu).forEach((routeName) => {
            this.menu[routeName] = this.subroutes[routeName] ? [routeName] : [];
        });
    }
};
</script>

<style lang="scss" scoped>
@import '~@inkline/inkline/src/css/config/index';

$site-navigation-border-left-color: $color-gray-20 !default;
$site-navigation-border-left-color-active: $color-primary !default;

.site-navigation {
    position: relative;
    display: block;
    padding-top: ($spacer * 2.5);

    ol {
        list-style: none;
        padding: 0;

        > li {
            > span {
                font-weight: bold;
                color: $color-gray-80;
                transition: color $transition-duration $transition-easing;
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
        margin-left: ($spacer / 2);

        > li {
            margin: 0;
            position: relative;

            ::v-deep .collapsible > .item > .body {
                background-color: transparent;
            }

            ::v-deep .collapsible > .item > a,
            > a {
                display: block;
                padding-top: ($spacer / 3);
                padding-bottom: ($spacer / 3);
                padding-left: $spacer;
                color: $body-color;
                background-color: transparent !important;
                border-left: 1px solid $site-navigation-border-left-color !important;
                transition: color $transition-duration $transition-easing, border-color $transition-duration $transition-easing;

                &::before {
                    opacity: 1;
                    transition: opacity $transition-duration $transition-easing, transform $transition-duration $transition-easing;
                    content: '';
                    display: block;
                    height: 100%;
                    width: 3px;
                    background: $link-color;
                    position: absolute;
                    left: -1px;
                    top: 0;
                    transform: scaleX(0);
                }

                &.-active,
                &.nuxt-link-active {
                    color: $link-color;
                    font-weight: $font-weight-semibold;

                    &::before {
                        opacity: 1;
                        transform: scaleX(1);
                    }
                }
            }

            ul {
                margin-top: 0;
                margin-left: 0;

                > li {
                    > a {
                        font-size: 90%;
                        padding-left: $spacer * 2;
                        transition: color $transition-duration $transition-easing;
                    }
                }
            }
        }
    }

    ::v-deep .collapsible {
        border: 0;

        &.-active {
            > .item {
                > .header {
                    border-left-color: $site-navigation-border-left-color;
                    color: $color-primary;
                    font-weight: $font-weight-semibold;
                    background-color: transparent !important;

                    &::before {
                        opacity: 1;
                        transform: scaleX(1);
                    }
                }

                &.-active > .header {
                    font-weight: $font-weight-normal;
                    border-left-color: $site-navigation-border-left-color-active;

                    &::before {
                        opacity: 0;
                        transform: scaleX(0);
                    }
                }

                .body {
                    > .content {
                        ul li a {
                            border-left-color: $site-navigation-border-left-color-active;
                            transition: color $transition-duration $transition-easing;
                        }
                    }
                }
            }
        }

        > .item {
            > .header {
                background: transparent;
                display: flex;
                justify-content: flex-start;
                outline: none;

                .icon {
                    font-size: 75%;
                    margin-left: spacers('1/2');
                    color: $color-gray-40;
                    transition: color $transition-duration $transition-easing, transform $transition-duration $transition-easing;
                }
            }

            .body > .content {
                padding: 0;
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
                ::v-deep .collapsible > .item > a,
                > a {
                    color: colors('gray-40');
                    border-left: 1px solid colors('gray-70') !important;

                    &::before {
                        background: $link-color;
                    }

                    &.-active,
                    &.nuxt-link-active {
                        color: $link-color;
                    }
                }
            }
        }

        ::v-deep .collapsible {
            &.-active {
                > .item {
                    > .header {
                        border-left-color: $border-color-dark;
                        color: $color-primary;
                    }

                    &.-active > .header {
                        border-left-color: $site-navigation-border-left-color-active;
                    }

                    .body > .content {
                        ul li a {
                            border-left-color: $site-navigation-border-left-color-active;
                        }
                    }
                }
            }

            > .item {
                > .header {
                    .icon {
                        color: $color-gray-60;
                    }
                }
            }
        }
    }
}
</style>
