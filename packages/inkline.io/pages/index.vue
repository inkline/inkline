<template>
    <div id="index-page">
        <i-header id="header" :cover="false">
            <i-row>
                <i-column md="7" lg="6" xl="5">
                    <h1 class="header-title">Inkline</h1>
                    <p class="header-subtitle">
                        Inkline is a modern <strong>UI/UX Framework for Vue.js</strong> designed for creating flawless responsive web applications.
                    </p>
                    <i-button size="lg" variant="primary" class="_margin-top-2" :to="{ name: 'docs-introduction-getting-started' }">Get Started</i-button>
                </i-column>
            </i-row>
        </i-header>

        <i-container fluid id="features">
            <i-container>
                <i-row>
                    <i-column md="6" lg="4">
                        <div class="feature-box">
                            <img src="/images/pages/icon-responsive.svg" alt="Modern" />
                            <h3>Responsive</h3>
                            <p>Designed to be mobile-first, Inkline looks great on phones, tablets, laptops and desktops.</p>
                        </div>
                    </i-column>
                    <i-column md="6" lg="4">
                        <div class="feature-box">
                            <img src="/images/pages/icon-modular.svg" alt="Modern" />
                            <h3>Modular</h3>
                            <p>With over 50 components, Inkline is designed to give you the best development experience.</p>
                        </div>
                    </i-column>
                    <i-column md="6" lg="4">
                        <div class="feature-box">
                            <img src="/images/pages/icon-modern.svg" alt="Modern" />
                            <h3>Modern</h3>
                            <p>Inkline is a versatile and modern framework, written using the best Vue.js practices.</p>
                        </div>
                    </i-column>
                    <i-column md="6" offset-lg="2" lg="4">
                        <div class="feature-box">
                            <img src="/images/pages/icon-form-validation.svg" alt="Form Validation" />
                            <h3>Form Validation</h3>
                            <p>Define a form validation schema and let Inkline take care of form validation.</p>
                        </div>
                    </i-column>
                    <i-column md="12" lg="4">
                        <div class="feature-box">
                            <img src="/images/pages/icon-customization.svg" alt="Customization" />
                            <h3>Customizable</h3>
                            <p>Disover hundreds of easily accessible Vue.js and Stylus customization options.</p>
                        </div>
                    </i-column>
                </i-row>
            </i-container>
        </i-container>

        <i-container fluid id="sponsors">
            <i-container>
                <i-row>
                    <i-column>
                        <h3>Patreon Sponsors</h3>
                        <p class="_text-muted">Become the first sponsor of Inkline and get awesome benefits.</p>
                    </i-column>
                </i-row>
                <i-row class="_margin-top-1">
                    <i-column>
                        <i-button variant="primary" href="https://www.patreon.com/bePatron?u=18449490" target="_blank">Become a sponsor</i-button>
                    </i-column>
                </i-row>
            </i-container>
        </i-container>

        <i-container fluid id="footer">
            <i-container>
                <footer>
                    <img src="~static/images/logo-light-80.png" alt="Inkline" height="60">
                    <ul class="list -inline">
                        <li class="footer-icon">
                            <a href="https://github.com/inkline/inkline" target="_blank">
                                <font-awesome-icon size="lg" :icon="['fab', 'github']"></font-awesome-icon>
                            </a>
                        </li>
                        <li class="footer-icon">
                            <a href="https://twitter.com/inklineUX" target="_blank">
                                <font-awesome-icon size="lg" :icon="['fab', 'twitter']"></font-awesome-icon>
                            </a>
                        </li>
                        <li class="footer-icon">
                            <a href="https://discord.gg/2w5UGnK" target="_blank">
                                <font-awesome-icon size="lg" :icon="['fab', 'discord']"></font-awesome-icon>
                            </a>
                        </li>
                    </ul>

                    <p id="footer-license">
                        Released under the  <a href="https://github.com/inkline/inkline/blob/master/LICENSE">MIT License</a>
                    </p>
                    <p id="footer-copyright">
                        Copyright &copy; 2017-2019, Alex GROZAV
                    </p>

                    <ul id="footer-policies" class="list -inline">
                        <li><a href="">Privacy Policy</a></li>
                        <li>&middot;</li>
                        <li><a href="">Cookie Policy</a></li>
                    </ul>
                </footer>
            </i-container>
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

#features
    padding: (--spacer * 3) 0 (--spacer * 6)
    background-image: url('../static/images/pages/index-features.svg')
    background-position: center bottom
    background-repeat: no-repeat

    +-breakpoint-up(lg)
        .column
            &:nth-child(4),
            &:nth-child(5)
                margin-top: 2rem

.feature-box
    text-align: center
    padding: --spacer 0

    h3
        margin-top: --spacer * 1.5

    p
        color: --text-muted

    img
        height: 60px
        width: auto

#sponsors
    padding: (--spacer * 4) 0
    background-color: --colors['gray-20']
    text-align: center

#footer
    padding: (--spacer * 4) 0
    background-color: --colors['gray-80']
    text-align: center
    color: --colors['gray-20']

    a
        color --text-muted

    .list
        margin-top: --spacer

    .footer-icon svg
        color: --colors['gray-20']
        transition: color 0.3s ease

        &:hover
            color: --colors['white']

    #footer-license
        a
            color: --colors['white']

    #footer-copyright,
    #footer-policies
        font-size: --font-size-sm
        color: --text-muted
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
