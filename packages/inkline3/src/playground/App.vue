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
                    <router-link :to="{ name: 'utilities-vertical-align' }">
                        Vertical Align
                    </router-link>
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
    name: 'App'
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
    width: 280px;
    border-right: 1px solid #c7cfd6;
}

#content {
    display: flex;
    height: 100%;
    width: 100%;
    padding: 2rem;
    box-sizing: border-box;

    > article {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }
}
</style>
