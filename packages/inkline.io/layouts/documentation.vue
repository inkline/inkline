<template>
<div id="documentation-layout">
    <navbar class="-docs" @toggle="collapsed = !collapsed" />
    <i-container>
        <i-row>
            <i-column>
                <i-layout vertical ref="layout">
                    <transition name="fade-in-transition">
                        <i-layout-aside id="layout-aside-left" v-show="collapsed || !collapsible">
                            <div class="layout-fixed-full-height" v-match-parent-width>
                                <site-search class="_visible-sm-and-down"></site-search>
                                <site-navigation></site-navigation>
                            </div>
                        </i-layout-aside>
                    </transition>

                    <i-layout-content>
                        <nuxt />
                    </i-layout-content>

                    <i-layout-aside id="layout-aside-right">
                        <div class="layout-fixed-full-height" v-match-parent-width>
                            <page-navigation></page-navigation>
                        </div>
                    </i-layout-aside>
                </i-layout>
            </i-column>
        </i-row>
    </i-container>
</div>
</template>

<style lang="scss">
    @import '~@inkline/inkline/css/config/index';
    @import '~@inkline/inkline/css/mixins/index';

    #documentation-layout > .container > .row > .column > .layout > .layout-content {
        margin: 62px auto $spacer;
    }

    #documentation-layout {
        #layout-aside-left,
        #layout-aside-right {
            width: 20rem;
            flex: 1 1 auto;
            box-sizing: border-box;
        }

        #layout-aside-left {
            .layout-aside-children {
                padding-right: ($spacer * 2);
            }

            @include breakpoint-down(sm) {
                position: fixed;
                width: 100%;
                padding: 0;
                top: 62px;
                left: 0;
                z-index: 1029;
                background-color: rgba(0, 0, 0, 0.25);

                &.fade-in-transition-enter
                &.fade-in-transition-leave-to {
                    .layout-aside-children {
                        transform: translateX(-100%);
                    }
                }

                &.fade-in-transition-enter-to
                &.fade-in-transition-leave {
                    .layout-aside-children {
                        transform: translateX(0);
                    }
                }

                .layout-aside-children {
                    width: 16rem;
                    max-width: 100%;
                    background-color: #ffffff;
                    border-right: 1px solid colors('neutral', 'gray-30');
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
                max-width: auto;
            }

            h2.lead {
                line-height: 30px;
                margin-top: 1.25rem;
                margin-bottom: 1.25rem;
            }
        }
    }
</style>

<script>
import Vue from 'vue'
import Layout from '@components/Layout'
import Navbar from '@components/Navbar'
import SiteSearch from '@components/SiteSearch'
import SiteNavigation from '@components/SiteNavigation'
import PageNavigation from '@components/PageNavigation'
import MatchParentWidth from '@directives/match-parent-width'
import { getStyleProperty, off, on } from '@inkline/inkline/helpers'
import { breakpoints } from '@inkline/inkline/constants'

export default {
    name: 'Documentation',
    extends: Layout,
    components: {
        Navbar,
        SiteSearch,
        SiteNavigation,
        PageNavigation
    },
    directives: {
        MatchParentWidth
    },
    data() {
        return {
            collapsed: false,
            collapsible: false,
            collapse: 'sm',
            windowWidth: typeof window !== 'undefined' ? window.innerWidth : 0
        }
    },
    methods: {
        highlight() {
            document.querySelectorAll('pre.line-numbers').forEach((pre) => {
                const code = pre.querySelector('code.line-numbers');
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
                this.collapsed = false;
            }
        },
        onWindowResize() {
            if (!this.collapse) { return; }

            const windowWidth = window.innerWidth;

            if (this.windowWidth <= breakpoints[this.collapse][1] && windowWidth > breakpoints[this.collapse][1]) {
                this.collapsed = false;
            }

            this.collapsible = windowWidth <= breakpoints[this.collapse][1];
            this.windowWidth = windowWidth;
        }
    },
    watch: {
        $route() {
            if (this.collapsible && this.collapsed) {
                this.collapsed = false;
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
