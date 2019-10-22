import Vue from 'vue'
import Layout from '@components/Layout'
import SiteSearch from '@components/SiteSearch'
import SiteNavigation from '@components/docs/SiteNavigation'
import PageNavigation from '@components/docs/PageNavigation'
import MatchParentWidth from '@directives/match-parent-width'
import { getStyleProperty, off, on, dispatch } from '@inkline/inkline/helpers'
import { breakpoints } from '@inkline/inkline/constants'

export default {
    name: 'Documentation',
    extends: Layout,
    components: {
        SiteSearch,
        SiteNavigation,
        PageNavigation
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
                this.setSidebarOpen(false);
            }
        },
        toggleSidebarOpen() {
            this.setSidebarOpen(!this.sidebarOpen);
        },
        setSidebarOpen(value) {
            this.sidebarOpen = value;

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
