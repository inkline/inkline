<template>
    <div id="documentation-layout">
        <navbar ref="navbar" class="-docs" @toggle="toggleSidebarOpen" />
        <i-container>
            <i-row>
                <i-column>
                    <i-layout ref="layout" vertical>
                        <transition name="fade-in-transition">
                            <i-layout-aside v-show="sidebarOpen || !collapsible" id="layout-aside-left">
                                <div v-match-parent-width class="layout-fixed-full-height">
                                    <site-search class="_visible-sm-and-down" />
                                    <sidebar>
                                        <i-button id="toggle-dark-mode-sidebar" slot="header" size="sm" @click="toggleDarkMode">
                                            <i-icon :icon="variantIcon" size="lg" />
                                        </i-button>
                                    </sidebar>
                                </div>
                            </i-layout-aside>
                        </transition>

                        <i-layout-content>
                            <nuxt />
                            <footer-navigation />
                        </i-layout-content>

                        <i-layout-aside id="layout-aside-right">
                            <div v-match-parent-width class="layout-fixed-full-height">
                                <page-navigation />
                            </div>
                        </i-layout-aside>
                    </i-layout>
                </i-column>
            </i-row>
        </i-container>
    </div>
</template>

<style lang="scss">
@import '~@inkline/inkline/src/css/config/index';
@import '~@inkline/inkline/src/css/mixins/index';
@import '../assets/config/index';

#documentation-layout > .container > .row > .column > .layout > .layout-content {
    margin: $navbar-height auto $spacer;
}

#toggle-dark-mode-sidebar {
    position: absolute;
    top: 0.75rem;
    right: 0;

    @include breakpoint-up('md') {
        display: none;
    }
}

#documentation-layout {
    #layout-aside-left,
    #layout-aside-right {
        width: 20rem;
        flex: 1 1 auto;
        box-sizing: border-box;
    }

    #layout-aside-left {
        min-width: $spacer * 13;

        .layout-aside-children {
            padding-right: ($spacer * 2);

            .layout-fixed-full-height {
                width: 100%;
            }
        }

        @include breakpoint-down(sm) {
            position: fixed;
            width: 100%;
            padding: 0;
            top: $navbar-height;
            left: 0;
            z-index: 1029;
            background-color: rgba(0, 0, 0, 0.25);

            &.fade-in-transition-enter,
            &.fade-in-transition-leave-to {
                .layout-aside-children {
                    transform: translateX(-100%);
                }
            }

            &.fade-in-transition-enter-to,
            &.fade-in-transition-leave {
                .layout-aside-children {
                    transform: translateX(0);
                }
            }

            .layout-aside-children {
                width: 16rem;
                max-width: 100%;
                background-color: #ffffff;
                border-right: 1px solid colors('gray-30');
                box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
                padding: 0;
                transition: transform 0.3s ease;
                transform: translateX(0);
            }

            .layout-fixed-full-height {
                position: relative;
                display: block;
                top: auto;
                padding: 0 $spacer;

                .site-navigation {
                    padding: $spacer 0 0;
                }
            }
        }
    }

    #layout-aside-right {
        .layout-aside-children {
            padding-left: ($spacer * 2);
        }

        @include breakpoint-down(md) {
            display: none;
        }
    }

    .layout-content {
        max-width: 48rem;

        @include breakpoint-down(md) {
            max-width: none;
        }
    }
}

.inkline.-dark {
    #documentation-layout {
        #layout-aside-left {
            @include breakpoint-down(sm) {
                .layout-aside-children {
                    background-color: $color-gray-90;
                    border-right-color: $color-gray-80;
                }
            }
        }
    }
}
</style>

<script>
import Vue from 'vue';
import Sidebar from '~/components/Sidebar';
import Navbar from '~/components/Navbar';
import Layout from '~/components/layout/Layout';
import SiteSearch from '~/components/SiteSearch';
import PageNavigation from '~/components/docs/PageNavigation';
import FooterNavigation from '~/components/docs/FooterNavigation';
import MatchParentWidth from '~/directives/match-parent-width';
import {
    getStyleProperty,
    off,
    on
} from '@inkline/inkline/src/helpers';
import { breakpoints } from '@inkline/inkline/src/constants';

export default {
    name: 'Documentation',
    extends: Layout,
    components: {
        Navbar,
        Sidebar,
        SiteSearch,
        PageNavigation,
        FooterNavigation
    },
    directives: {
        MatchParentWidth
    },
    data() {
        return {
            sidebarOpen: false,
            collapsible: false,
            collapse: 'sm',
            windowWidth: typeof window !== 'undefined' ? window.innerWidth : 0
        };
    },
    computed: {
        variantIcon() {
            return this.$inkline.config.variant || 'light';
        }
    },
    methods: {
        toggleDarkMode() {
            this.$inkline.config.variant = this.$inkline.config.variant === 'light' ? 'dark' : 'light';
        },
        highlight() {
            document.querySelectorAll('pre.line-numbers').forEach((pre) => {
                const code = pre.querySelector('code');
                const linesCount = code.innerHTML.split('\n').length - 1;

                const span = (code.querySelector('span') || code).cloneNode(true);
                span.style.display = 'block';
                span.style.visibility = 'hidden';
                span.style.position = 'absolute';
                document.body.appendChild(span);
                const height = parseFloat(getStyleProperty(span, 'lineHeight')) - 3;
                document.body.removeChild(span);

                for (let i = 1; i <= linesCount; i++) {
                    const line = document.createElement('div');

                    line.className = 'line-number';
                    line.style.top = (i - 1) * height + 'px';
                    line.setAttribute('data-line-number', i.toString());

                    pre.appendChild(line);
                }
            });
        },
        onLayoutClick(e) {
            if (e.target.id === 'layout-aside-left') {
                this.setSidebarOpen(false);
            }
        },
        toggleSidebarOpen() {
            this.setSidebarOpen(!this.sidebarOpen);
        },
        setSidebarOpen(value) {
            this.sidebarOpen = value;

            // eslint-disable-next-line no-useless-call
            this.$refs.navbar.$emit.apply(this.$refs.navbar, ['sidebarToggle', value]);
        },
        onWindowResize() {
            if (!this.collapse) { return; }

            const windowWidth = window.innerWidth;

            if (this.windowWidth <= breakpoints[this.collapse][1] && windowWidth > breakpoints[this.collapse][1]) {
                this.setSidebarOpen(false);
            }

            this.collapsible = windowWidth <= breakpoints[this.collapse][1];
            this.windowWidth = windowWidth;
        }
    },
    watch: {
        $route() {
            if (this.collapsible && this.sidebarOpen) {
                this.setSidebarOpen(false);
            }
        }
    },
    mounted() {
        on(this.$refs.layout.$el, 'click', this.onLayoutClick);

        this.highlight();
        this.$nuxt.$on('viewLoaded', this.highlight);

        if (!Vue.$isServer && typeof window !== 'undefined') {
            window.addEventListener('resize', this.onWindowResize);
            this.onWindowResize();
        }
    },
    beforeDestroy() {
        off(this.$refs.layout.$el, 'click', this.onLayoutClick);

        if (!Vue.$isServer && typeof window !== 'undefined') {
            window.removeEventListener('resize', this.onWindowResize);
        }
    }
};
</script>
