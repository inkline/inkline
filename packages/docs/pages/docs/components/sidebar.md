---
title: Sidebar
description: A responsive navigation sidebar that includes support for branding, navigation, forms and more.
---

# Sidebar
## A responsive navigation sidebar that includes support for branding, navigation, forms and more.

### Example
Here’s an example on how to use the `<i-sidebar>` inside a dashboard layout. The sidebar automatically collapses responsively.

To control the visibility of the sidebar when collapsed, we will use the `v-model` directive.

<i-code title="Sidebar Example">
<i-tab type="preview">
    <i-layout class="sidebar-layout-example -lg">
        <i-layout-header class="_padding-0">
            <i-navbar :collapse="false">
                <i-navbar-brand>Sidebar</i-navbar-brand>
                <i-hamburger-menu class="_visible-md-and-down" :active="collapsed" @click="collapsed = !collapsed"></i-hamburger-menu>
            </i-navbar>
        </i-layout-header>
        <i-layout vertical>
            <i-sidebar v-model="collapsed" collapse-position="absolute">
                <i-nav vertical>
                    <i-nav-item :to="{ name: 'docs-components-sidebar' }" onclick="return false;">Home</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
                </i-nav>
            </i-sidebar>
            <i-layout-content></i-layout-content>
        </i-layout>
    </i-layout>
</i-tab>
<i-tab type="html">

~~~html
<i-layout>
    <i-layout-header class="_padding-0">
        <i-navbar :collapse="false">
            <i-navbar-brand>Navbar</i-navbar-brand>
            <i-hamburger-menu class="_visible-md-and-down" :active="collapsed" @click="collapsed = !collapsed"></i-hamburger-menu>
        </i-navbar>
    </i-layout-header>
    <i-layout vertical>
        <i-sidebar v-model="collapsed">
            <i-nav vertical>
                <i-nav-item to="/">Home</i-nav-item>
                <i-nav-item to="/about">About</i-nav-item>
                <i-nav-item to="/contact">Contact</i-nav-item>
            </i-nav>
        </i-sidebar>
        <i-layout-content></i-layout-content>
    </i-layout>
</i-layout>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
    name: 'DashboardLayout',
    data() {
        return {
            collapsed: false
        };
    }
}
~~~

</i-tab>
</i-code>

### Sizes
You're able to use the `size` modifier to control the size of your sidebar, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<i-code title="Sidebar Sizes">
<i-tab type="preview">
    <i-layout class="sidebar-layout-example -sm">
        <i-layout-header class="_padding-0">
            <i-navbar :collapse="false">
                <i-navbar-brand>Small Sidebar</i-navbar-brand>
                <i-hamburger-menu class="_visible-md-and-down" :active="collapsedSizesSm" @click="collapsedSizesSm = !collapsedSizesSm"></i-hamburger-menu>
            </i-navbar>
        </i-layout-header>
        <i-layout vertical>
            <i-sidebar size="sm" collapse-position="absolute" v-model="collapsedSizesSm">
                <i-nav vertical>
                    <i-nav-item :to="{ name: 'docs-components-sidebar' }" onclick="return false;">Home</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
                </i-nav>
            </i-sidebar>
            <i-layout-content></i-layout-content>
        </i-layout>
    </i-layout>
    <i-layout class="sidebar-layout-example -sm _margin-top-1">
        <i-layout-header class="_padding-0">
            <i-navbar :collapse="false">
                <i-navbar-brand>Medium Sidebar</i-navbar-brand>
                <i-hamburger-menu class="_visible-md-and-down" :active="collapsedSizesMd" @click="collapsedSizesMd = !collapsedSizesMd"></i-hamburger-menu>
            </i-navbar>
        </i-layout-header>
        <i-layout vertical>
            <i-sidebar size="md" collapse-position="absolute" v-model="collapsedSizesMd">
                <i-nav vertical>
                    <i-nav-item :to="{ name: 'docs-components-sidebar' }" onclick="return false;">Home</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
                </i-nav>
            </i-sidebar>
            <i-layout-content></i-layout-content>
        </i-layout>
    </i-layout>
    <i-layout class="sidebar-layout-example -sm _margin-top-1">
        <i-layout-header class="_padding-0">
            <i-navbar :collapse="false">
                <i-navbar-brand>Large Sidebar</i-navbar-brand>
                <i-hamburger-menu class="_visible-md-and-down" :active="collapsedSizesLg" @click="collapsedSizesLg = !collapsedSizesLg"></i-hamburger-menu>
            </i-navbar>
        </i-layout-header>
        <i-layout vertical>
            <i-sidebar size="lg" collapse-position="absolute" v-model="collapsedSizesLg">
                <i-nav vertical>
                    <i-nav-item :to="{ name: 'docs-components-sidebar' }" onclick="return false;">Home</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
                </i-nav>
            </i-sidebar>
            <i-layout-content></i-layout-content>
        </i-layout>
    </i-layout>
