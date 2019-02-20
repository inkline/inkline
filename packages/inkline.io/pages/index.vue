<template>
    <div id="index-page">
        <i-header id="header" :cover="false">
            <i-row>
                <i-column sm="6" lg="5" xl="4">
                    <h1 class="d1">Inkline</h1>
                    <h2 class="h5 _text-muted">
                        Inkline is a modern <strong>UI/UX Framework for Vue.js</strong> designed for creating flawless content-rich responsive web applications.
                    </h2>
                    <i-button size="lg" variant="primary" class="_margin-top-2">Get Started</i-button>
                </i-column>
            </i-row>
        </i-header>
        <i-container>
            <i-row>
                <i-column>
                    <i-row>
                        <i-column xs="12">
                            <site-navigation></site-navigation>
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
    background-image: url('~static/images/pages/index-header.jpg');
    background-repeat: no-repeat
    background-position: center 0

    +-breakpoint-up(xs)
        background-size: (1560px * 0.5) (675px * 0.5)

    +-breakpoint-up(sm)
        background-size: (1560px * 0.66) (675px * 0.66)

    +-breakpoint-up(md)
        background-size: (1560px * 0.75) (675px * 0.75)

    +-breakpoint-up(lg)
        background-size: 1560px 675px

#header
    background-color: transparent

    h1
        +-breakpoint(xs)
            font-size: --d4-font-size

        +-breakpoint(sm)
            font-size: --d3-font-size

        +-breakpoint(md)
            font-size: --d2-font-size

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
