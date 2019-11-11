# Sidebar
## A responsive navigation sidebar that includes support for branding, navigation, forms and more.{.lead}

### Example
Here’s an example on how to use the `<i-sidebar>` inside a dashboard layout. The sidebar automatically collapses responsively.

<i-code-preview title="Sidebar Example" link="https://github.com/inkline/inkline/tree/master/src/components/Sidebar">

<i-layout class="sidebar-layout-example -lg">
    <i-layout-header class="_padding-0">
        <i-navbar :collapse="false">
            <i-navbar-brand>Navbar</i-navbar-brand>
            <i-hamburger-menu class="_visible-md-and-down" :active="collapsed" @click="collapsed = !collapsed"></i-hamburger-menu>
        </i-navbar>
    </i-layout-header>
    <i-layout vertical>
        <i-sidebar v-model="collapsed" collapse-position="absolute">
            <i-nav vertical>
                <i-nav-item :to="{ name: 'docs-components-sidebar' }">Home</i-nav-item>
                <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
                <i-nav-item :to="{ name: 'index' }">Contact</i-nav-item>
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
                <i-nav-item :to="{ name: 'docs-components-sidebar' }">Home</i-nav-item>
                <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
                <i-nav-item :to="{ name: 'index' }">Contact</i-nav-item>
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
                <i-nav-item :to="{ name: 'docs-components-sidebar' }">Home</i-nav-item>
                <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
                <i-nav-item :to="{ name: 'index' }">Contact</i-nav-item>
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
                <i-nav-item :to="{ name: 'docs-components-sidebar' }">Home</i-nav-item>
                <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
                <i-nav-item :to="{ name: 'index' }">Contact</i-nav-item>
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
                <i-nav-item :to="{ name: 'docs-components-sidebar' }">Home</i-nav-item>
                <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
                <i-nav-item :to="{ name: 'index' }">Contact</i-nav-item>
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
                <i-nav-item :to="{ name: 'docs-components-sidebar' }">Home</i-nav-item>
                <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
                <i-nav-item :to="{ name: 'index' }">Contact</i-nav-item>
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
                <i-nav-item :to="{ name: 'docs-components-sidebar' }">Home</i-nav-item>
                <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
                <i-nav-item :to="{ name: 'index' }">Contact</i-nav-item>
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
                <i-nav-item :to="{ name: 'docs-components-sidebar' }">Home</i-nav-item>
                <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
                <i-nav-item :to="{ name: 'index' }">Contact</i-nav-item>
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

### Dropdown
You can use an `<i-dropdown>` component inside the `<i-sidebar-items>` or `<i-nav>` component to create a contextual sidebar menu. 

<i-code-preview title="Sidebar Dropdown" link="https://github.com/inkline/inkline/tree/master/src/components/Sidebar" style="z-index: 2;">

<i-sidebar>
</i-sidebar>

<template slot="html">

~~~html
<i-sidebar>
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'contact' }">Contact</i-nav-item>
        </i-nav>
        <i-nav>
            <i-dropdown placement="bottom-end">
                <i-button variant="primary">Dropdown</i-button>
                <i-dropdown-menu>
                    <i-dropdown-item href>Action</i-dropdown-item>
                    <i-dropdown-item href>Another action</i-dropdown-item>
                    <i-dropdown-item href disabled>Something disabled here</i-dropdown-item>
                    <i-dropdown-divider />
                    <i-dropdown-item>Separated item</i-dropdown-item>
                </i-dropdown-menu>
            </i-dropdown>
        </i-nav>
    </i-sidebar-items>
</i-sidebar>
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

### Nav Placement
You can position the `<i-nav>` component to the `start`, `end`, or `center` of the `<i-sidebar-items>` component using flexbox utilities.

<i-code-preview title="Sidebar Nav Placement" link="https://github.com/inkline/inkline/tree/master/src/components/Sidebar">

<i-sidebar class="_margin-bottom-1">
</i-sidebar>

<template slot="html">

~~~html

<i-sidebar>
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items class="_justify-content-start">
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'contact' }">Contact</i-nav-item>
        </i-nav>
    </i-sidebar-items>
</i-sidebar>
~~~
~~~html
<i-sidebar>
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items class="_justify-content-center">
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'contact' }">Contact</i-nav-item>
        </i-nav>
    </i-sidebar-items>
</i-sidebar>
~~~
~~~html
<i-sidebar>
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items class="_justify-content-end">
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'contact' }">Contact</i-nav-item>
        </i-nav>
    </i-sidebar-items>
</i-sidebar>
~~~

</template>
</i-code-preview>


### Collapse Breakpoint
You can control what breakpoint your sidebar will collapse at using the `collapse` property. By default, the sidebar will collapse on the `md` screen size.

<i-code-preview title="Collapse Breakpoint Example" link="https://github.com/inkline/inkline/tree/master/src/components/Sidebar">

<i-sidebar collapse="lg">
</i-sidebar>

<template slot="html">

~~~html
<i-sidebar collapse="lg">
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
        </i-nav>
    </i-sidebar-items>
</i-sidebar>
~~~

</template>
</i-code-preview>

##### Always or Never Collapsed

Besides the breakpoint values, you can use a boolean value to set your sidebar to be always collapsed, or never collapsed.

Setting a `collapse` value of `true` will set the sidebar to be always collapsed.

<i-code-preview title="Always Collapsed Example" link="https://github.com/inkline/inkline/tree/master/src/components/Sidebar">

<i-sidebar :collapse="true">
</i-sidebar>

<template slot="html">

~~~html
<i-sidebar :collapse="true">
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
        </i-nav>
    </i-sidebar-items>
</i-sidebar>
~~~

</template>
</i-code-preview>

Setting a `collapse` value of `false` will set the sidebar to never collapse.

<i-code-preview title="Never Collapsed Example" link="https://github.com/inkline/inkline/tree/master/src/components/Sidebar">

<i-sidebar :collapse="false">
</i-sidebar>

<template slot="html">

~~~html
<i-sidebar :collapse="false">
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
        </i-nav>
    </i-sidebar-items>
</i-sidebar>
~~~

</template>
</i-code-preview>

##### Manual Collapse

Sometimes, it's necessary to control whether the Sidebar is collapsed or not programmatically. You can use the `v-model` directive to control whether the Sidebar should be collapsed or not.

<i-code-preview title="Manual Sidebar Collapse Example" link="https://github.com/inkline/inkline/tree/master/src/components/Sidebar">

<i-button v-on:click="collapsed = !collapsed">
    Toggle Collapsed
</i-button>
</i-sidebar>

<template slot="html">

~~~html
<i-button @click="collapsed = !collapsed">Toggle Collapsed</i-button>

<i-sidebar :collapse="true">
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
        </i-nav>
    </i-sidebar-items>
</i-sidebar>
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
                    <td><code>String</code></td>
                    <td><code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code></td>
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
                    <td>fluid</td>
                    <td>Sets the <code>IContainer</code> wrapping the sidebars's content as fluid.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
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

<i-api-preview title="Sidebar Brand API" markup="i-sidebar-brand" default-active="slots" expanded link="https://github.com/inkline/inkline/tree/master/src/components/SidebarBrand">
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
                    <td>Slot for sidebar brand component default content.</td>
                </tr>
            </tbody>
        </i-table>
    </template>
</i-api-preview>

<i-api-preview title="Sidebar Items API" markup="i-sidebar-items" default-active="slots" expanded link="https://github.com/inkline/inkline/tree/master/src/components/SidebarItems">
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
                    <td>Slot for sidebar items component default content.</td>
                </tr>
            </tbody>
        </i-table>
    </template>
</i-api-preview>
