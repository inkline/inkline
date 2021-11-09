<template>
    <div id="layout">
        <aside id="sidebar">
            <ul>
                <li>
                    Preface
                </li>
                <li>
                    <router-link :to="{ name: 'docs-preface' }">
                        About Inkline
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-preface-concepts' }">
                        Concepts
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-preface-contribution-guide' }">
                        Contribution Guide
                    </router-link>
                </li>
                <li>
                    Introduction
                </li>
                <li>
                    <router-link :to="{ name: 'docs-introduction' }">
                        Getting Started
                    </router-link>
                </li>
                <li>
                    Installation
                    <ul>
                        <li>
                            <router-link :to="{ name: 'docs-introduction-installation-vue-cli' }">
                                Vue CLI
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'docs-introduction-installation-nuxt' }">
                                Nuxt.js
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'docs-introduction-installation-custom' }">
                                Custom
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'docs-introduction-installation-cdn' }">
                                CDN
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-introduction-plugin-options' }">
                        Plugin Options
                    </router-link>
                </li>
                <li>
                    Core
                </li>
                <li>
                    <router-link :to="{ name: 'docs-core-grid' }">
                        Grid
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-core-layout' }">
                        Layout
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-core-typography' }">
                        Typography
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-core-images' }">
                        Images
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-core-tables' }">
                        Tables
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-core-code' }">
                        Code
                    </router-link>
                </li>
                <li>
                    Forms
                </li>
                <li>
                    <router-link :to="{ name: 'docs-forms-checkbox' }">
                        Checkbox
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-forms-input' }">
                        Input
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-forms-number-input' }">
                        Number Input
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-forms-radio' }">
                        Radio
                    </router-link>
                </li>
                <li>
                    Select
                    <ul>
                        <li>
                            <router-link :to="{ name: 'docs-forms-select' }">
                                Overview
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'docs-forms-select-pagination' }">
                                Pagination
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'docs-forms-select-autocomplete' }">
                                Autocomplete
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'docs-forms-select-rendering' }">
                                Rendering
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'docs-forms-select-advanced' }">
                                Advanced
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-forms-textarea' }">
                        Textarea
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-forms-toggle' }">
                        Toggle
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-forms-form' }">
                        Form
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-forms-form-group' }">
                        Form Group
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-forms-form-label' }">
                        Form Label
                    </router-link>
                </li>

                <li>
                    Form Validation
                    <ul>
                        <li>
                            <router-link :to="{ name: 'docs-forms-validation' }">
                                Overview
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'docs-forms-validation-schema' }">
                                Schema
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'docs-forms-validation-validators' }">
                                Validators
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'docs-forms-validation-methods' }">
                                Methods
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    Components
                </li>
                <li>
                    <router-link :to="{ name: 'docs-components-alert' }">
                        Alert
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-components-badge' }">
                        Badge
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-components-breadcrumb' }">
                        Breadcrumb
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-components-button' }">
                        Button
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-components-button-group' }">
                        Button Group
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-components-card' }">
                        Card
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-components-collapsible' }">
                        Collapsible
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-components-dropdown' }">
                        Dropdown
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-components-hamburger-menu' }">
                        Hamburger Menu
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-components-header' }">
                        Header
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-components-icon' }">
                        Icon
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-components-list-group' }">
                        List Group
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-components-loader' }">
                        Loader
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-components-media' }">
                        Media
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-components-modal' }">
                        Modal
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-components-nav' }">
                        Nav
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-components-navbar' }">
                        Navbar
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-components-pagination' }">
                        Pagination
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-components-popover' }">
                        Popover
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-components-progress' }">
                        Progress
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-components-sidebar' }">
                        Sidebar
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-components-tabs' }">
                        Tabs
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-components-tooltip' }">
                        Tooltip
                    </router-link>
                </li>
                <li>
                    Utilities
                </li>
                <li>
                    <router-link :to="{ name: 'docs-utilities-border' }">
                        Border
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-utilities-clearfix' }">
                        Clearfix
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-utilities-color' }">
                        Color
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-utilities-display' }">
                        Display
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-utilities-embed' }">
                        Embed
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-utilities-flex' }">
                        Flex
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-utilities-float' }">
                        Float
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-utilities-overflow' }">
                        Overflow
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-utilities-overlay' }">
                        Overlay
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-utilities-position' }">
                        Position
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-utilities-screen-reader' }">
                        Screen Reader
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-utilities-sizing' }">
                        Sizing
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-utilities-spacing' }">
                        Spacing
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-utilities-text' }">
                        Text
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-utilities-vertical-align' }">
                        Vertical Align
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'docs-utilities-visibility' }">
                        Visibility
                    </router-link>
                </li>
                <li>
                    Color mode
                </li>
                <li>
                    <label>
                        <input v-model="colorMode" name="color-mode" type="radio" value="system"> System
                    </label>
                    <br>
                    <label>
                        <input v-model="colorMode" name="color-mode" type="radio" value="light"> Light
                    </label>
                    <br>
                    <label>
                        <input v-model="colorMode" name="color-mode" type="radio" value="dark"> Dark
                    </label>
                </li>
            </ul>
        </aside>
        <main id="content">
            <router-view />
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'App',
    data () {
        return {
            colorMode: this.$inkline.options.colorMode
        };
    },
    watch: {
        colorMode (value) {
            this.$inkline.options.colorMode = value;
        }
    }
});
</script>

<style lang="scss">
    html,
    body,
    #app,
    #layout {
        height: 100%;
        width: 100%;
    }

    #layout {
        display: flex;
    }

    #sidebar {
        display: flex;
        height: 100%;
        overflow: auto;
        width: 280px;
        border-right: 1px solid var(--border-color-light);

        .inkline.-dark & {
            border-right: 1px solid var(--border-color--dark);
        }
    }

    #content {
        display: block;
        height: 100%;
        width: 100%;
        overflow: auto;
        padding: 2rem;
        box-sizing: border-box;

        > article {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
        }
    }
</style>
