# Dropdown
Dropdowns are contextual overlays toggled through clicking or hovering, used for displaying a list of links.{.lead}

### Example
Wrap both the dropdown's trigger element (such as an `<i-button>`) and the `<i-dropdown-menu>` inside a `<i-dropdown>` component. The dropdown component will always choose the first child element as a trigger and the last child element as the defined dropdown menu.

<i-code-preview title="Dropdown Example" link="https://github.com/inkline/inkline/tree/master/src/components/Dropdown" class="_padding-bottom-0">

<i-dropdown>
    <i-button>Dropdown</i-button>
    <i-dropdown-menu>
        <i-dropdown-item href>Action</i-dropdown-item>
        <i-dropdown-item href>Another action</i-dropdown-item>
        <i-dropdown-item href disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>

<template slot="html">

~~~html
<i-dropdown>
    <i-button>Dropdown</i-button>
    <i-dropdown-menu>
        <i-dropdown-item href="">Action</i-dropdown-item>
        <i-dropdown-item :to="{ name: 'home' }">Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>
~~~

</template>
</i-code-preview>

### Placement
Trigger dropdown menus at the `top`, `bottom`, `left` or `right` of elements by adding the `placement` property to the parent `<i-dropdown>` element. 

Each of the positions also has a `-start` or `-end` variant (`top-start`, `top-end`, `bottom-start`, `bottom-end`, etc.) that sets the dropdown to the start or end of the placement instead of centering it. 

<i-code-preview title="Dropdown Placement" link="https://github.com/inkline/inkline/tree/master/src/components/Dropdown" class="_padding-bottom-0">

<div>
<i-dropdown placement="top">
    <i-button>Dropdown Top</i-button>
    <i-dropdown-menu>
        <i-dropdown-item href>Action</i-dropdown-item>
        <i-dropdown-item href>Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>&nbsp;

<i-dropdown placement="bottom">
    <i-button>Dropdown Bottom</i-button>
    <i-dropdown-menu>
        <i-dropdown-item href>Action</i-dropdown-item>
        <i-dropdown-item href>Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>&nbsp;

<i-dropdown placement="left">
    <i-button>Dropdown Left</i-button>
    <i-dropdown-menu>
        <i-dropdown-item href>Action</i-dropdown-item>
        <i-dropdown-item href>Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>&nbsp;

<i-dropdown placement="right">
    <i-button>Dropdown Right</i-button>
    <i-dropdown-menu>
        <i-dropdown-item href>Action</i-dropdown-item>
        <i-dropdown-item href>Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>
</div>

<template slot="html">

~~~html
<i-dropdown placement="top">
    <i-button>Dropdown</i-button>
    <i-dropdown-menu>
        <i-dropdown-item href="">Action</i-dropdown-item>
        <i-dropdown-item :to="{ name: 'home' }">Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>
~~~
~~~html
<i-dropdown placement="bottom">
    <i-button>Dropdown</i-button>
    <i-dropdown-menu>
        <i-dropdown-item href="">Action</i-dropdown-item>
        <i-dropdown-item :to="{ name: 'home' }">Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>
~~~
~~~html
<i-dropdown placement="left">
    <i-button>Dropdown</i-button>
    <i-dropdown-menu>
        <i-dropdown-item href="">Action</i-dropdown-item>
        <i-dropdown-item :to="{ name: 'home' }">Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>
~~~
~~~html
<i-dropdown placement="right">
    <i-button>Dropdown</i-button>
    <i-dropdown-menu>
        <i-dropdown-item href="">Action</i-dropdown-item>
        <i-dropdown-item :to="{ name: 'home' }">Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>
~~~

</template>
</i-code-preview>

### Freeform Dropdown
You're not required to use any dropdown-specific components inside of `<i-dropdown-menu>`. You can add your own HTML markup without any issues. You might need additional size styles to constrain the content width

<i-code-preview title="Freeform Dropdown" link="https://github.com/inkline/inkline/tree/master/src/components/Dropdown" class="_padding-bottom-0">

<i-dropdown>
    <i-button>Dropdown</i-button>
    <i-dropdown-menu>
        <div class="_padding-1">This is a freeform dropdown example.</div>
    </i-dropdown-menu>
</i-dropdown>&nbsp;

<template slot="html">

~~~html
<i-dropdown>
    <i-button>Dropdown</i-button>
    <i-dropdown-menu>
        <div class="_padding-1">This is a freeform dropdown example.</div>
    </i-dropdown-menu>
</i-dropdown>
~~~

</template>
</i-code-preview>

### Trigger type
You can use the `trigger` property to trigger the dropdown on `hover` or `click`. By default, dropdowns are triggered on `click`, a design decision made to improve user experience.

<i-code-preview title="Dropdown Trigger" link="https://github.com/inkline/inkline/tree/master/src/components/Dropdown" class="_padding-bottom-0">

