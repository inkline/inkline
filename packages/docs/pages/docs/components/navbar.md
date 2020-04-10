# Navbar
## A responsive navigation header that includes support for branding, navigation, forms and more.{.lead}

### Example
Here’s an example of the basic components included in a  `<i-navbar>` that automatically collapses responsively.

<i-code-preview title="Navbar Example">

<i-navbar>
    <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
            <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
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

<i-code-preview title="Navbar Sizes">

<i-navbar size="sm" class="_margin-bottom-1">
    <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
            <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
            <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>

<i-navbar size="md" class="_margin-bottom-1">
    <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
            <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
            <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>

<i-navbar size="lg">
    <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
            <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
            <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
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

<i-code-preview title="Navbar Variants">

<i-navbar variant="light" class="_margin-bottom-1">
    <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
            <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
            <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
<i-navbar variant="dark">
    <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
            <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
            <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
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

<i-code-preview title="Navbar Dropdown">

<i-navbar>
    <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
            <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
            <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
        </i-nav>
        <i-nav>
            <i-dropdown placement="bottom-end">
                <i-nav-item>Dropdown</i-nav-item>
                <i-dropdown-menu>
                    <i-dropdown-item href onclick="return false;">Action</i-dropdown-item>
                    <i-dropdown-item href onclick="return false;">Another action</i-dropdown-item>
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
                    <i-dropdown-item href="">Action</i-dropdown-item>
                    <i-dropdown-item href="">Another action</i-dropdown-item>
                    <i-dropdown-item href="" disabled>Something disabled here</i-dropdown-item>
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

<i-code-preview title="Navbar Nav Placement">

<i-navbar class="_margin-bottom-1">
    <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
    <i-navbar-items class="_justify-content-start">
        <i-nav>
            <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
            <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
            <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
<i-navbar class="_margin-bottom-1">
    <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
    <i-navbar-items class="_justify-content-center">
        <i-nav>
            <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
            <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
            <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>
<i-navbar>
    <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
    <i-navbar-items class="_justify-content-end">
        <i-nav>
            <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
            <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
            <i-nav-item href="https://inkline.io" onclick="return false;">Contact</i-nav-item>
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

<i-code-preview title="Collapse Breakpoint Example">

<i-navbar collapse="lg">
    <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
            <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
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

<i-code-preview title="Always Collapsible Example">

<i-navbar :collapse="true">
    <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
            <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
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

<i-code-preview title="Never Collapsible Example">

<i-navbar :collapse="false">
    <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
            <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
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

<i-code-preview title="Manual Navbar Collapse Example">

<i-button v-on:click="collapsed = !collapsed">
    Toggle Collapsed
</i-button>
<i-navbar :collapse="true" v-model="collapsed" :collapse-on-click-outside="false">
    <i-navbar-brand href="https://inkline.io" onclick="return false;">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item href="https://inkline.io" onclick="return false;">Home</i-nav-item>
            <i-nav-item href="https://inkline.io" onclick="return false;">About</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>

<template slot="html">

~~~html
<i-button @click="collapsed = !collapsed">Toggle Collapsed</i-button>

<i-navbar :collapse="true" v-model="collapsed" :collapse-on-click-outside="false">
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

<i-api-preview title="Navbar API" markup="i-navbar" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/Navbar">
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">collapse</template>
                <template slot="description">Specifies the breakpoint at which to collapse the navbar.</template>
                <template slot="type"><code>String</code>, <code>Boolean</code></template>
                <template slot="values"><code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, <code>true</code>, <code>false</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">collapse-on-click</template>
                <template slot="description">Toggles collapsing the navbar when clicking a navbar item if collapsed.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>true</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">collapse-on-click-outside</template>
                <template slot="description">Toggles collapsing the navbar when clicking outside the navbar if collapsed.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>true</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">fluid</template>
                <template slot="description">Sets the <code>IContainer</code> wrapping the navbars's content as fluid.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the navbar component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">value</template>
                <template slot="description">Provides a way to collapse the navbar programmatically. Should be used as part of <code>v-model</code> directive.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">variant</template>
                <template slot="description">Sets the color variant of the navbar component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>light</code>, <code>dark</code></template>
                <template slot="default"><code>light</code></template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for navbar component default content.</template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>

<i-api-preview title="Navbar Brand API" markup="i-navbar-brand" default-active="slots" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/NavbarBrand">
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for navbar brand component default content.</template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>

<i-api-preview title="Navbar Items API" markup="i-navbar-items" default-active="slots" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/NavbarItems">
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for navbar items component default content.</template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>
