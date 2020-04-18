# Toggle
## Toggles are boolean form components used for easily enabling or disabling features. { .lead }

### Basic Usage

<i-code-preview title="Basic Toggle">
<i-toggle v-model="toggled"></i-toggle>
<template slot="html">

~~~html
<i-toggle v-model="toggled"></i-toggle>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      toggled: false
    };
  }
}
~~~

</template>
<template slot="output">

Checked: <code>{{toggled}}</code>

</template>
</i-code-preview>

### Sizes
You're able to use the `size` property to control the size of your inputs, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`. 

<i-code-preview title="Toggle Sizes">
<i-toggle size="sm" v-model="toggledSizeSm"></i-toggle>
<i-toggle size="md" v-model="toggledSizeMd"></i-toggle>
<i-toggle size="lg" v-model="toggledSizeLg"></i-toggle>
<template slot="html">

~~~html
<i-toggle size="sm" v-model="toggled"></i-toggle>
~~~
~~~html
<i-toggle size="md" v-model="toggled"></i-toggle>
~~~
~~~html
<i-toggle size="lg" v-model="toggled"></i-toggle>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      toggled: false
    };
  }
}
~~~

</template>
</i-code-preview>

Applying the size `size` property to an `i-form-group` will also set the chosen size to all of its `i-toggle` inputs.


### Readonly State
You can set the toggle input to be readonly by using the `readonly` property.

<i-code-preview title="Readonly Toggle">
<i-toggle v-model="toggledReadonlyFalse" readonly></i-toggle>
<i-toggle v-model="toggledReadonlyTrue" readonly></i-toggle>
<template slot="html">

~~~html
<i-toggle v-model="toggledFalse" readonly></i-toggle>
~~~
~~~html
<i-toggle v-model="toggledTrue" readonly></i-toggle>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      toggledFalse: false,
      toggledTrue: true
    };
  }
}
~~~

</template>
</i-code-preview>

### Disabled State
You can set the toggle input to be disabled by using the `disabled` property.

<i-code-preview title="Disabled Toggle">
<i-toggle v-model="toggledDisabledFalse" disabled></i-toggle>
<i-toggle v-model="toggledDisabledTrue" disabled></i-toggle>
<template slot="html">

~~~html
<i-toggle v-model="toggledFalse" readonly></i-toggle>
~~~
~~~html
<i-toggle v-model="toggledTrue" readonly></i-toggle>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      toggledFalse: false,
      toggledTrue: true
    };
  }
}
~~~

</template>
</i-code-preview>

### Component API
Here you can find a list of the various customization options you can use for the toggle component as props, as well as available slots and events.

<i-api-preview title="Toggle API" markup="i-toggle" expanded>
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">disabled</template>
                <template slot="description">Sets the state of the toggle input form component as disabled.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">readonly</template>
                <template slot="description">Sets the state of the toggle input form component as readonly.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">schema</template>
                <template slot="description">Provides a schema binding to the toggle input form component. See the <nuxt-link to="/docs/forms/form-validation">Form Validation</nuxt-link> documentation.</template>
                <template slot="type"><code>Object</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the toggle input form component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">value</template>
                <template slot="description">Sets the value of the toggle input form component. Can be also provided using a <code>v-model</code> directive when the toggle input isn't grouped.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">variant</template>
                <template slot="description">Sets the color variant of the toggle component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>light</code>, <code>dark</code></template>
                <template slot="default"><code>light</code></template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="events">
        <api-table>
            <api-table-row>
                <template slot="event">click</template>
                <template slot="description">Emitted when toggle input form component is clicked.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">focus</template>
                <template slot="description">Emitted when toggle input form component is focused.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">blur</template>
                <template slot="description">Emitted when toggle input form component is blurred.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">input</template>
                <template slot="description">Emitted when toggle input form component value changes.</template>
                <template slot="type"><code>(value: Boolean | String) => {}</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>

### Sass Variables
Here you can find a list of the Sass variables you can use for the toggle component. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-introduction-sass-variables' }">Sass Variables</nuxt-link> page.

<i-scss-preview title="Radio" expanded>
    <template slot="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$toggle-width-base</template>
                <template slot="default"><code>40px</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-width</template>
                <template slot="default"><code>size-map($toggle-width-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-height-base</template>
                <template slot="default"><code>20px</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-height</template>
                <template slot="default"><code>size-map($toggle-height-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-border-radius-base</template>
                <template slot="default"><code>$toggle-height-base</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-border-radius</template>
                <template slot="default"><code>size-map($toggle-border-radius-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-transition-duration</template>
                <template slot="default"><code>$transition-duration</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-indicator-size-base</template>
                <template slot="default"><code>16px</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-indicator-size</template>
                <template slot="default"><code>size-map($toggle-indicator-size-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-indicator-border-radius-base</template>
                <template slot="default"><code>$toggle-indicator-size-base</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-indicator-border-radius</template>
                <template slot="default"><code>size-map($toggle-indicator-border-radius-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-background-light</template>
                <template slot="default"><code>$color-gray-40</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-indicator-background-light</template>
                <template slot="default"><code>$color-white</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-background-active-light</template>
                <template slot="default"><code>$color-primary</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-indicator-background-active-light</template>
                <template slot="default"><code>$color-white</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-background-disabled-light</template>
                <template slot="default"><code>$color-gray-40</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-indicator-background-disabled-light</template>
                <template slot="default"><code>$color-gray-20</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-background-active-disabled-light</template>
                <template slot="default"><code>mix($toggle-background-active-light, $toggle-background-disabled-light, 25%)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-indicator-background-active-disabled-light</template>
                <template slot="default"><code>$color-gray-20</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-background-dark</template>
                <template slot="default"><code>$color-dark</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-indicator-background-dark</template>
                <template slot="default"><code>$color-white</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-background-active-dark</template>
                <template slot="default"><code>$color-primary</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-indicator-background-active-dark</template>
                <template slot="default"><code>$color-white</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-background-disabled-dark</template>
                <template slot="default"><code>$color-gray-60</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-indicator-background-disabled-dark</template>
                <template slot="default"><code>$color-gray-20</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-background-active-disabled-dark</template>
                <template slot="default"><code>mix($toggle-background-active-dark, $toggle-background-disabled-dark, 25%)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-indicator-background-active-disabled-dark</template>
                <template slot="default"><code>$color-gray-20</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$toggle-variants</template>
                <template slot="default"><code>(...)</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-scss-preview> 