<i-dropdown trigger="click">
    <i-button>Dropdown Click</i-button>
    <i-dropdown-menu>
        <i-dropdown-item href>Action</i-dropdown-item>
        <i-dropdown-item href>Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>&nbsp;

<i-dropdown trigger="hover">
    <i-button>Dropdown Hover</i-button>
    <i-dropdown-menu>
        <i-dropdown-item href>Action</i-dropdown-item>
        <i-dropdown-item href>Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>&nbsp;

<template slot="html">

~~~html
<i-dropdown trigger="click">
    <i-button>Dropdown Click</i-button>
    <i-dropdown-menu>
        <i-dropdown-item href="">Action</i-dropdown-item>
        <i-dropdown-item :to="{ name: 'home' }">Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>
~~~
~~~html
<i-dropdown trigger="hover">
    <i-button>Dropdown Hover</i-button>
    <i-dropdown-menu>
        <i-dropdown-item href="">Action</i-dropdown-item>
        <i-dropdown-item :to="{ name: 'home' }">Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>
~~~

</template>
</i-code-preview>

### Sizes
You're able to use the `size` modifier to control the size of your dropdown menus, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<i-code-preview title="Dropdown Sizes" link="https://github.com/inkline/inkline/tree/master/src/components/Dropdown" class="_padding-bottom-0">

<div>
<i-dropdown>
    <i-button>Dropdown Small</i-button>
    <i-dropdown-menu size="sm">
        <i-dropdown-item href>Action</i-dropdown-item>
        <i-dropdown-item href>Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>&nbsp;

<i-dropdown>
    <i-button>Dropdown Medium</i-button>
    <i-dropdown-menu size="md">
        <i-dropdown-item href>Action</i-dropdown-item>
        <i-dropdown-item href>Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>&nbsp;

<i-dropdown>
    <i-button>Dropdown Large</i-button>
    <i-dropdown-menu size="lg">
        <i-dropdown-item href>Action</i-dropdown-item>
        <i-dropdown-item href>Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>
</div>

<template slot="html">

~~~html
<i-dropdown>
    <i-button>Dropdown Small</i-button>
    <i-dropdown-menu size="sm">
        <i-dropdown-item href>Action</i-dropdown-item>
        <i-dropdown-item href>Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>
~~~
~~~html
<i-dropdown>
    <i-button>Dropdown Medium</i-button>
    <i-dropdown-menu size="md">
        <i-dropdown-item href>Action</i-dropdown-item>
        <i-dropdown-item href>Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>
~~~
~~~html
<i-dropdown>
    <i-button>Dropdown Large</i-button>
    <i-dropdown-menu size="lg">
        <i-dropdown-item href>Action</i-dropdown-item>
        <i-dropdown-item href>Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>
~~~

</template>
</i-code-preview>


### Variants
Inkline includes two predefined dropdown styles, each serving its own semantic purpose. You can set the style of a `<i-dropdown-menu>` using the `variant` property, which can have a value of `light` or `dark`. By default, dropdown menus use the `light` variant.

<i-code-preview title="Dropdown Variants" link="https://github.com/inkline/inkline/tree/master/src/components/Dropdown" class="_padding-bottom-0">

<div>
<i-dropdown>
    <i-button variant="light">Dropdown Light</i-button>
    <i-dropdown-menu variant="light">
        <i-dropdown-item href>Action</i-dropdown-item>
        <i-dropdown-item href>Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>&nbsp;

<i-dropdown>
    <i-button variant="dark">Dropdown Dark</i-button>
    <i-dropdown-menu variant="dark">
        <i-dropdown-item href>Action</i-dropdown-item>
        <i-dropdown-item href>Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>
</div>

<template slot="html">

~~~html
<i-dropdown>
    <i-button variant="light">Dropdown Light</i-button>
    <i-dropdown-menu variant="light">
        <i-dropdown-item href>Action</i-dropdown-item>
        <i-dropdown-item href>Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>
~~~

~~~html
<i-dropdown>
    <i-button variant="dark">Dropdown Dark</i-button>
    <i-dropdown-menu variant="dark">
        <i-dropdown-item href>Action</i-dropdown-item>
        <i-dropdown-item href>Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>
~~~

</template>
</i-code-preview>


### Recursive Dropdowns
Inkline allows you to have virtually infinite recursive dropdown submenus structure by defining another `<i-dropdown>` inside of a `<i-dropdown-menu>`. This awesome feature gives you great design flexibility.

<i-code-preview title="Recursive Dropdown" link="https://github.com/inkline/inkline/tree/master/src/components/Dropdown" class="_padding-bottom-0">

