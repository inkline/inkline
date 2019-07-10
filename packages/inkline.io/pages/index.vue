<template>
    <div id="index-page">
        <i-header id="header" :cover="false">
            <i-row>
                <i-column md="7" lg="6" xl="5">
                    <h1 class="header-title">Inkline</h1>
                    <h2 class="header-subtitle">
                        Inkline is a modern <strong>UI/UX Framework for Vue.js</strong> designed for creating flawless responsive web applications.
                    </h2>
                    <i-button size="lg" variant="primary" class="_margin-top-2" :to="{ name: 'docs-introduction-getting-started' }">Get Started</i-button>
                </i-column>
            </i-row>
        </i-header>

        <i-container fluid id="features">
            <i-container>
                <i-row>
                    <i-column md="6" lg="4">
                        <div class="feature-box">
                            <img src="/images/pages/icon-responsive.svg" alt="Inkline - Vue.js UI/UX Framework - Responsive" />
                            <h3>Responsive</h3>
                            <p>Designed to be mobile-first, Inkline looks great on phones, tablets, laptops and desktops.</p>
                        </div>
                    </i-column>
                    <i-column md="6" lg="4">
                        <div class="feature-box">
                            <img src="/images/pages/icon-modular.svg" alt="Inkline - Vue.js UI/UX Framework - Modular" />
                            <h3>Modular</h3>
                            <p>With over 50 components, Inkline is designed to give you the best development experience.</p>
                        </div>
                    </i-column>
                    <i-column md="6" lg="4">
                        <div class="feature-box">
                            <img src="/images/pages/icon-modern.svg" alt="Inkline - Vue.js UI/UX Framework - Modern" />
                            <h3>Modern</h3>
                            <p>Inkline is a versatile and modern framework, written using the best Vue.js practices.</p>
                        </div>
                    </i-column>
                    <i-column md="6" offset-lg="2" lg="4">
                        <div class="feature-box">
                            <img src="/images/pages/icon-form-validation.svg" alt="Inkline - Vue.js UI/UX Framework - Form Validation" />
                            <h3>Form Validation</h3>
                            <p>Define a form validation schema and let Inkline elegantly take care of the form validation work.</p>
                        </div>
                    </i-column>
                    <i-column md="12" lg="4">
                        <div class="feature-box">
                            <img src="/images/pages/icon-customization.svg" alt="Inkline - Vue.js UI/UX Framework - Customization" />
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
                        <i-button variant="primary" href="https://www.patreon.com/bePatron?u=18449490" target="_blank" rel="nofollow">Become a sponsor</i-button>
                    </i-column>
                </i-row>
            </i-container>
        </i-container>

        <i-container fluid id="footer">
            <i-container>
                <footer>
                    <img src="~static/images/logo-light-80.png" alt="Inkline - Vue.js UI/UX Framework" height="60">

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
                            <a href="https://discord.gg/2w5UGnK" target="_blank" rel="nofollow">
                                <font-awesome-icon size="lg" :icon="['fab', 'discord']"></font-awesome-icon>
                            </a>
                        </li>
                    </ul>

                    <p id="footer-license">
                        Designed and built with
                        <font-awesome-icon icon="heart" size="sm" />
                        by
                        <a href="https://twitter.com/alexgrozav" target="_blank">@alexgrozav</a>.
                    </p>
                    <p id="footer-copyright">
                        Copyright &copy; 2017-2019, Inkline
                    </p>

                    <ul id="footer-policies" class="list -inline">
                        <!--<li><a href="">Privacy Policy</a></li>-->
                        <!--<li>&middot;</li>-->
                        <!--<li><a href="">Cookie Policy</a></li>-->
                        <!--<li>&middot;</li>-->
                        <li><a href="https://github.com/inkline/inkline/blob/master/LICENSE" target="_blank" rel="nofollow">MIT License</a></li>
                    </ul>
                </footer>
            </i-container>
        </i-container>
    </div>
</template>

