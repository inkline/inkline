# Sidebar
## A responsive navigation sidebar that includes support for branding, navigation, forms and more.{.lead}

### Example
Here’s an example on how to use the `<i-sidebar>` inside a dashboard layout. The sidebar automatically collapses responsively.

To control the visibility of the sidebar when collapsed, we will use the `v-model` directive.

<i-code-preview title="Sidebar Example" link="https://github.com/inkline/inkline/tree/master/src/components/Sidebar">

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

<template slot="html">

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

</template>
<template slot="js">

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

</template>
</i-code-preview>

### Sizes
You're able to use the `size` modifier to control the size of your sidebar, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<i-code-preview title="Sidebar Sizes" link="https://github.com/inkline/inkline/tree/master/src/components/Sidebar">

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


<template slot="html">

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

</template>
<template slot="js">

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

</template>
</i-code-preview>

### Variants
Inkline includes two predefined sidebar styles. You can set the style of a `<i-sidebar>` using the `variant` property, which can have a value of `light` or `dark`. By default, modals use the `light` variant.

<i-code-preview title="Sidebar Variants" link="https://github.com/inkline/inkline/tree/master/src/components/Sidebar">

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

<template slot="html">

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

</template>
<template slot="js">

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

</template>
</i-code-preview>


### Placement
You can easily place your sidebar on the right side of a layout by setting the `placement` property to `right`. By default, sidebars are on the left side.

<i-code-preview title="Sidebar Placement" link="https://github.com/inkline/inkline/tree/master/src/components/Sidebar">

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

<template slot="html">

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

</template>
<template slot="js">

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

</template>
</i-code-preview>

### Collapse Breakpoint
You can control what breakpoint your sidebar will collapse at using the `collapse` property. By default, the sidebar will collapse on the `md` screen size.

<i-code-preview title="Collapse Breakpoint Example" link="https://github.com/inkline/inkline/tree/master/src/components/Sidebar">

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

<template slot="html">

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

</template>
<template slot="js">

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

</template>
</i-code-preview>

##### Always or Never Collapsible

Besides the breakpoint values, you can use a boolean value to set your sidebar to be always collapsible, or never collapsible.

Setting a `collapse` value of `true` will set the sidebar to be always collapsible.

<i-code-preview title="Always Collapsible Example" link="https://github.com/inkline/inkline/tree/master/src/components/Sidebar">

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

<template slot="html">

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

</template>
<template slot="js">

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

</template>
</i-code-preview>

Setting a `collapse` value of `false` will set the sidebar to never be collapsible.

<i-code-preview title="Never Collapsible Example" link="https://github.com/inkline/inkline/tree/master/src/components/Sidebar">

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

<template slot="html">

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

</template>
<template slot="js">

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

</template>
</i-code-preview>

### Collapse Position
You can set the collapsed sidebar position to `relative`, `absolute` or `fixed` using the `collapse-position` property. 

This property allows you to control whether the sidebar will affect the content that it is besides to when reaching the collapse breakpoint. 

<i-code-preview title="Sidebar Collapse Position" link="https://github.com/inkline/inkline/tree/master/src/components/Sidebar">

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

<template slot="html">

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

</template>
<template slot="js">

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

</template>
</i-code-preview>

### API

<i-api-preview title="Sidebar API" markup="i-sidebar" expanded link="https://github.com/inkline/inkline/tree/master/src/components/Sidebar">
    <template slot="props">
        <i-table bordered responsive>
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Accepted</th>
                    <th>Default</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>collapse</td>
                    <td>Specifies the breakpoint at which to collapse the sidebar.</td>
                    <td><code>String</code>, <code>Boolean</code></td>
                    <td><code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, <code>true</code>, <code>false</code></td>
                    <td><code>md</code></td>
                </tr>
                <tr>
                    <td>collapseOnClick</td>
                    <td>Collapses the sidebar when clicking a sidebar item.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>true</code></td>
                </tr>
                <tr>
                    <td>collapseOnClickOverlay</td>
                    <td>Collapses the sidebar when clicking the sidebar overlay. The overlay appears only for <code>absolute</code> and <code>fixed</code> collapse positions.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>true</code></td>
                </tr>
                <tr>
                    <td>collapsePosition</td>
                    <td>Sets the position of the sidebar when collapsed.</td>
                    <td><code>String</code></td>
                    <td><code>relative</code>, <code>absolute</code>, <code>fixed</code></td>
                    <td><code>fixed</code></td>
                </tr>
                <tr>
                    <td>placement</td>
                    <td>Sets the placement of the sidebar to the left or to the right.</td>
                    <td><code>String</code></td>
                    <td><code>relative</code>, <code>absolute</code>, <code>fixed</code></td>
                    <td><code>fixed</code></td>
                </tr>
                <tr>
                    <td>size</td>
                    <td>Sets the size of the sidebar component.</td>
                    <td><code>String</code></td>
                    <td><code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>md</code></td>
                </tr>
                <tr>
                    <td>value</td>
                    <td>Provides a way to collapse the sidebar programmatically. Should be used as part of <code>v-model</code> directive.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>variant</td>
                    <td>Sets the color variant of the sidebar component.</td>
                    <td><code>String</code></td>
                    <td><code>light</code>, <code>dark</code></td>
                    <td><code>light</code></td>
                </tr>
            </tbody>
        </i-table>
    </template>
    <template slot="slots">
        <i-table bordered responsive class="_margin-bottom-0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>default</td>
                    <td>Slot for sidebar component default content.</td>
                </tr>
            </tbody>
        </i-table>
    </template>
</i-api-preview>