</i-tab>
<i-tab type="html">

~~~html
<i-layout>
    <i-layout-header class="_padding-0">
        <i-navbar :collapse="false">
            <i-navbar-brand>Small Sidebar</i-navbar-brand>
            <i-hamburger-menu class="_visible-md-and-down" :active="collapsed" @click="collapsed = !collapsed"></i-hamburger-menu>
        </i-navbar>
    </i-layout-header>
    <i-layout vertical>
        <i-sidebar size="sm" v-model="collapsed">
            <i-nav vertical>
                <i-nav-item to="/">Home</i-nav-item>
                <i-nav-item to="/about">About</i-nav-item>
                <i-nav-item to="/contact">Contact</i-nav-item>
            </i-nav>
        </i-sidebar>
        <i-layout-content></i-layout-content>
    </i-layout>
</i-layout>
~~~
~~~html
<i-layout>
    <i-layout-header class="_padding-0">
        <i-navbar :collapse="false">
            <i-navbar-brand>Small Sidebar</i-navbar-brand>
            <i-hamburger-menu class="_visible-md-and-down" :active="collapsed" @click="collapsed = !collapsed"></i-hamburger-menu>
        </i-navbar>
    </i-layout-header>
    <i-layout vertical>
        <i-sidebar size="md" v-model="collapsed">
            <i-nav vertical>
                <i-nav-item to="/">Home</i-nav-item>
                <i-nav-item to="/about">About</i-nav-item>
                <i-nav-item to="/contact">Contact</i-nav-item>
            </i-nav>
        </i-sidebar>
        <i-layout-content></i-layout-content>
    </i-layout>
</i-layout>
~~~
~~~html
<i-layout>
    <i-layout-header class="_padding-0">
        <i-navbar :collapse="false">
            <i-navbar-brand>Small Sidebar</i-navbar-brand>
            <i-hamburger-menu class="_visible-md-and-down" :active="collapsed" @click="collapsed = !collapsed"></i-hamburger-menu>
        </i-navbar>
    </i-layout-header>
    <i-layout vertical>
        <i-sidebar size="lg" v-model="collapsed">
            <i-nav vertical>
                <i-nav-item to="/">Home</i-nav-item>
                <i-nav-item to="/about">About</i-nav-item>
                <i-nav-item to="/contact">Contact</i-nav-item>
            </i-nav>
        </i-sidebar>
        <i-layout-content></i-layout-content>
    </i-layout>
</i-layout>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
    name: 'DashboardLayout',
    data() {
        return {
            collapsed: false
        };
    }
}
~~~

</i-tab>
</i-code>

### Variants
Inkline includes two predefined sidebar styles. You can set the style of a `<i-sidebar>` using the `variant` property, which can have a value of `light` or `dark`. By default, modals use the `light` variant.

<i-code title="Sidebar Variants">
<i-tab type="preview">
    <i-layout class="sidebar-layout-example">
        <i-layout-header class="_padding-0">
            <i-navbar variant="light" :collapse="false">
                <i-navbar-brand>Light Sidebar</i-navbar-brand>
                <i-hamburger-menu variant="light" class="_visible-md-and-down" :active="collapsedVariantsLight" @click="collapsedVariantsLight = !collapsedVariantsLight"></i-hamburger-menu>
            </i-navbar>
        </i-layout-header>
        <i-layout vertical>
            <i-sidebar variant="light" collapse-position="absolute" v-model="collapsedVariantsLight">
                <i-nav vertical>
                    <i-nav-item :to="{ name: 'docs-components-sidebar' }" onclick="return false;">Home</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
                </i-nav>
            </i-sidebar>
            <i-layout-content></i-layout-content>
        </i-layout>
    </i-layout>
    <i-layout class="sidebar-layout-example _margin-top-1">
        <i-layout-header class="_padding-0">
            <i-navbar variant="dark" :collapse="false">
                <i-navbar-brand>Dark Sidebar</i-navbar-brand>
                <i-hamburger-menu variant="dark" class="_visible-md-and-down" :active="collapsedVariantsDark" @click="collapsedVariantsDark = !collapsedVariantsDark"></i-hamburger-menu>
            </i-navbar>
        </i-layout-header>
        <i-layout vertical>
            <i-sidebar variant="dark" collapse-position="absolute" v-model="collapsedVariantsDark">
                <i-nav vertical>
                    <i-nav-item :to="{ name: 'docs-components-sidebar' }" onclick="return false;">Home</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
                </i-nav>
            </i-sidebar>
        </i-layout>
    </i-layout>
