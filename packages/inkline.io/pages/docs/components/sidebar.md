# Sidebar
## A responsive navigation sidebar that includes support for branding, navigation, forms and more.{.lead}

### Example
Here’s an example of the basic components included in a  `<i-sidebar>` that automatically collapses responsively.

<i-code-preview title="Sidebar Example" link="https://github.com/inkline/inkline/tree/master/src/components/Sidebar">

<div style="height: 400px">
    <i-layout vertical>
        <i-sidebar collapse-position="absolute">
            This is a sidebar
        </i-sidebar>
        <i-layout>
            <i-layout-content>
                Content
            </i-layout-content>
        </i-layout>
    </i-layout>
</div>

<template slot="html">

~~~html
<i-sidebar>
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
        </i-nav>
        <i-nav>
            <i-input class="item" placeholder="Type something..">
                <i-button variant="primary" slot="append">
                    <font-awesome-icon icon="search" />
                </i-button>
            </i-input>
        </i-nav>
    </i-sidebar-items>
</i-sidebar>
~~~

</template>
</i-code-preview>

### Sizes
You're able to use the `size` modifier to control the size of your sidebar, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<i-code-preview title="Sidebar Sizes" link="https://github.com/inkline/inkline/tree/master/src/components/Sidebar">

<i-sidebar size="sm" class="_margin-bottom-1">
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">Contact</i-nav-item>
        </i-nav>
    </i-sidebar-items>
</i-sidebar>

<i-sidebar size="md" class="_margin-bottom-1">
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">Contact</i-nav-item>
        </i-nav>
    </i-sidebar-items>
</i-sidebar>

<i-sidebar size="lg">
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">Contact</i-nav-item>
        </i-nav>
    </i-sidebar-items>
</i-sidebar>


<template slot="html">

~~~html
<i-sidebar size="sm">
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'contact' }">Contact</i-nav-item>
        </i-nav>
    </i-sidebar-items>
</i-sidebar>
~~~
~~~html
<i-sidebar size="md">
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'contact' }">Contact</i-nav-item>
        </i-nav>
    </i-sidebar-items>
</i-sidebar>
~~~
~~~html
<i-sidebar size="lg">
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items>
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

### Variants
Inkline includes two predefined sidebar styles. You can set the style of a `<i-sidebar>` using the `variant` property, which can have a value of `light` or `dark`. By default, modals use the `light` variant.

<i-code-preview title="Sidebar Variants" link="https://github.com/inkline/inkline/tree/master/src/components/Sidebar">

<i-sidebar variant="light" class="_margin-bottom-1">
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">Contact</i-nav-item>
        </i-nav>
    </i-sidebar-items>
</i-sidebar>
<i-sidebar variant="dark">
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">Contact</i-nav-item>
        </i-nav>
    </i-sidebar-items>
</i-sidebar>

<template slot="html">

~~~html
<i-sidebar variant="light">
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'contact' }">Contact</i-nav-item>
        </i-nav>
    </i-sidebar-items>
</i-sidebar>
~~~
~~~html
<i-sidebar variant="dark">
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items>
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

### Dropdown
You can use an `<i-dropdown>` component inside the `<i-sidebar-items>` or `<i-nav>` component to create a contextual sidebar menu. 

<i-code-preview title="Sidebar Dropdown" link="https://github.com/inkline/inkline/tree/master/src/components/Sidebar" style="z-index: 2;">

<i-sidebar>
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">Contact</i-nav-item>
        </i-nav>
        <i-nav>
            <i-dropdown placement="bottom-end">
                <i-nav-item>Dropdown</i-nav-item>
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
</i-code-preview>

### Nav Placement
You can position the `<i-nav>` component to the `start`, `end`, or `center` of the `<i-sidebar-items>` component using flexbox utilities.

<i-code-preview title="Sidebar Nav Placement" link="https://github.com/inkline/inkline/tree/master/src/components/Sidebar">

<i-sidebar class="_margin-bottom-1">
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items class="_justify-content-start">
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">Contact</i-nav-item>
        </i-nav>
    </i-sidebar-items>
</i-sidebar>
<i-sidebar class="_margin-bottom-1">
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items class="_justify-content-center">
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">Contact</i-nav-item>
        </i-nav>
    </i-sidebar-items>
</i-sidebar>
<i-sidebar>
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items class="_justify-content-end">
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">Contact</i-nav-item>
        </i-nav>
    </i-sidebar-items>
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
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
        </i-nav>
    </i-sidebar-items>
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
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
        </i-nav>
    </i-sidebar-items>
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
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
        </i-nav>
    </i-sidebar-items>
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
<i-sidebar :collapse="true" v-model="collapsed">
    <i-sidebar-brand :to="{ name: 'index' }">Sidebar</i-sidebar-brand>
    <i-sidebar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
        </i-nav>
    </i-sidebar-items>
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
