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
                            <p>Disover hundreds of easily accessible Vue.js and Sass customization options.</p>
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

<style lang="scss" src="./index.scss"></style>

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
