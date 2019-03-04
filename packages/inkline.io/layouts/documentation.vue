<template>
<div id="documentation-layout">
    <navbar />
    <i-container>
        <i-row>
            <i-column>
                <i-layout vertical>
                    <i-layout-aside id="layout-aside-left">
                        <div class="layout-fixed-full-height">
                            <site-navigation></site-navigation>
                        </div>
                    </i-layout-aside>

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

<script>
import Layout from '@components/Layout';
import Navbar from '@components/Navbar';
import SiteNavigation from '@components/SiteNavigation';
import PageNavigation from '@components/PageNavigation';
import MatchParentWidth from '@directives/match-parent-width';
import { getStyleProperty } from '@inkline/inkline/helpers'

export default {
    name: 'Documentation',
    extends: Layout,
    head: {
        titleTemplate: '%s - Inkline'
    },
    components: {
        Navbar,
        SiteNavigation,
        PageNavigation
    },
    directives: {
        MatchParentWidth
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
        }
    },
    mounted() {
        this.highlight();
        this.$nuxt.$on('viewLoaded', this.highlight);
    }
};
</script>
