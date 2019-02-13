# Navbar
A responsive navigation header that includes support for branding, navigation, forms and more.{.lead}

### Example
Here’s an example of the basic components included in a  `<i-navbar>` that automatically collapses responsively.

<i-code-preview title="Navbar Example" link="https://github.com/inkline/inkline/tree/master/src/components/Navbar">

<i-navbar>
    <i-navbar-brand :to="{ name: 'docs.components.navbar' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">Contact</i-nav-item>
        </i-nav>
        <i-nav>
            <i-input placeholder="Type something.." class="_margin-right-1" />
            <i-button variant="primary">Search</i-button>
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
            <i-input placeholder="Type something.." class="_margin-right-1" />
            <i-button variant="primary">Search</i-button>
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
    <i-navbar-brand :to="{ name: 'docs.components.navbar' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>

<i-navbar size="md" class="_margin-bottom-1">
    <i-navbar-brand :to="{ name: 'docs.components.navbar' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>

<i-navbar size="lg">
    <i-navbar-brand :to="{ name: 'docs.components.navbar' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">Contact</i-nav-item>
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
    <i-navbar-brand :to="{ name: 'docs.components.navbar' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>

<i-navbar variant="dark">
    <i-navbar-brand :to="{ name: 'docs.components.navbar' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">Contact</i-nav-item>
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

<i-code-preview title="Navbar Dropdown" link="https://github.com/inkline/inkline/tree/master/src/components/Navbar">

<i-navbar>
    <i-navbar-brand :to="{ name: 'docs.components.navbar' }">Navbar</i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">Contact</i-nav-item>
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
    <i-navbar-brand :to="{ name: 'docs.components.navbar' }">Navbar</i-navbar-brand>
    <i-navbar-items class="_justify-content-start">
        <i-nav>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>


<i-navbar class="_margin-bottom-1">
    <i-navbar-brand :to="{ name: 'docs.components.navbar' }">Navbar</i-navbar-brand>
    <i-navbar-items class="_justify-content-center">
        <i-nav>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">Contact</i-nav-item>
        </i-nav>
    </i-navbar-items>
</i-navbar>

<i-navbar>
    <i-navbar-brand :to="{ name: 'docs.components.navbar' }">Navbar</i-navbar-brand>
    <i-navbar-items class="_justify-content-end">
        <i-nav>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">Home</i-nav-item>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">About</i-nav-item>
            <i-nav-item :to="{ name: 'docs.components.navbar' }">Contact</i-nav-item>
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


### API

<i-api-preview title="Navbar API" markup="i-navbar" expanded link="https://github.com/inkline/inkline/tree/master/src/components/Navbar">
    <template slot="props">
        <table class="table -bordered">
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
                    <td>fluid</td>
                    <td>Sets the <code>IContainer</code> wrapping the navbar component's content as fluid.</td>
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
                    <td>variant</td>
                    <td>Sets the color variant of the navbar component.</td>
                    <td><code>String</code></td>
                    <td><code>light</code>, <code>dark</code></td>
                    <td><code>light</code></td>
                </tr>
            </tbody>
        </table>
    </template>
    <template slot="slots">
        <table class="table -bordered _margin-bottom-0">
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
        </table>
    </template>
</i-api-preview>

<i-api-preview title="Navbar Brand API" markup="i-navbar-brand" default-active="slots" expanded link="https://github.com/inkline/inkline/tree/master/src/components/NavbarBrand">
    <template slot="slots">
        <table class="table -bordered _margin-bottom-0">
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
        </table>
    </template>
</i-api-preview>

<i-api-preview title="Navbar Items API" markup="i-navbar-items" default-active="slots" expanded link="https://github.com/inkline/inkline/tree/master/src/components/NavbarItems">
    <template slot="slots">
        <table class="table -bordered _margin-bottom-0">
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
        </table>
    </template>
</i-api-preview>