</i-tab>
<i-tab type="html">

~~~html
<i-layout>
    <i-layout-header class="_padding-0">
        <i-navbar variant="light" :collapse="false">
            <i-navbar-brand>Light Sidebar</i-navbar-brand>
            <i-hamburger-menu variant="light" class="_visible-md-and-down" :active="collapsed" @click="collapsed = !collapsed"></i-hamburger-menu>
        </i-navbar>
    </i-layout-header>
    <i-layout vertical>
        <i-sidebar variant="light" v-model="collapsed">
            <i-nav vertical>
                <i-nav-item to="/">Home</i-nav-item>
                <i-nav-item to="/about">About</i-nav-item>
                <i-nav-item to="/contact">Contact</i-nav-item>
            </i-nav>
        </i-sidebar>
        <i-layout-content></i-layout-content>
    </i-layout>
</i-layout>
~~~
~~~html
<i-layout>
    <i-layout-header class="_padding-0">
        <i-navbar variant="dark" :collapse="false">
            <i-navbar-brand>Dark Sidebar</i-navbar-brand>
            <i-hamburger-menu variant="dark" class="_visible-md-and-down" :active="collapsed" @click="collapsed = !collapsed"></i-hamburger-menu>
        </i-navbar>
    </i-layout-header>
    <i-layout vertical>
        <i-sidebar variant="dark" v-model="collapsed">
            <i-nav vertical>
                <i-nav-item to="/">Home</i-nav-item>
                <i-nav-item to="/about">About</i-nav-item>
                <i-nav-item to="/contact">Contact</i-nav-item>
            </i-nav>
        </i-sidebar>
        <i-layout-content></i-layout-content>
    </i-layout>
</i-layout>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
    name: 'DashboardLayout',
    data() {
        return {
            collapsed: false
        };
    }
}
~~~

</i-tab>
</i-code>


### Placement
You can easily place your sidebar on the right side of a layout by setting the `placement` property to `right`. By default, sidebars are on the left side.

<i-code title="Sidebar Placement">
<i-tab type="preview">
    <i-layout class="sidebar-layout-example">
        <i-layout-header class="_padding-0">
            <i-navbar :collapse="false">
                <i-navbar-brand>Left Sidebar</i-navbar-brand>
                <i-hamburger-menu class="_visible-md-and-down" :active="collapsedPlacementLeft" @click="collapsedPlacementLeft = !collapsedPlacementLeft"></i-hamburger-menu>
            </i-navbar>
        </i-layout-header>
        <i-layout vertical>
            <i-sidebar collapse-position="absolute" placement="left" v-model="collapsedPlacementLeft">
                <i-nav vertical>
                    <i-nav-item :to="{ name: 'docs-components-sidebar' }" onclick="return false;">Home</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
                </i-nav>
            </i-sidebar>
            <i-layout-content></i-layout-content>
        </i-layout>
    </i-layout>
    <i-layout class="sidebar-layout-example _margin-top-1">
        <i-layout-header class="_padding-0">
            <i-navbar :collapse="false">
                <i-navbar-brand>Right Sidebar</i-navbar-brand>
                <i-hamburger-menu class="_visible-md-and-down" :active="collapsedPlacementRight" @click="collapsedPlacementRight = !collapsedPlacementRight"></i-hamburger-menu>
            </i-navbar>
        </i-layout-header>
        <i-layout vertical>
            <i-layout-content></i-layout-content>
            <i-sidebar collapse-position="absolute" placement="right" v-model="collapsedPlacementRight">
                <i-nav vertical>
                    <i-nav-item :to="{ name: 'docs-components-sidebar' }" onclick="return false;">Home</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
                </i-nav>
            </i-sidebar>
        </i-layout>
    </i-layout>