<style lang="scss">
    @import '~@inkline/inkline/css/config/index';
    @import '~@inkline/inkline/css/mixins/index';

    #index-page {
        background-image: url('~static/images/pages/index-header-large.jpg');
        background-repeat: no-repeat;
        background-position: center 0;
        background-size: 1560px 675px;

        @include -breakpoint(md) {
            background-size: (1560px * 0.9) (675px * 0.9);
        }
        @include -breakpoint(lg) {
            background-size: (1560px * 0.85) (675px * 0.85);
        }
        @include -breakpoint-down(sm) {
            background-image: url('~static/images/pages/index-header-small.jpg');
            background-size: 768px 460px;
        }
        @include -breakpoint(xs) {
            background-size: (768px * 0.8) (460px* 0.8);
        }

        #header {
            background-color: transparent;

            @include -breakpoint-down(sm) {
                text-align: center;
            }
            @include -breakpoint(xs) {
                padding-top: 22rem;
                padding-bottom: 2rem;
            }
            @include -breakpoint(sm) {
                padding-top: 27rem;
                padding-bottom: 4rem;
            }
            @include -breakpoint(md) {
                padding-top: 16rem;
                padding-bottom: 6rem;
            }
            @include -breakpoint-up(lg) {
                padding-top: 12rem;
                padding-bottom: 10rem;
            }

            .header-title {
                @include -breakpoint(xs) {
                    font-size: $d5-font-size
                }
                @include -breakpoint(sm) {
                    font-size: $d4-font-size;
                }
                @include -breakpoint(md) {
                    font-size: $d3-font-size;
                }
                @include -breakpoint(lg) {
                    font-size: $d2-font-size;
                }
                @include -breakpoint(xl) {
                    font-size: $d1-font-size;
                }
            }

            .header-subtitle {
                color: $text-muted;
                margin-top: 1rem;
                margin-bottom: 0;
                line-height: 1.5;

                @include -breakpoint-up(lg) {
                    font-size: font-size('lg');
                }
                @include -breakpoint-down(md) {
                    font-size: font-size('md');
                }

                .button {
                    @include -breakpoint-down(md) {
                        font-size: font-size('md');
                        border-radius: border-radius('md');
                        padding: ($spacer / 2) $spacer;
                    }
                }
            }
        }
    }

    #features {
        margin-bottom: -1px;
        padding: ($spacer * 3) 0 ($spacer * 6);
        background-image: url('../static/images/pages/index-features.svg');
        background-position: center bottom;
        background-repeat: no-repeat;
        background-size: 100% auto;

        @include -breakpoint-up(lg) {
            .column {
                &:nth-child(4),
                &:nth-child(5) {
                    margin-top: 2rem
                }
            }
        }
    }

    .feature-box {
        text-align: center;
        padding: $spacer 0;

        h3 {
            margin-top: $spacer * 1.5;
        }

        p {
            color: $text-muted;
        }

        img {
            height: 60px;
            width: auto;
        }
    }

    #sponsors {
        padding: ($spacer * 4) 0 ($spacer * 6);
        background-color: colors('gray-20');
        text-align: center;
        z-index: 1;
    }

    #footer {
        background-image: url('../static/images/pages/index-footer.svg');
        background-color: colors('gray-80');
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: center -1px;
        color: colors('gray-20');
        padding: ($spacer * 6) 0 ($spacer * 4);
        text-align: center;
        position: relative;

        a {
            color $text-muted;
        }

        img {
            margin-bottom: $spacer;
        }

        .list {
            margin-top: $spacer;
        }

        .footer-icon svg {
            color: colors('gray-20');
            transition: color 0.3s ease;

            &:hover {
                color: colors('white');
            }
        }

        #footer-license {
            a {
                color: colors('white');
            }
        }

        #footer-copyright,
        #footer-policies {
            font-size: font-size('sm');
            color: $text-muted;
        }
    }
</style>

<script>
import { head } from '@helpers/head'

export default {
    name: 'IndexView',
    layout: 'Default',
    head: head({
        title: 'Vue.js UI/UX Framework',
        description: 'Inkline is a modern UI/UX framework for Vue.js, designed for creating flawless content-rich responsive web applications with a focus on user experience.',
        preserve: {
            description: true
        }
    })
};
</script>
