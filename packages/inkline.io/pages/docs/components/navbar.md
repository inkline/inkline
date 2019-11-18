# Navbar
## A responsive navigation header that includes support for branding, navigation, forms and more.{.lead}

### Example
Here’s an example of the basic components included in a  `<i-navbar>` that automatically collapses responsively.

<i-code-preview title="Navbar Example" link="https://github.com/inkline/inkline/tree/master/src/components/Navbar">

<i-navbar>
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
        </i-nav>
        <i-nav>
            <i-input class="item" placeholder="Type something..">
                <i-button variant="primary" slot="append">
                    <font-awesome-icon icon="search" />
                </i-button>
            </i-input>
        </i-nav>
    </i-navbar-items>
</i-navbar>

<template slot="html">

~~~html
<i-navbar>
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
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
    </i-navbar-items>
</i-navbar>
~~~

</template>
</i-code-preview>

### Sizes
You're able to use the `size` modifier to control the size of your navbar, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<i-code-preview title="Navbar Sizes" link="https://github.com/inkline/inkline/tree/master/src/components/Navbar">

<i-navbar size="sm" class="_margin-bottom-1">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>

<i-navbar size="md" class="_margin-bottom-1">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>

<i-navbar size="lg">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>


<template slot="html">

~~~html
<i-navbar size="sm">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'contact' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
~~~
~~~html
<i-navbar size="md">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'contact' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
~~~
~~~html
<i-navbar size="lg">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'contact' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
~~~

</template>
</i-code-preview>

### Variants
Inkline includes two predefined navbar styles. You can set the style of a `<i-navbar>` using the `variant` property, which can have a value of `light` or `dark`. By default, modals use the `light` variant.

<i-code-preview title="Navbar Variants" link="https://github.com/inkline/inkline/tree/master/src/components/Navbar">

<i-navbar variant="light" class="_margin-bottom-1">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
<i-navbar variant="dark">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>

<template slot="html">

~~~html
<i-navbar variant="light">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'contact' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
~~~
~~~html
<i-navbar variant="dark">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'contact' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
~~~

</template>
</i-code-preview>

### Dropdown
You can use an `<i-dropdown>` component inside the `<i-navbar-items>` or `<i-nav>` component to create a contextual navbar menu. 

<i-code-preview title="Navbar Dropdown" link="https://github.com/inkline/inkline/tree/master/src/components/Navbar" style="z-index: 2;">

<i-navbar>
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
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
    </i-navbar-items>
</i-navbar>

<template slot="html">

~~~html
<i-navbar>
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
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
    </i-navbar-items>
</i-navbar>
~~~

</template>
</i-code-preview>

### Nav Placement
You can position the `<i-nav>` component to the `start`, `end`, or `center` of the `<i-navbar-items>` component using flexbox utilities.

<i-code-preview title="Navbar Nav Placement" link="https://github.com/inkline/inkline/tree/master/src/components/Navbar">

<i-navbar class="_margin-bottom-1">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items class="_justify-content-start">
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
<i-navbar class="_margin-bottom-1">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items class="_justify-content-center">
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
<i-navbar>
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items class="_justify-content-end">
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>

<template slot="html">

~~~html

<i-navbar>
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items class="_justify-content-start">
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'contact' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
~~~
~~~html
<i-navbar>
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items class="_justify-content-center">
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'contact' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
~~~
~~~html
<i-navbar>
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items class="_justify-content-end">
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'contact' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
~~~

</template>
</i-code-preview>


### Collapse Breakpoint
You can control what breakpoint your navbar will collapse at using the `collapse` property. By default, the navbar will collapse on the `md` screen size.

<i-code-preview title="Collapse Breakpoint Example" link="https://github.com/inkline/inkline/tree/master/src/components/Navbar">

<i-navbar collapse="lg">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>

<template slot="html">

~~~html
<i-navbar collapse="lg">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
~~~

</template>
</i-code-preview>

##### Always or Never Collapsible

Besides the breakpoint values, you can use a boolean value to set your navbar to be always collapsible, or never collapsible.

Setting a `collapse` value of `true` will set the navbar to be always collapsible.

<i-code-preview title="Always Collapsible Example" link="https://github.com/inkline/inkline/tree/master/src/components/Navbar">

<i-navbar :collapse="true">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>

<template slot="html">

~~~html
<i-navbar :collapse="true">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
~~~

</template>
</i-code-preview>

Setting a `collapse` value of `false` will set the navbar to never be collapsible.

<i-code-preview title="Never Collapsible Example" link="https://github.com/inkline/inkline/tree/master/src/components/Navbar">

<i-navbar :collapse="false">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>

<template slot="html">

~~~html
<i-navbar :collapse="false">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
~~~

</template>
</i-code-preview>

##### Manual Collapse

Sometimes, it's necessary to control whether the Navbar is collapsed or not programmatically. You can use the `v-model` directive to control whether the Navbar should be collapsed or not.

<i-code-preview title="Manual Navbar Collapse Example" link="https://github.com/inkline/inkline/tree/master/src/components/Navbar">

<i-button v-on:click="collapsed = !collapsed">
    Toggle Collapsed
</i-button>
<i-navbar :collapse="true" v-model="collapsed">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'index' }">About</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>

<template slot="html">

~~~html
<i-button @click="collapsed = !collapsed">Toggle Collapsed</i-button>

<i-navbar :collapse="true">
    <i-navbar-brand :to="{ name: 'index' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'index' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'about' }">About</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
~~~

</template>
</i-code-preview>


### API

<i-api-preview title="Navbar API" markup="i-navbar" expanded link="https://github.com/inkline/inkline/tree/master/src/components/Navbar">
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
                    <td>Specifies the breakpoint at which to collapse the navbar.</td>
                    <td><code>String</code>, <code>Boolean</code></td>
                    <td><code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, <code>true</code>, <code>false</code></td>
                    <td><code>md</code></td>
                </tr>
                <tr>
                    <td>collapseOnClick</td>
                    <td>Collapses the navbar when clicking a navbar item.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>true</code></td>
                </tr>
                <tr>
                    <td>fluid</td>
                    <td>Sets the <code>IContainer</code> wrapping the navbars's content as fluid.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>size</td>
                    <td>Sets the size of the navbar component.</td>
                    <td><code>String</code></td>
                    <td><code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>md</code></td>
                </tr>
                <tr>
                    <td>value</td>
                    <td>Provides a way to collapse the navbar programmatically. Should be used as part of <code>v-model</code> directive.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>variant</td>
                    <td>Sets the color variant of the navbar component.</td>
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
                    <td>Slot for navbar component default content.</td>
                </tr>
            </tbody>
        </i-table>
    </template>
</i-api-preview>

<i-api-preview title="Navbar Brand API" markup="i-navbar-brand" default-active="slots" expanded link="https://github.com/inkline/inkline/tree/master/src/components/NavbarBrand">
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
                    <td>Slot for navbar brand component default content.</td>
                </tr>
            </tbody>
        </i-table>
    </template>
</i-api-preview>

<i-api-preview title="Navbar Items API" markup="i-navbar-items" default-active="slots" expanded link="https://github.com/inkline/inkline/tree/master/src/components/NavbarItems">
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
                    <td>Slot for navbar items component default content.</td>
                </tr>
            </tbody>
        </i-table>
    </template>
</i-api-preview>