</i-tab>
<i-tab type="html">

~~~html
<i-layout">
    <i-layout-header class="_padding-0">
        <i-navbar :collapse="false">
            <i-navbar-brand>Left Sidebar</i-navbar-brand>
            <i-hamburger-menu class="_visible-md-and-down" :active="collapsed" @click="collapsed = !collapsed"></i-hamburger-menu>
        </i-navbar>
    </i-layout-header>
    <i-layout vertical>
        <i-sidebar placement="left" v-model="collapsed">
            <i-nav vertical>
                <i-nav-item to="/">Home</i-nav-item>
                <i-nav-item to="/about">About</i-nav-item>
                <i-nav-item to="/contact">Contact</i-nav-item>
            </i-nav>
        </i-sidebar>
        <i-layout-content></i-layout-content>
    </i-layout>
</i-layout>
~~~

~~~html
<i-layout">
    <i-layout-header class="_padding-0">
        <i-navbar :collapse="false">
            <i-navbar-brand>Right Sidebar</i-navbar-brand>
            <i-hamburger-menu class="_visible-md-and-down" :active="collapsed" @click="collapsed = !collapsed"></i-hamburger-menu>
        </i-navbar>
    </i-layout-header>
    <i-layout vertical>
        <i-layout-content></i-layout-content>
        <i-sidebar placement="right" v-model="collapsed">
            <i-nav vertical>
                <i-nav-item to="/">Home</i-nav-item>
                <i-nav-item to="/about">About</i-nav-item>
                <i-nav-item to="/contact">Contact</i-nav-item>
            </i-nav>
        </i-sidebar>
    </i-layout>
</i-layout>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
    name: 'DashboardLayout',
    data() {
        return {
            collapsed: false
        };
    }
}
~~~

</i-tab>
</i-code>

### Collapse Breakpoint
You can control what breakpoint your sidebar will collapse at using the `collapse` property. By default, the sidebar will collapse on the `md` screen size.

<i-code title="Collapse Breakpoint Example">
<i-tab type="preview">
    <i-layout class="sidebar-layout-example">
        <i-layout-header class="_padding-0">
            <i-navbar :collapse="false">
                <i-navbar-brand>Sidebar</i-navbar-brand>
                <i-hamburger-menu class="_visible-lg-and-down" :active="collapsedBreakpointLg" @click="collapsedBreakpointLg = !collapsedBreakpointLg"></i-hamburger-menu>
            </i-navbar>
        </i-layout-header>
        <i-layout vertical>
            <i-sidebar collapse-position="absolute" collapse="lg" v-model="collapsedBreakpointLg">
                <i-nav vertical>
                    <i-nav-item :to="{ name: 'docs-components-sidebar' }" onclick="return false;">Home</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
                </i-nav>
            </i-sidebar>
            <i-layout-content></i-layout-content>
        </i-layout>
    </i-layout>
</i-tab>
<i-tab type="html">

~~~html
<i-layout">
    <i-layout-header class="_padding-0">
        <i-navbar :collapse="false">
            <i-navbar-brand>Sidebar</i-navbar-brand>
            <i-hamburger-menu class="_visible-lg-and-down" :active="collapsed" @click="collapsed = !collapsed"></i-hamburger-menu>
        </i-navbar>
    </i-layout-header>
    <i-layout vertical>
        <i-sidebar collapse="lg" v-model="collapsed">
            <i-nav vertical>
                <i-nav-item to="/">Home</i-nav-item>
                <i-nav-item to="/about">About</i-nav-item>
                <i-nav-item to="/contact">Contact</i-nav-item>
            </i-nav>
        </i-sidebar>
        <i-layout-content></i-layout-content>
    </i-layout>
</i-layout>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
    name: 'DashboardLayout',
    data() {
        return {
            collapsed: false
        };
    }
}
~~~

</i-tab>
</i-code>

##### Always or Never Collapsible

Besides the breakpoint values, you can use a boolean value to set your sidebar to be always collapsible, or never collapsible.

Setting a `collapse` value of `true` will set the sidebar to be always collapsible.

