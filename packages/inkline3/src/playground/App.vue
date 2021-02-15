<template>
    <div id="layout">
        <aside id="sidebar">
            <ul>
                <li>
                    <router-link :to="{ name: 'index' }">
                        Home
                    </router-link>
                </li>
                <li>
                    Core
                </li>
                <li>
                    <router-link :to="{ name: 'core-grid' }">
                        Grid
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'core-layout' }">
                        Layout
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'core-typography' }">
                        Typography
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'core-images' }">
                        Images
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'core-tables' }">
                        Tables
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'core-code' }">
                        Code
                    </router-link>
                </li>
                <li>
                    Components
                </li>
                <li>
                    <router-link :to="{ name: 'components-alert' }">
                        Alert
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'components-badge' }">
                        Badge
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'components-breadcrumb' }">
                        Breadcrumb
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'components-button' }">
                        Button
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'components-button-group' }">
                        Button Group
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'components-card' }">
                        Card
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'components-collapsible' }">
                        Collapsible
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'components-hamburger-menu' }">
                        Hamburger Menu
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'components-header' }">
                        Header
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'components-icon' }">
                        Icon
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'components-list-group' }">
                        List Group
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'components-loader' }">
                        Loader
                    </router-link>
                </li>
                <li>
                    Utilities
                </li>
                <li>
                    <router-link :to="{ name: 'utilities-border' }">
                        Border
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'utilities-clearfix' }">
                        Clearfix
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'utilities-color' }">
                        Color
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'utilities-display' }">
                        Display
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'utilities-embed' }">
                        Embed
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'utilities-flex' }">
                        Flex
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'utilities-float' }">
                        Float
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'utilities-overflow' }">
                        Overflow
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'utilities-overlay' }">
                        Overlay
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'utilities-sizing' }">
                        Sizing
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'utilities-spacing' }">
                        Spacing
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'utilities-text' }">
                        Text
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'utilities-vertical-align' }">
                        Vertical Align
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'utilities-visibility' }">
                        Visibility
                    </router-link>
                </li>
                <li>
                    Color mode
                </li>
                <li>
                    <label>
                        <input v-model="colorMode" name="color-mode" type="radio" value="system" /> System
                    </label>
                    <br/>
                    <label>
                        <input v-model="colorMode" name="color-mode" type="radio" value="light" /> Light
                    </label>
                    <br/>
                    <label>
                        <input v-model="colorMode" name="color-mode" type="radio" value="dark" /> Dark
                    </label>
                </li>
            </ul>
        </aside>
        <main id="content">
            <router-view />
        </main>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            colorMode: this.$inkline.options.colorMode
        };
    },
    watch: {
        colorMode(value) {
            this.$inkline.options.colorMode = value;
        }
    }
}
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
        border-right: 1px solid var(--border-color-dark);
    }
}

#content {
    display: flex;
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
