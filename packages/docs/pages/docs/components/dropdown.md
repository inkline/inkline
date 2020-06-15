# Dropdown
## Dropdowns are contextual overlays toggled through clicking or hovering, used for displaying a list of links.{.lead}

### Example
Wrap both the dropdown's trigger element (such as an `<i-button>`) and the `<i-dropdown-menu>` inside a `<i-dropdown>` component. The dropdown component will always choose the first child element as a trigger and the last child element as the defined dropdown menu.

<i-code-preview title="Dropdown Example">

<i-dropdown>
    <i-button>Dropdown <i-icon icon="caret-down" class="_margin-left-1-2" /></i-button>
    <i-dropdown-menu>
        <i-dropdown-item href onclick="return false;">Action</i-dropdown-item>
        <i-dropdown-item href onclick="return false;">Another action</i-dropdown-item>
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

<i-code-preview title="Dropdown Placement">

<div>
<i-dropdown placement="top">
    <i-button>Dropdown Top <i-icon icon="caret-up" class="_margin-left-1-2" /></i-button>
    <i-dropdown-menu>
        <i-dropdown-item href onclick="return false;">Action</i-dropdown-item>
        <i-dropdown-item href onclick="return false;">Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>&nbsp;

<i-dropdown placement="bottom">
    <i-button>Dropdown Bottom <i-icon icon="caret-down" class="_margin-left-1-2" /></i-button>
    <i-dropdown-menu>
        <i-dropdown-item href onclick="return false;">Action</i-dropdown-item>
        <i-dropdown-item href onclick="return false;">Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>&nbsp;

<i-dropdown placement="left">
    <i-button>Dropdown Left <i-icon icon="caret-left" class="_margin-right-1-2" /></i-button>
    <i-dropdown-menu>
        <i-dropdown-item href onclick="return false;">Action</i-dropdown-item>
        <i-dropdown-item href onclick="return false;">Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>&nbsp;

<i-dropdown placement="right">
    <i-button>Dropdown Right <i-icon icon="caret-right" class="_margin-left-1-2" /></i-button>
    <i-dropdown-menu>
        <i-dropdown-item href onclick="return false;">Action</i-dropdown-item>
        <i-dropdown-item href onclick="return false;">Another action</i-dropdown-item>
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

<i-code-preview title="Freeform Dropdown">

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

<i-code-preview title="Dropdown Trigger">

<i-dropdown trigger="click">
    <i-button>Dropdown Click</i-button>
    <i-dropdown-menu>
        <i-dropdown-item href onclick="return false;">Action</i-dropdown-item>
        <i-dropdown-item href onclick="return false;">Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>&nbsp;

<i-dropdown trigger="hover">
    <i-button>Hover Dropdown</i-button>
    <i-dropdown-menu>
        <i-dropdown-item href onclick="return false;">Action</i-dropdown-item>
        <i-dropdown-item href onclick="return false;">Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>&nbsp;


<i-dropdown trigger="focus">
    <i-button>Focus Dropdown</i-button>
    <i-dropdown-menu>
        <i-dropdown-item href onclick="return false;">Action</i-dropdown-item>
        <i-dropdown-item href onclick="return false;">Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>&nbsp;

<i-dropdown :trigger="['focus', 'hover']">
    <i-button>Multiple Events Dropdown</i-button>
    <i-dropdown-menu>
        <i-dropdown-item href onclick="return false;">Action</i-dropdown-item>
        <i-dropdown-item href onclick="return false;">Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>&nbsp;

<i-dropdown trigger="manual">
    <i-button @click="manualDropdown = !manualDropdown">Manual Dropdown</i-button>
    <i-dropdown-menu v-model="manualDropdown">
        <i-dropdown-item href onclick="return false;">Action</i-dropdown-item>
        <i-dropdown-item href onclick="return false;">Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>&nbsp;

<template slot="html">

~~~html
<i-dropdown trigger="click">
    <i-button>Click Dropdown</i-button>
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
    <i-button>Hover Dropdown</i-button>
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
<i-dropdown trigger="focus">
    <i-button>Focus Dropdown</i-button>
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
<i-dropdown :trigger="['focus', 'hover']">
    <i-button>Multiple Events Dropdown</i-button>
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
<i-dropdown trigger="manual">
    <i-button @click="visible = !visible">Manual Dropdown</i-button>
    <i-dropdown-menu v-model="visible">
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