<i-code title="Always Collapsible Example">
<i-tab type="preview">
    <i-layout class="sidebar-layout-example">
        <i-layout-header class="_padding-0">
            <i-navbar :collapse="false">
                <i-navbar-brand>Sidebar</i-navbar-brand>
                <i-hamburger-menu :active="collapsedBreakpointAlways" @click="collapsedBreakpointAlways = !collapsedBreakpointAlways"></i-hamburger-menu>
            </i-navbar>
        </i-layout-header>
        <i-layout vertical>
            <i-sidebar collapse-position="absolute" :collapse="true" v-model="collapsedBreakpointAlways">
                <i-nav vertical>
                    <i-nav-item :to="{ name: 'docs-components-sidebar' }" onclick="return false;">Home</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
                </i-nav>
            </i-sidebar>
            <i-layout-content></i-layout-content>
        </i-layout>
    </i-layout>
</i-tab>
<i-tab type="html">

~~~html
<i-layout">
    <i-layout-header class="_padding-0">
        <i-navbar :collapse="false">
            <i-navbar-brand>Sidebar</i-navbar-brand>
            <i-hamburger-menu :active="collapsed" @click="collapsed = !collapsed"></i-hamburger-menu>
        </i-navbar>
    </i-layout-header>
    <i-layout vertical>
        <i-sidebar :collapse="true" v-model="collapsed">
            <i-nav vertical>
                <i-nav-item to="/">Home</i-nav-item>
                <i-nav-item to="/about">About</i-nav-item>
                <i-nav-item to="/contact">Contact</i-nav-item>
            </i-nav>
        </i-sidebar>
        <i-layout-content></i-layout-content>
    </i-layout>
</i-layout>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
    name: 'DashboardLayout',
    data() {
        return {
            collapsed: false
        };
    }
}
~~~

</i-tab>
</i-code>

Setting a `collapse` value of `false` will set the sidebar to never be collapsible.

<i-code title="Never Collapsible Example">
<i-tab type="preview">
    <i-layout class="sidebar-layout-example">
        <i-layout-header class="_padding-0">
            <i-navbar :collapse="false">
                <i-navbar-brand>Sidebar</i-navbar-brand>
            </i-navbar>
        </i-layout-header>
        <i-layout vertical>
            <i-sidebar collapse-position="absolute" :collapse="false">
                <i-nav vertical>
                    <i-nav-item :to="{ name: 'docs-components-sidebar' }" onclick="return false;">Home</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
                </i-nav>
            </i-sidebar>
            <i-layout-content></i-layout-content>
        </i-layout>
    </i-layout>
</i-tab>
<i-tab type="html">

~~~html
<i-layout">
    <i-layout-header class="_padding-0">
        <i-navbar :collapse="false">
            <i-navbar-brand>Sidebar</i-navbar-brand>
        </i-navbar>
    </i-layout-header>
    <i-layout vertical>
        <i-sidebar :collapse="false">
            <i-nav vertical>
                <i-nav-item to="/">Home</i-nav-item>
                <i-nav-item to="/about">About</i-nav-item>
                <i-nav-item to="/contact">Contact</i-nav-item>
            </i-nav>
        </i-sidebar>
        <i-layout-content></i-layout-content>
    </i-layout>
</i-layout>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
    name: 'DashboardLayout',
    data() {
        return {
            collapsed: false
        };
    }
}
~~~

</i-tab>
</i-code>

### Collapse Position
You can set the collapsed sidebar position to `relative`, `absolute` or `fixed` using the `collapse-position` property. 

This property allows you to control whether the sidebar will affect the content that it is besides to when reaching the collapse breakpoint. 

