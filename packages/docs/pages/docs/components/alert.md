# Alert
## Provide contextual feedback messages for typical user actions using the alert component. {.lead}

### Variants
Alerts are available for any length of text, and can have an optional dismiss button. For choosing the context of the alert,
use the `variant` property.

By default, alerts are set to have `width: 100%`, fully spanning the width of the parent container.

<i-code-preview title="Alert Variants">

<div class="_margin-bottom-1">
    <i-alert variant="primary">
        <p>A simple primary alert with an <a href="https://inkline.io" onclick="return false;">example link</a>. It's clickable!</p>
    </i-alert>
</div>
<div class="_margin-bottom-1">
    <i-alert variant="secondary">
        <p>A simple secondary alert with an <a href="https://inkline.io" onclick="return false;">example link</a>. It's clickable!</p>
    </i-alert>
</div>
<div class="_margin-bottom-1">
    <i-alert variant="success">
        <p>A simple success alert with an <a href="https://inkline.io" onclick="return false;">example link</a>. It's clickable!</p>
    </i-alert>
</div>
<div class="_margin-bottom-1">
    <i-alert variant="danger">
        <p>A simple danger alert with an <a href="https://inkline.io" onclick="return false;">example link</a>. It's clickable!</p>
    </i-alert>
</div>
<div class="_margin-bottom-1">
    <i-alert variant="warning">
        <p>A simple warning alert with an <a href="https://inkline.io" onclick="return false;">example link</a>. It's clickable!</p>
    </i-alert>
</div>
<div>
    <i-alert variant="info">
        <p>A simple info alert with an <a href="https://inkline.io" onclick="return false;">example link</a>. It's clickable!</p>
    </i-alert>
</div>

<template slot="html">

~~~html
<i-alert variant="primary">
    <p>A simple primary alert with an <a href="https://inkline.io">example link</a>. It's clickable!</p>
</i-alert>
~~~
~~~html
<i-alert variant="secondary">
    <p>A simple secondary alert with an <a href="https://inkline.io">example link</a>. It's clickable!</p>
</i-alert>
~~~
~~~html
<i-alert variant="success">
    <p>A simple success alert with an <a href="https://inkline.io">example link</a>. It's clickable!</p>
</i-alert>
~~~
~~~html
<i-alert variant="danger">
    <p>A simple danger alert with an <a href="https://inkline.io">example link</a>. It's clickable!</p>
</i-alert>
~~~
~~~html
<i-alert variant="warning">
    <p>A simple warning alert with an <a href="https://inkline.io">example link</a>. It's clickable!</p>
</i-alert>
~~~
~~~html
<i-alert variant="info">
    <p>A simple info alert with an <a href="https://inkline.io">example link</a>. It's clickable!</p>
</i-alert>
~~~

</template>
</i-code-preview>

### Sizes
You're able to use the `size` modifier to control the text and spacing size of your alerts, using one of the available sizes: `sm`, `md`, and `lg`. 

The default size is set to `md`.

<i-code-preview title="Alert Sizes">

<div class="_margin-bottom-1">
    <i-alert size="sm">
        Some quick example text to build on the alert title and make up the bulk of the alert's content.
    </i-alert>
</div>
<div class="_margin-bottom-1">
    <i-alert size="md">
        Some quick example text to build on the alert title and make up the bulk of the alert's content.
    </i-alert>
</div>
<div>
    <i-alert size="lg">
        Some quick example text to build on the alert title and make up the bulk of the alert's content.
    </i-alert>
</div>

<template slot="html">

~~~html
<i-alert size="sm">
    Some quick example text to build on the alert title and make up the bulk of the alert's content.
</i-alert>
~~~
~~~html
<i-alert size="md">
    Some quick example text to build on the alert title and make up the bulk of the alert's content.
</i-alert>
~~~
~~~html
<i-alert size="lg">
    Some quick example text to build on the alert title and make up the bulk of the alert's content.
</i-alert>
~~~

</template>
</i-code-preview>

### Elements
Your alerts accept any kind of content, giving you the flexibility to create good looking contextual messages.

<i-code-preview title="Alert Elements">

<div>
    <i-alert>
        <h4>Alert Title</h4>
        <p>
            Some quick example text to build on the alert and make up the bulk of the alert's content.
        </p>
    </i-alert>
</div>

<template slot="html">

~~~html
<i-alert>
    <h4>Alert Title</h4>
    <p>
        Some quick example text to build on the alert and make up the bulk of the alert's content.
    </p>
</i-alert>
~~~

</template>
</i-code-preview>

### Icon
You can add an icon to the `<i-alert>` component by providing an `icon` slot. 

The following example makes use of the bundled Inkline icons, but you can use any icon font that you like:

