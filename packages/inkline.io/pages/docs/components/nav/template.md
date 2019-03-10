# Nav
Navs are basic navigation components that provide alignment and spacing between items.{.lead}

### Example
Navigation components make use of the base `<i-nav>` component for building all types of navigation styles. 

<i-code-preview title="Nav Example" link="https://github.com/inkline/inkline/tree/master/src/components/Nav">

<i-nav>
    <i-nav-item href="http://inkline.io">Link</i-nav-item>
    <i-nav-item :to="{ name: 'index' }">Router Link</i-nav-item>
    <i-nav-item>Item</i-nav-item>
    <i-nav-item disabled>Disabled</i-nav-item>
</i-nav>

<template slot="html">

~~~html
<i-nav>
    <i-nav-item href="http://inkline.io">Link</i-nav-item>
    <i-nav-item :to="{ name: 'index' }">Router Link</i-nav-item>
    <i-nav-item>Item</i-nav-item>
    <i-nav-item disabled>Disabled</i-nav-item>
</i-nav>
~~~

</template>
</i-code-preview>

Behind the scenes, the `<i-nav-item>` is converted into a `<router-link>` if it has the `:to` property, or a plain `<a>` tag if it has a `href` property. Otherwise, it uses a simple `<div>` tag.

### Vertical
You can stack nav items into a vertical navigation component by setting the `vertical` property on your `<i-nav>`.

<i-code-preview title="Vertical Nav" link="https://github.com/inkline/inkline/tree/master/src/components/Nav">

<i-nav vertical>
    <i-nav-item href="http://inkline.io">Link</i-nav-item>
    <i-nav-item :to="{ name: 'index' }">Router Link</i-nav-item>
    <i-nav-item>Item</i-nav-item>
    <i-nav-item disabled>Disabled</i-nav-item>
</i-nav>

<template slot="html">

~~~html
<i-nav vertical>
    <i-nav-item href="http://inkline.io">Link</i-nav-item>
    <i-nav-item :to="{ name: 'index' }">Router Link</i-nav-item>
    <i-nav-item>Item</i-nav-item>
    <i-nav-item disabled>Disabled</i-nav-item>
</i-nav>
~~~

</template>
</i-code-preview>

### Sizes
You're able to use the `size` modifier to control the size of your navs, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`.

<i-code-preview title="Nav Sizes" link="https://github.com/inkline/inkline/tree/master/src/components/Nav">

<div>
<i-nav size="sm">
    <i-nav-item href="http://inkline.io">Link</i-nav-item>
    <i-nav-item :to="{ name: 'index' }">Router Link</i-nav-item>
    <i-nav-item>Item</i-nav-item>
    <i-nav-item disabled>Disabled</i-nav-item>
</i-nav>&nbsp;

<i-nav size="md">
    <i-nav-item href="http://inkline.io">Link</i-nav-item>
    <i-nav-item :to="{ name: 'index' }">Router Link</i-nav-item>
    <i-nav-item>Item</i-nav-item>
    <i-nav-item disabled>Disabled</i-nav-item>
</i-nav>&nbsp;

<i-nav size="lg">
    <i-nav-item href="http://inkline.io">Link</i-nav-item>
    <i-nav-item :to="{ name: 'index' }">Router Link</i-nav-item>
    <i-nav-item>Item</i-nav-item>
    <i-nav-item disabled>Disabled</i-nav-item>
</i-nav>
</div>

<template slot="html">

~~~html
<i-nav size="sm">
    <i-nav-item href="http://inkline.io">Link</i-nav-item>
    <i-nav-item :to="{ name: 'index' }">Router Link</i-nav-item>
    <i-nav-item>Item</i-nav-item>
    <i-nav-item disabled>Disabled</i-nav-item>
</i-nav>
~~~
~~~html
<i-nav size="md">
    <i-nav-item href="http://inkline.io">Link</i-nav-item>
    <i-nav-item :to="{ name: 'index' }">Router Link</i-nav-item>
    <i-nav-item>Item</i-nav-item>
    <i-nav-item disabled>Disabled</i-nav-item>
</i-nav>
~~~
~~~html
<i-nav size="lg">
    <i-nav-item href="http://inkline.io">Link</i-nav-item>
    <i-nav-item :to="{ name: 'index' }">Router Link</i-nav-item>
    <i-nav-item>Item</i-nav-item>
    <i-nav-item disabled>Disabled</i-nav-item>
</i-nav>
~~~

</template>
</i-code-preview>


### Active State
You can control the active state of your `<i-nav-item>` using the `active` property. If you're providing a `:to` property, converting it into a `router-link`, you can use the `active-class` and `exact-active-class` properties and set them to `-active`.

<i-code-preview title="Nav Active State" link="https://github.com/inkline/inkline/tree/master/src/components/Nav">

<div>
<i-nav>
    <i-nav-item :to="{ name: 'docs-components-nav' }" exact-active-class="-active">Active Router Link</i-nav-item>
    <i-nav-item :to="{ name: 'index' }" active>Active Link</i-nav-item>
</i-nav>
</div>

<template slot="html">

~~~html
<i-nav>
    <i-nav-item :to="{ name: 'docs-components-nav' }" exact-active-class="-active">Active Router Link</i-nav-item>
    <i-nav-item :to="{ name: 'index' }" active>Active Link</i-nav-item>
</i-nav>
~~~

</template>
</i-code-preview>



### API

<i-api-preview title="Nav API" expanded markup="i-nav" link="https://github.com/inkline/inkline/tree/master/src/components/Nav">
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
                    <td>size</td>
                    <td>Sets the size of the nav component.</td>
                    <td><code>String</code></td>
                    <td><code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>md</code></td>
                </tr>
                <tr>
                    <td>vertical</td>
                    <td>Sets the nav to be laid out vertically.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
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
                    <td>Slot for nav default content.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>

<i-api-preview title="Nav Item API" markup="i-nav-item" expanded link="https://github.com/inkline/inkline/tree/master/src/components/NavItem">
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
                    <td>active</td>
                    <td>Sets the nav item state as active.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>disabled</td>
                    <td>Sets the nav item state as disabled.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>tag</td>
                    <td>Sets the tag to be used for the component. If <code>to</code> or <code>href</code> attribute is provided, an <code>a</code> tag will be used.</td>
                    <td><code>String</code></td>
                    <td></td>
                    <td><code>div</code></td>
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
                    <td>Slot for nav item default content.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>