<i-code title="Sidebar Collapse Position">
<i-tab type="preview">
    <i-layout class="sidebar-layout-example">
        <i-layout-header class="_padding-0">
            <i-navbar :collapse="false">
                <i-navbar-brand>Relative Position Sidebar</i-navbar-brand>
                <i-hamburger-menu :active="collapsedPositionRelative" @click="collapsedPositionRelative = !collapsedPositionRelative"></i-hamburger-menu>
            </i-navbar>
        </i-layout-header>
        <i-layout vertical>
            <i-sidebar :collapse="true" collapse-position="relative" v-model="collapsedPositionRelative">
                <i-nav vertical>
                    <i-nav-item :to="{ name: 'docs-components-sidebar' }" onclick="return false;">Home</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
                </i-nav>
            </i-sidebar>
            <i-layout-content class="_display-flex _justify-content-center _align-items-center">Layout content</i-layout-content>
        </i-layout>
    </i-layout>
    <i-layout class="sidebar-layout-example _margin-top-1">
        <i-layout-header class="_padding-0">
            <i-navbar :collapse="false">
                <i-navbar-brand>Absolute Position Sidebar</i-navbar-brand>
                <i-hamburger-menu :active="collapsedPositionAbsolute" @click="collapsedPositionAbsolute = !collapsedPositionAbsolute"></i-hamburger-menu>
            </i-navbar>
        </i-layout-header>
        <i-layout vertical>
            <i-sidebar :collapse="true" collapse-position="absolute" v-model="collapsedPositionAbsolute">
                <i-nav vertical>
                    <i-nav-item :to="{ name: 'docs-components-sidebar' }" onclick="return false;">Home</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
                </i-nav>
            </i-sidebar>
            <i-layout-content class="_display-flex _justify-content-center _align-items-center">Layout content</i-layout-content>
        </i-layout>
    </i-layout>
    <i-layout class="sidebar-layout-example _margin-top-1">
        <i-layout-header class="_padding-0">
            <i-navbar :collapse="false">
                <i-navbar-brand>Fixed Position Sidebar</i-navbar-brand>
                <i-hamburger-menu :active="collapsedPositionFixed" @click="collapsedPositionFixed = !collapsedPositionFixed"></i-hamburger-menu>
            </i-navbar>
        </i-layout-header>
        <i-layout vertical>
            <i-sidebar :collapse="true" collapse-position="absolute" v-model="collapsedPositionFixed">
                <i-nav vertical>
                    <i-nav-item :to="{ name: 'docs-components-sidebar' }" onclick="return false;">Home</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
                    <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
                </i-nav>
            </i-sidebar>
            <i-layout-content class="_display-flex _justify-content-center _align-items-center">Layout content</i-layout-content>
        </i-layout>
    </i-layout>
</i-tab>
<i-tab type="html">

~~~html
<i-layout">
    <i-layout-header class="_padding-0">
        <i-navbar :collapse="false">
            <i-navbar-brand>Relative Position Sidebar</i-navbar-brand>
            <i-hamburger-menu class="_visible-md-and-down" :active="collapsed" @click="collapsed = !collapsed"></i-hamburger-menu>
        </i-navbar>
    </i-layout-header>
    <i-layout vertical>
        <i-sidebar collapse-position="relative" v-model="collapsed">
            <i-nav vertical>
                <i-nav-item to="/">Home</i-nav-item>
                <i-nav-item to="/about">About</i-nav-item>
                <i-nav-item to="/contact">Contact</i-nav-item>
            </i-nav>
        </i-sidebar>
        <i-layout-content></i-layout-content>
    </i-layout>
</i-layout>
~~~

~~~html
<i-layout">
    <i-layout-header class="_padding-0">
        <i-navbar :collapse="false">
            <i-navbar-brand>Absolute Position Sidebar</i-navbar-brand>
            <i-hamburger-menu class="_visible-md-and-down" :active="collapsed" @click="collapsed = !collapsed"></i-hamburger-menu>
        </i-navbar>
    </i-layout-header>
    <i-layout vertical>
        <i-sidebar collapse-position="absolute" v-model="collapsed">
            <i-nav vertical>
                <i-nav-item to="/">Home</i-nav-item>
                <i-nav-item to="/about">About</i-nav-item>
                <i-nav-item to="/contact">Contact</i-nav-item>
            </i-nav>
        </i-sidebar>
        <i-layout-content></i-layout-content>
    </i-layout>
</i-layout>
~~~

~~~html
<i-layout">
    <i-layout-header class="_padding-0">
        <i-navbar :collapse="false">
            <i-navbar-brand>Fixed Position Sidebar</i-navbar-brand>
            <i-hamburger-menu class="_visible-md-and-down" :active="collapsed" @click="collapsed = !collapsed"></i-hamburger-menu>
        </i-navbar>
    </i-layout-header>
    <i-layout vertical>
        <i-sidebar collapse-position="fixed" v-model="collapsed">
            <i-nav vertical>
                <i-nav-item to="/">Home</i-nav-item>
                <i-nav-item to="/about">About</i-nav-item>
                <i-nav-item to="/contact">Contact</i-nav-item>
            </i-nav>
        </i-sidebar>
        <i-layout-content></i-layout-content>
    </i-layout>