<i-code-preview title="Alert Icon">

<i-alert variant="info" class="_margin-bottom-1">
    <template slot="icon"><i class="inkline-icon -info"></i></template>
    <p>Some quick example text to build on the alert title and make up the bulk of the alert's content.</p>
</i-alert>
<i-alert variant="warning" class="_margin-bottom-1">
    <template slot="icon"><i class="inkline-icon -warning"></i></template>
    <p>Some quick example text to build on the alert title and make up the bulk of the alert's content.</p>
</i-alert>
<i-alert variant="danger">
    <template slot="icon"><i class="inkline-icon -danger"></i></template>
    <p>Some quick example text to build on the alert title and make up the bulk of the alert's content.</p>
</i-alert>

<template slot="html">

~~~html
<i-alert variant="info">
    <template slot="icon"><i class="inkline-icon -info"></i></template>
    <p>Some quick example text to build on the alert title and make up the bulk of the alert's content.</p>
</i-alert>
~~~
~~~html
<i-alert variant="warning">
    <template slot="icon"><i class="inkline-icon -warning"></i></template>
    <p>Some quick example text to build on the alert title and make up the bulk of the alert's content.</p>
</i-alert>
~~~
~~~html
<i-alert variant="danger">
    <template slot="icon"><i class="inkline-icon -danger"></i></template>
    <p>Some quick example text to build on the alert title and make up the bulk of the alert's content.</p>
</i-alert>
~~~

</template>
</i-code-preview>

### Dismissible
You can dismiss alerts using a combination of the provided `dismissible` and `show` properties. The `dismissible` property will be used to show the dismiss icon. The `show` property will show or hide the alert, resetting dismissed alerts when needed.

<i-code-preview title="Dismissible Alert">

<i-alert dismissible :show="visible" variant="primary">
    <p>Whoa! Nicely done.</p>
</i-alert>

<template slot="html">

~~~html
<i-alert dismissible :show="visible" variant="primary">
    <p>Whoa! Nicely done.</p>
</i-alert>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      visible: true
    };
  }
}
~~~

</template>
</i-code-preview>

### Component API
Here you can find a list of the various customization options you can use for the alert component as props, as well as available slots.

<i-api-preview title="Alert API" markup="i-alert" expanded>
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">dismissLabel</template>
                <template slot="description">Sets the dismiss lable, replaceable using the <code>dismiss</code> slot.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"></template>
                <template slot="default"><code>×</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">dismissible</template>
                <template slot="description">Sets the alert as dismissible.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">show</template>
                <template slot="description">Sets the dismiss <code>v-model</code> for the alert component. Alert is only visible if show is <code>true</code>.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>true</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the alert component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">variant</template>
                <template slot="description">Sets the color variant of the alert component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>primary</code>, <code>secondary</code>, <code>success</code>, <code>danger</code>, <code>warning</code>, <code>info</code></template>
                <template slot="default"><code>primary</code></template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for alert default content.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">dismiss</template>
                <template slot="description">Slot for alert dismiss button.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">icon</template>
                <template slot="description">Slot for alert icon.</template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>

### Sass Variables
Here you can find a list of the Sass variables you can use for the alert component. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

<i-scss-preview title="Alert" expanded>
    <template slot="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$alert-font-size</template>
                <template slot="default"><code>$font-size</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$alert-font-weight</template>
                <template slot="default"><code>font-weight(normal)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$alert-line-height</template>
                <template slot="default"><code>$line-height</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$alert-border-width</template>
                <template slot="default"><code>$border-width</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$alert-border-radius</template>
                <template slot="default"><code>$border-radius</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$alert-padding-base</template>
                <template slot="default"><code>$spacer</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$alert-padding</template>
                <template slot="default"><code>size-map($alert-padding-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$alert-dismiss-size</template>
                <template slot="default"><code>1rem</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$alert-background-mix-percentage</template>
                <template slot="default"><code>60%</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$alert-border-darken-lighten-percentage</template>
                <template slot="default"><code>10%</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$alert-code-color-darken-lighten-percentage</template>
                <template slot="default"><code>10%</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$alert-code-background-color-darken-lighten-percentage</template>
                <template slot="default"><code>7%</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$alert-color-darken-lighten-percentage</template>
                <template slot="default"><code>30%</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$alert-link-color-darken-lighten-percentage</template>
                <template slot="default"><code>35%</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$alert-variants</template>
                <template slot="default"><code>('brand', 'state')</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$alert-variant-color-light</template>
                <template slot="default"><code>$variant-color-light</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$alert-variant-color-dark</template>
                <template slot="default"><code>$variant-color-dark</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-scss-preview> 

