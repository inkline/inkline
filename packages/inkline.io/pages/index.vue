<template>
    <div id="index-page">
        <i-header id="header" :cover="false">
            <i-row>
                <i-column md="7" lg="6" xl="5">
                    <h1 class="header-title">Inkline</h1>
                    <h2 class="header-subtitle">
                        Inkline is a modern <strong>UI/UX Framework for Vue.js</strong> designed for creating flawless responsive web applications.
                    </h2>
                    <i-button size="lg" variant="primary" class="_margin-top-2" :to="{ name: 'docs-development-getting-started' }">Get Started</i-button>
                </i-column>
            </i-row>
        </i-header>
        <i-container>
            <i-row>
                <i-column>
                    <i-row>
                        <i-column xs="12">

                        </i-column>
                    </i-row>
                </i-column>
            </i-row>
        </i-container>
    </div>
</template>

<style lang="stylus">
@require '~@inkline/inkline/css/config/index'
@require '~@inkline/inkline/css/mixins/index'

#index-page
    background-image: url('~static/images/pages/index-header-large.jpg');
    background-repeat: no-repeat
    background-position: center 0
    background-size: 1560px 675px

    +-breakpoint(md)
        background-size: (1560px * 0.9) (675px * 0.9)

    +-breakpoint(lg)
        background-size: (1560px * 0.85) (675px * 0.85)

    +-breakpoint-down(sm)
        background-image: url('~static/images/pages/index-header-small.jpg');
        background-size: 768px 460px

    +-breakpoint(xs)
        background-size: (768px * 0.8) (460px* 0.8)

    #header
        background-color: transparent

        +-breakpoint-down(sm)
            text-align: center

        +-breakpoint(xs)
            padding-top: 22rem
            padding-bottom: 2rem

        +-breakpoint(sm)
            padding-top: 27rem
            padding-bottom: 4rem

        +-breakpoint(md)
            padding-top: 16rem
            padding-bottom: 6rem

        +-breakpoint-up(lg)
            padding-top: 12rem
            padding-bottom: 10rem

        .header-title
            +-breakpoint(xs)
                font-size: --d5-font-size

            +-breakpoint(sm)
                font-size: --d4-font-size

            +-breakpoint(md)
                font-size: --d3-font-size

            +-breakpoint(lg)
                font-size: --d2-font-size

            +-breakpoint(xl)
                font-size: --d1-font-size

        .header-subtitle
            color: --text-muted
            margin-top: 1rem
            margin-bottom: 0

            +-breakpoint-up(lg)
                font-size: --font-size-lg

            +-breakpoint-down(md)
                font-size: --font-size-md

        .button
            +-breakpoint-down(md)
                font-size: --font-size-md
                border-radius: --border-radius-md
                padding: (--spacer / 2) --spacer
</style>

<script>
import { IButton, IHeader } from '@inkline/inkline'

import View from '@components/View';
import SiteNavigation from '@components/SiteNavigation';

export default {
    name: 'IndexView',
    layout: 'Default',
    extends: View,
    head: {
        title: 'Vue.js UI/UX Framework'
    },
    components: {
        IButton,
        IHeader,
        SiteNavigation
    }
};
</script>
