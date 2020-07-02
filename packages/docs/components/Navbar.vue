<template>
    <i-navbar id="navbar" :collapse="false">
        <i-navbar-brand :to="{ name: 'index' }">
            <img class="logo -dark" src="/images/logo-80.png" height="26" alt="Inkline - Vue.js UI/UX Library">
            <img class="logo -light" src="/images/logo-light-80.png" height="26" alt="Inkline - Vue.js UI/UX Library">
            Inkline
        </i-navbar-brand>

        <i-navbar-items class="_justify-content-end">
            <i-nav>
                <site-search />
                <i-nav-item id="navbar-nav-home" :to="{ name: 'index' }">
                    Home
                </i-nav-item>
                <i-nav-item id="navbar-nav-docs" :to="{ name: 'docs-introduction-getting-started' }">
                    <span class="_visible-lg-and-up">Documentation</span>
                    <span class="_visible-md-and-down">Docs</span>
                </i-nav-item>
                <i-nav-item id="toggle-dark-mode-navbar" @click="toggleDarkMode">
                    <i-icon :icon="variantIcon" size="lg" />
                </i-nav-item>
                <i-nav-item href="https://github.com/inkline/inkline" target="_blank">
                    <font-awesome-icon :icon="['fab', 'github']" size="lg" />
                </i-nav-item>
                <i-hamburger-menu
                    class="sidebar-toggle"
                    :active="sidebarOpen"
                    @click="toggleSidebar" />
            </i-nav>
        </i-navbar-items>
    </i-navbar>
</template>

<script>
import SiteSearch from '~/components/SiteSearch';

export default {
    name: 'Navbar',
    components: {
        SiteSearch
    },
    data() {
        return {
            sidebarOpen: false
        };
    },
    computed: {
        variantIcon() {
            return this.$inkline.config.variant || 'light';
        }
    },
    methods: {
        toggleSidebar() {
            this.$emit('toggle');
        },
        toggleDarkMode() {
            this.$inkline.config.variant = this.$inkline.config.variant === 'light' ? 'dark' : 'light';
        }
    },
    mounted() {
        this.$on('sidebarToggle', (value) => {
            this.sidebarOpen = value;
        });
    }
};
</script>

<style lang="scss">
@import '~@inkline/inkline/src/css/config/index';
@import '~@inkline/inkline/src/css/mixins/index';

.navbar#navbar {
    top: 0;
    left: 0;
    width: 100%;
    position: fixed;
    z-index: 2000;
    transition: background 0.3s ease;

    .site-search {
        @include breakpoint-down('sm') {
            display: none;
        }
    }

    > .container > .row > .column {
        > .brand {
            margin-right: ($spacer / 2);
            letter-spacing: 0.6px;

            .logo {
                &.-light {
                    display: none;
                }
            }

            img {
                margin-right: ($spacer / 2);
            }
        }

        > .navbar-items > .nav {
            margin-right: -9px;

            @include breakpoint-down('sm') {
                margin-right: 0;
            }

            > .item {
                border-radius: border-radius('md');
                letter-spacing: 0.6px;
                display: inline-flex;

                &:hover {
                    background: rgba(0, 0, 0, 0.1);
                }

                &.-active {
                    letter-spacing: 0;
                }

                i {
                    line-height: inherit;
                }
            }

            @include breakpoint-down('sm') {
                > .item,
                > .hamburger {
                    width: 45px;
                    height: 45px;
                    padding: 0;
                    justify-content: center;
                    align-items: center;
                }

                #navbar-nav-home,
                #navbar-nav-docs {
                    padding-left: 0.75rem;
                    padding-right: 0.75rem;
                    width: auto;
                }
            }

            @include breakpoint-down('xs') {
                #navbar-nav-home,
                #navbar-nav-docs {
                    padding-left: 0.5rem;
                    padding-right: 0.5rem;
                    width: auto;
                }
            }
        }
    }

    &.-transparent {
        background: rgba(#e9ecef, 0.25);

        .site-search {
            .form-input {
                .form-input-prefix {
                    transition: color 0.3s ease, border-color 0.3s ease;
                    color: rgba(255, 255, 255, 0.85);
                    border-right-color: rgba(255, 255, 255, 0.25);
                }

                input {
                    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
                    color: #ffffff;
                    background-color: rgba(255, 255, 255, 0.15);
                    border-color: rgba(255, 255, 255, 0.15);

                    &::placeholder {
                        color: rgba(255, 255, 255, 0.85);
                        transition: color 0.3s ease;
                    }
                }
            }
        }

        > .container > .row > .column {
            > .navbar-items > .nav > .item {
                color: rgba(255, 255, 255, 0.85);

                &:hover {
                    color: rgba(255, 255, 255, 1);
                }
            }

            > .brand {
                @include breakpoint-down('md') {
                    color: colors('light');

                    .logo {
                        &.-light {
                            display: inline-block;
                        }

                        &.-dark {
                            display: none;
                        }
                    }
                }

                @include breakpoint-up(lg) {
                    color: colors('dark');

                    .logo {
                        &.-light {
                            display: none;
                        }

                        &.-dark {
                            display: inline-block;
                        }
                    }
                }
            }
        }

        .hamburger {
            > .bars::before,
            > .bars,
            > .bars::after {
                background-color: colors('light');
            }
        }
    }

    .hamburger.sidebar-toggle {
        display: none;
    }

    &.-docs {
        .hamburger.sidebar-toggle {
            display: inline-flex;

            @include breakpoint-up('md') {
                display: none;
            }
        }
    }
}

#navbar-nav-home {
    @media screen and (max-width: 374px) { // stylelint-disable-line
        display: none !important;
    }
}

#toggle-dark-mode-navbar {
    cursor: pointer;

    @include breakpoint-down('sm') {
        display: none !important;
    }
}

.hamburger.sidebar-toggle {
    padding: 10px 12px;
    border-radius: border-radius('md');
    background-color: transparent;
    border: 0;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: none;

    &:focus,
    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
        outline: 0;
    }

    &:active {
        background-color: rgba(0, 0, 0, 0.1);
    }
}

.inkline.-dark .navbar#navbar {
    > .container > .row > .column {
        > .brand {
            color: $body-color-dark;

            .logo {
                &.-light {
                    display: inline-block;
                }

                &.-dark {
                    display: none;
                }
            }
        }
    }

    &.-transparent {
        > .container > .row > .column {
            > .brand {
                @include breakpoint-down('md') {
                    color: colors('light');

                    .logo {
                        &.-light {
                            display: inline-block;
                        }

                        &.-dark {
                            display: none;
                        }
                    }
                }
            }
        }
    }
}
</style>
