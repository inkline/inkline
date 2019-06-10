# Alert
## Provide contextual feedback messages for typical user actions using the alert component. {.lead}

### Variants
Alerts are available for any length of text, and can have an optional dismiss button. For choosing the context of the alert,
use the `variant` property.

By default, alerts are set to have `width: 100%`, fully spanning the width of the parent container.

<i-code-preview title="Alert Variants" link="https://github.com/inkline/inkline/tree/master/src/components/Alert">

<div class="_margin-bottom-1">
    <i-alert variant="primary">
        <p>A simple primary alert with an <a href="http://inkline.io">example link</a>. It's clickable!</p>
    </i-alert>
</div>
<div class="_margin-bottom-1">
    <i-alert variant="secondary">
        <p>A simple secondary alert with an <a href="http://inkline.io">example link</a>. It's clickable!</p>
    </i-alert>
</div>
<div class="_margin-bottom-1">
    <i-alert variant="success">
        <p>A simple success alert with an <a href="http://inkline.io">example link</a>. It's clickable!</p>
    </i-alert>
</div>
<div class="_margin-bottom-1">
    <i-alert variant="danger">
        <p>A simple danger alert with an <a href="http://inkline.io">example link</a>. It's clickable!</p>
    </i-alert>
</div>
<div class="_margin-bottom-1">
    <i-alert variant="warning">
        <p>A simple warning alert with an <a href="http://inkline.io">example link</a>. It's clickable!</p>
    </i-alert>
</div>
<div>
    <i-alert variant="info">
        <p>A simple info alert with an <a href="http://inkline.io">example link</a>. It's clickable!</p>
    </i-alert>
</div>

<template slot="html">

~~~html
<i-alert variant="primary">
    <p>A simple primary alert with an <a href="http://inkline.io">example link</a>. It's clickable!</p>
</i-alert>
~~~
~~~html
<i-alert variant="secondary">
    <p>A simple secondary alert with an <a href="http://inkline.io">example link</a>. It's clickable!</p>
</i-alert>
~~~
~~~html
<i-alert variant="success">
    <p>A simple success alert with an <a href="http://inkline.io">example link</a>. It's clickable!</p>
</i-alert>
~~~
~~~html
<i-alert variant="danger">
    <p>A simple danger alert with an <a href="http://inkline.io">example link</a>. It's clickable!</p>
</i-alert>
~~~
~~~html
<i-alert variant="warning">
    <p>A simple warning alert with an <a href="http://inkline.io">example link</a>. It's clickable!</p>
</i-alert>
~~~
~~~html
<i-alert variant="info">
    <p>A simple info alert with an <a href="http://inkline.io">example link</a>. It's clickable!</p>
</i-alert>
~~~

</template>
</i-code-preview>

### Sizes
You're able to use the `size` modifier to control the text and spacing size of your alerts, using one of the available sizes: `sm`, `md`, and `lg`. 

The default size is set to `md`.

<i-code-preview title="Alert Sizes" link="https://github.com/inkline/inkline/tree/master/src/components/Alert">

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

<i-code-preview title="Alert Elements" link="https://github.com/inkline/inkline/tree/master/src/components/Alert">

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

<i-code-preview title="Alert Icon" link="https://github.com/inkline/inkline/tree/master/src/components/Alert">

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

<i-code-preview title="Alert Icon" link="https://github.com/inkline/inkline/tree/master/src/components/Alert">

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

### API

<i-api-preview title="Alert API" markup="i-alert" expanded>
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
                    <td>dismissLabel</td>
                    <td>Sets the dismiss lable, replaceable using the <code>dismiss</code> slot.</td>
                    <td><code>String</code></td>
                    <td></td>
                    <td><code>×</code></td>
                </tr>
                <tr>
                    <td>dismissible</td>
                    <td>Sets the alert as dismissible.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>show</td>
                    <td>Sets the dismiss <code>v-model</code> for the alert component. Alert is only visible if show is <code>true</code>.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>true</code></td>
                </tr>
                <tr>
                    <td>size</td>
                    <td>Sets the size of the alert component.</td>
                    <td><code>String</code></td>
                    <td><code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>md</code></td>
                </tr>
                <tr>
                    <td>variant</td>
                    <td>Sets the color variant of the alert component.</td>
                    <td><code>String</code></td>
                    <td><code>primary</code>, <code>secondary</code>, <code>success</code>, <code>danger</code>, <code>warning</code>, <code>info</code></td>
                    <td><code>primary</code></td>
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
                    <td>Slot for alert default content.</td>
                </tr>
                <tr>
                    <td>dismiss</td>
                    <td>Slot for alert dismiss button.</td>
                </tr>
                <tr>
                    <td>icon</td>
                    <td>Slot for alert icon.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>