<div>
<i-dropdown :hide-on-click="false">
    <i-button>Recursive Dropdown</i-button>
    <i-dropdown-menu>
        <i-dropdown placement="right-start">
            <i-dropdown-item>Dropdown here</i-dropdown-item>
            <i-dropdown-menu>
                <i-dropdown-item href>Action</i-dropdown-item>
                <i-dropdown-item href>Another action</i-dropdown-item>
                <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
                <i-dropdown-divider />
                <i-dropdown-item>Separated item</i-dropdown-item>
            </i-dropdown-menu>
        </i-dropdown>
        <i-dropdown-divider />
        <i-dropdown-item href>Some action</i-dropdown-item>
        <i-dropdown-item disabled>Something else here</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>
</div>

<template slot="html">

~~~html
<i-dropdown :hide-on-click="false">
    <i-button>Dropdown</i-button>
    <i-dropdown-menu>
        <i-dropdown placement="right-start">
            <i-dropdown-item href>Dropdown here</i-dropdown-item>
            <i-dropdown-menu>
                <i-dropdown-item href>Action</i-dropdown-item>
                <i-dropdown-item href>Another action</i-dropdown-item>
                <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
                <i-dropdown-divider />
                <i-dropdown-item>Separated item</i-dropdown-item>
            </i-dropdown-menu>
        </i-dropdown>
        <i-dropdown-divider />
        <i-dropdown-item href>Some action</i-dropdown-item>
        <i-dropdown-item disabled>Something else here</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>
~~~

</template>
</i-code-preview>


### API

<i-api-preview title="Dropdown API" expanded markup="i-dropdown" link="https://github.com/inkline/inkline/tree/master/src/components/Dropdown">
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
                    <td>disabled</td>
                    <td>Sets the dropdown state as disabled.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>hideOnClick</td>
                    <td>Determines whether to hide the dropdown when clicking it.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>id</td>
                    <td>Sets the identifier of the dropdown.</td>
                    <td><code>String</code></td>
                    <td></td>
                    <td><code>dropdown-&lt;uid&gt;</code></td>
                </tr>
                <tr>
                    <td>keymap</td>
                    <td>Sets the keymap of the dropdown component.</td>
                    <td><code>Object</code></td>
                    <td></td>
                    <td><code>{ navigate: ['up', 'down'], select: ['enter', 'space'], show: ['enter', 'space'], hide: ['esc', 'tab'] }</code></td>
                </tr>
                <tr>
                    <td>placement</td>
                    <td>Sets the placement of the dropdown.</td>
                    <td><code>String</code></td>
                    <td>
                        <code>top</code>, 
                        <code>top-start</code>,
                        <code>top-end</code>,
                        <code>bottom</code>, 
                        <code>bottom-start</code>,
                        <code>bottom-end</code>,
                        <code>left</code>, 
                        <code>left-start</code>,
                        <code>left-end</code>,
                        <code>right</code>, 
                        <code>right-start</code>,
                        <code>right-end</code>
                    </td>
                    <td><code>bottom</code></td>
                </tr>
                <tr>
                    <td>variant</td>
                    <td>Sets the color variant of the collapsible component.</td>
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
                    <td>Slot for dropdown component trigger and dropdown menu. The first direct child represents the trigger, the second direct child represents the dropdown menu.</td>
                </tr>
            </tbody>
        </table>
    </template>
    <template slot="events">
        <table class="table -bordered _margin-bottom-0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Prototype</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>action</td>
                    <td>Emitted when dropdown item with action is clicked.</td>
                    <td><code>(action: String | Number | Boolean, instance: VueComponent) => {}</code></td>
                </tr>
                <tr>
                    <td>change</td>
                    <td>Emitted when visibility changes.</td>
                    <td><code>(visible: Boolean) => {}</code></td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>

<i-api-preview title="Dropdown Menu API" markup="i-dropdown-menu" expanded link="https://github.com/inkline/inkline/tree/master/src/components/DropdownMenu">
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
                    <td>arrow</td>
                    <td>Sets whether to attach an arrow to the dropdown menu.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>true</code></td>
                </tr>
                <tr>
                    <td>transformOrigin</td>
                    <td>Sets the transform origin of the dropdown menu.</td>
                    <td>
                        <code>Boolean</code>, 
                        <code>String</code> 
                    </td>
                    <td></td>
                    <td><code>true</code></td>
                </tr>
                <tr>
                    <td>popperOptions</td>
                    <td>Sets custom options for the Popper.js plugin.</td>
                    <td><code>Object</code></td>
                    <td></td>
                    <td></td>
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
                    <td>Slot for dropdown menu default content.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>

<i-api-preview title="Dropdown Item API" markup="i-dropdown-item" expanded link="https://github.com/inkline/inkline/tree/master/src/components/DropdownItem">
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
                    <td>action</td>
                    <td>Set an action to be emitted by the <code>IDropdown</code> parent when the dropdown item is clicked.</td>
                    <td>
                        <code>String</code>, 
                        <code>Number</code>, 
                        <code>Boolean</code> 
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>disabled</td>
                    <td>Set the state of the dropdown item component as disabled.</td>
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
                    <td>Slot for dropdown item default content.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>