<i-code-preview title="Dropdown Sizes">

<div>
<i-dropdown>
    <i-button>Dropdown Small</i-button>
    <i-dropdown-menu size="sm">
        <i-dropdown-item href onclick="return false;">Action</i-dropdown-item>
        <i-dropdown-item href onclick="return false;">Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>&nbsp;

<i-dropdown>
    <i-button>Dropdown Medium</i-button>
    <i-dropdown-menu size="md">
        <i-dropdown-item href onclick="return false;">Action</i-dropdown-item>
        <i-dropdown-item href onclick="return false;">Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>&nbsp;

<i-dropdown>
    <i-button>Dropdown Large</i-button>
    <i-dropdown-menu size="lg">
        <i-dropdown-item href onclick="return false;">Action</i-dropdown-item>
        <i-dropdown-item href onclick="return false;">Another action</i-dropdown-item>
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
        <i-dropdown-item href="">Action</i-dropdown-item>
        <i-dropdown-item href="">Another action</i-dropdown-item>
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
        <i-dropdown-item href="">Action</i-dropdown-item>
        <i-dropdown-item href="">Another action</i-dropdown-item>
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
        <i-dropdown-item href="">Action</i-dropdown-item>
        <i-dropdown-item href="">Another action</i-dropdown-item>
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

<i-code-preview title="Dropdown Variants">

<div>
<i-dropdown>
    <i-button variant="light">Dropdown Light</i-button>
    <i-dropdown-menu variant="light">
        <i-dropdown-item href onclick="return false;">Action</i-dropdown-item>
        <i-dropdown-item href onclick="return false;">Another action</i-dropdown-item>
        <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
        <i-dropdown-divider />
        <i-dropdown-item>Separated item</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>&nbsp;

<i-dropdown>
    <i-button variant="dark">Dropdown Dark</i-button>
    <i-dropdown-menu variant="dark">
        <i-dropdown-item href onclick="return false;">Action</i-dropdown-item>
        <i-dropdown-item href onclick="return false;">Another action</i-dropdown-item>
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
        <i-dropdown-item href="">Action</i-dropdown-item>
        <i-dropdown-item href="">Another action</i-dropdown-item>
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
        <i-dropdown-item href="">Action</i-dropdown-item>
        <i-dropdown-item href="">Another action</i-dropdown-item>
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

<i-code-preview title="Recursive Dropdown">

<div>
<i-dropdown :hide-on-click="false">
    <i-button>Recursive Dropdown</i-button>
    <i-dropdown-menu>
        <i-dropdown placement="right-start">
            <i-dropdown-item>Dropdown here</i-dropdown-item>
            <i-dropdown-menu>
                <i-dropdown-item href onclick="return false;">Action</i-dropdown-item>
                <i-dropdown-item href onclick="return false;">Another action</i-dropdown-item>
                <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
                <i-dropdown-divider />
                <i-dropdown-item>Separated item</i-dropdown-item>
            </i-dropdown-menu>
        </i-dropdown>
        <i-dropdown-divider />
        <i-dropdown-item href onclick="return false;">Some action</i-dropdown-item>
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
            <i-dropdown-item href="">Dropdown here</i-dropdown-item>
            <i-dropdown-menu>
                <i-dropdown-item href="">Action</i-dropdown-item>
                <i-dropdown-item href="">Another action</i-dropdown-item>
                <i-dropdown-item disabled>Something disabled here</i-dropdown-item>
                <i-dropdown-divider />
                <i-dropdown-item>Separated item</i-dropdown-item>
            </i-dropdown-menu>
        </i-dropdown>
        <i-dropdown-divider />
        <i-dropdown-item href="">Some action</i-dropdown-item>
        <i-dropdown-item disabled>Something else here</i-dropdown-item>
    </i-dropdown-menu>
</i-dropdown>
~~~

</template>
</i-code-preview>


### Components API
Here you can find a list of the various customization options you can use for the dropdown components as props, as well as available slots and events.

<i-api-preview title="Dropdown API" expanded markup="i-dropdown" link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/IDropdown">
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">disabled</template>
                <template slot="description">Sets the dropdown state as disabled.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">hide-on-click</template>
                <template slot="description">Determines whether to hide the dropdown when clicking it.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">id</template>
                <template slot="description">Sets the identifier of the dropdown.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"></template>
                <template slot="default"><code>dropdown-&lt;uid&gt;</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">keymap</template>
                <template slot="description">Sets the keymap of the dropdown component.</template>
                <template slot="type"><code>Object</code></template>
                <template slot="values"></template>