</i-layout>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
    name: 'DashboardLayout',
    data() {
        return {
            collapsed: false
        };
    }
}
~~~

</i-tab>
</i-code>


### Component API
Here you can find a list of the various customization options you can use for the sidebar components as props, as well as available slots and events.

<i-code title="Sidebar API" markup="i-sidebar" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/ISidebar">
    <i-tab type="props">
        <api-table>
            <api-table-row>
                <template slot="property">collapse</template>
                <template slot="description">Specifies the breakpoint at which to collapse the sidebar.</template>
                <template slot="type"><code>String</code>, <code>Boolean</code></template>
                <template slot="values"><code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, <code>true</code>, <code>false</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">collapse-on-click</template>
                <template slot="description">Collapses the sidebar when clicking a sidebar item.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>true</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">collapse-on-click-overlay</template>
                <template slot="description">Collapses the sidebar when clicking the sidebar overlay. The overlay appears only for <code>absolute</code> and <code>fixed</code> collapse positions.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>true</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">collapse-position</template>
                <template slot="description">Sets the position of the sidebar when collapsed.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>relative</code>, <code>absolute</code>, <code>fixed</code></template>
                <template slot="default"><code>fixed</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">placement</template>
                <template slot="description">Sets the placement of the sidebar to the left or to the right.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>relative</code>, <code>absolute</code>, <code>fixed</code></template>
                <template slot="default"><code>fixed</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the sidebar component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">value</template>
                <template slot="description">Provides a way to collapse the sidebar programmatically. Should be used as part of <code>v-model</code> directive.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">variant</template>
                <template slot="description">Sets the color variant of the sidebar component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>light</code>, <code>dark</code></template>
                <template slot="default"><code>light</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
    <i-tab type="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for sidebar component default content.</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

### Sass Variables
Here you can find a list of the Sass variables you can use for the sidebar components. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

<i-code title="Sidebar" expanded>
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$sidebar-width-base</template>
                <template slot="default"><code>14rem</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$sidebar-width</template>
                <template slot="default"><code>size-map($sidebar-width-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$sidebar-padding-base</template>
                <template slot="default"><code>0</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$sidebar-padding</template>
                <template slot="default"><code>size-map($sidebar-padding-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$sidebar-wrapper-transition-duration</template>
                <template slot="default"><code>$transition-duration</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$sidebar-wrapper-transition-easing</template>
                <template slot="default"><code>$transition-easing</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$sidebar-transition-duration</template>
                <template slot="default"><code>$transition-duration</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$sidebar-transition-easing</template>
                <template slot="default"><code>$transition-easing</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$sidebar-overlay-transition-duration</template>
                <template slot="default"><code>$transition-duration</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$sidebar-overlay-transition-easing</template>
                <template slot="default"><code>$transition-easing</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$sidebar-overlay-background</template>
                <template slot="default"><code>rgba(0, 0, 0, 0.5)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$sidebar-z-index</template>
                <template slot="default"><code>$z-index-fixed</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$sidebar-color-for-light-variant</template>
                <template slot="default"><code>$color-for-light-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$sidebar-color-for-dark-variant</template>
                <template slot="default"><code>$color-for-dark-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$sidebar-variant-{variant}</template>
                <template slot="default"><code>sidebar-variant($color-{variant})</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$sidebar-variants</template>
<template slot="default-row">
                
~~~scss
(
    light: $sidebar-variant-light,
    dark: $sidebar-variant-dark
)
~~~
                
</template>
            </api-table-row>
            <api-table-row>
                <template slot="function">sidebar-variant</template>
<template slot="default-row">
                
~~~scss
@function sidebar-variant($variant) {
    $sidebar-variant-color: variant-color-by-luminance($variant, $sidebar-color-for-light-variant, $sidebar-color-for-dark-variant);
    $sidebar-variant-background: $variant;

    $variant-map: (
        color: $sidebar-variant-color,
        background: $sidebar-variant-background,
    );

    @return $variant-map;
}

~~~
                
</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code> 