<template slot="default-row">
                
~~~js
{ 
    navigate: ['up', 'down'], 
    select: ['enter', 'space'], 
    show: ['enter', 'space'], 
    hide: ['esc', 'tab'] 
}
~~~

</template>
            </api-table-row>
            <api-table-row>
                <template slot="property">placement</template>
                <template slot="description">Sets the placement of the dropdown.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values">
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
                </template>
                <template slot=""><code>bottom</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">variant</template>
                <template slot="description">Sets the color variant of the collapsible component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>light</code>, <code>dark</code></template>
                <template slot="default"><code>light</code></template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="property">default</template>
                <template slot="description">Slot for dropdown component trigger and dropdown menu. The first direct child represents the trigger, the second direct child represents the dropdown menu.</template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="events">
        <api-table>
            <api-table-row>
                <template slot="event">action</template>
                <template slot="description">Emitted when dropdown item with action is clicked.</template>
                <template slot="type"><code>(action: String | Number | Boolean, instance: VueComponent) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">change</template>
                <template slot="description">Emitted when visibility changes.</template>
                <template slot="type"><code>(visible: Boolean) => {}</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>

<i-api-preview title="Dropdown Menu API" markup="i-dropdown-menu" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/IDropdownMenu">
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">arrow</template>
                <template slot="description">Sets whether to attach an arrow to the dropdown menu.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>true</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">transform-origin</template>
                <template slot="description">Sets the transform origin of the dropdown menu.</template>
                <template slot="type">
                    <code>Boolean</code>, 
                    <code>String</code> 
                </template>
                <template slot=""></template>
                <template slot=""><code>true</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">popper-options</template>
                <template slot="description">Sets custom options for the Popper.js plugin.</template>
                <template slot="type"><code>Object</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for dropdown menu default content.</template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>

<i-api-preview title="Dropdown Item API" markup="i-dropdown-item" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/IDropdownItem">
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">action</template>
                <template slot="description">Set an action to be emitted by the <code>i-dropdown</code> parent when the dropdown item is clicked.</template>
                <template slot="type">
                    <code>String</code>, 
                    <code>Number</code>, 
                    <code>Boolean</code> 
                </template>
                <template slot=""></template>
                <template slot=""></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">disabled</template>
                <template slot="description">Set the state of the dropdown item component as disabled.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">tag</template>
                <template slot="description">Sets the tag to be used for the component. If <code>to</code> or <code>href</code> attribute is provided, an <code>a</code> tag will be used.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"></template>
                <template slot="default"><code>div</code></template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for dropdown item default content.</template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>

### Sass Variables
Here you can find a list of the Sass variables you can use for the dropdown components. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

<i-scss-preview title="Dropdown" expanded>
    <template slot="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$dropdown-font-size</template>
                <template slot="default"><code>$font-size</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$dropdown-font-weight</template>
                <template slot="default"><code>$font-weight-normal</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$dropdown-line-height</template>
                <template slot="default"><code>$line-height</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$dropdown-margin</template>
                <template slot="default"><code>$spacer-1-2</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$dropdown-border-width</template>
                <template slot="default"><code>$border-width</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$dropdown-border-radius</template>
                <template slot="default"><code>$border-radius</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$dropdown-min-width</template>
                <template slot="default"><code>200px</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$dropdown-padding-base</template>
                <template slot="default"><code>$spacer-1-2 0</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$dropdown-padding</template>
                <template slot="default"><code>size-map($dropdown-padding-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$dropdown-item-padding-base</template>
                <template slot="default"><code>$spacer-1-2 $spacer</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$dropdown-item-padding</template>
                <template slot="default"><code>size-map($dropdown-item-padding-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$dropdown-divider-margin-base</template>
                <template slot="default"><code>$spacer-1-2 0</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$dropdown-divider-margin</template>
                <template slot="default"><code>size-map($dropdown-divider-margin-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$dropdown-variants</template>
                <template slot="default"><code>('monochrome-white')</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$dropdown-variant-color-light</template>
                <template slot="default"><code>$variant-color-light</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$dropdown-variant-color-dark</template>
                <template slot="default"><code>$variant-color-dark</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-scss-preview> 
