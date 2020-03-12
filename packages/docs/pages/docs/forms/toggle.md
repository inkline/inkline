# Toggle
## Toggles are boolean form components used for easily enabling or disabling features. { .lead }

### Basic Usage

<i-code-preview title="Basic Toggle" link="https://github.com/inkline/inkline/tree/master/src/components/Toggle">
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

<i-code-preview title="Toggle Sizes" link="https://github.com/inkline/inkline/tree/master/src/components/Toggle">
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

<i-code-preview title="Readonly Toggle" link="https://github.com/inkline/inkline/tree/master/src/components/Toggle">
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

<i-code-preview title="Disabled Toggle" link="https://github.com/inkline/inkline/tree/master/src/components/Toggle">
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

### API

<i-api-preview title="Toggle API" markup="i-toggle" expanded>
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
                    <td>disabled</td>
                    <td>Sets the state of the toggle input form component as disabled.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>readonly</td>
                    <td>Sets the state of the toggle input form component as readonly.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>schema</td>
                    <td>Provides a schema binding to the toggle input form component. See the <nuxt-link to="/docs/forms/form-validation">Form Validation</nuxt-link> documentation.</td>
                    <td><code>Object</code></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>size</td>
                    <td>Sets the size of the toggle input form component.</td>
                    <td><code>String</code></td>
                    <td><code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>md</code></td>
                </tr>
                <tr>
                    <td>value</td>
                    <td>Sets the value of the toggle input form component. Can be also provided using a <code>v-model</code> directive when the toggle input isn't grouped.</td>
                    <td><code>Boolean</code></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </i-table>
    </template>
    <template slot="events">
        <i-table bordered responsive class="_margin-bottom-0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Prototype</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>click</td>
                    <td>Emitted when toggle input form component is clicked.</td>
                    <td><code>(event: Event) => {}</code></td>
                </tr>
                <tr>
                    <td>focus</td>
                    <td>Emitted when toggle input form component is focused.</td>
                    <td><code>(event: Event) => {}</code></td>
                </tr>
                <tr>
                    <td>blur</td>
                    <td>Emitted when toggle input form component is blurred.</td>
                    <td><code>(event: Event) => {}</code></td>
                </tr>
                <tr>
                    <td>input</td>
                    <td>Emitted when toggle input form component value changes.</td>
                    <td><code>(value: Boolean | String) => {}</code></td>
                </tr>
            </tbody>
        </i-table>
    </template>
</i-api-preview>

<i-api-preview title="Toggle Group API" markup="i-form-group" expanded>
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
                    <td>disabled</td>
                    <td>Sets the state of the toggle input form group component as disabled.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>readonly</td>
                    <td>Sets the state of the toggle input form group component as readonly.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>size</td>
                    <td>Sets the size of the toggle input form group component.</td>
                    <td><code>String</code></td>
                    <td><code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>md</code></td>
                </tr>
                <tr>
                    <td>value</td>
                    <td>Sets the value of the toggle input form group component. To be provided using the <code>v-model</code> directive.</td>
                    <td><code>Array&lt;String&gt;</code></td>
                    <td></td>
                    <td><code>[]</code></td>
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
                    <td>Slot for toggle input form group component default content.</td>
                </tr>
            </tbody>
        </i-table>
    </template>
    <template slot="events">
        <i-table bordered responsive class="_margin-bottom-0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Prototype</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>focus</td>
                    <td>Emitted when a child toggle input form component is focused.</td>
                    <td><code>(event: Event) => {}</code></td>
                </tr>
                <tr>
                    <td>blur</td>
                    <td>Emitted when a child toggle input form component is blurred.</td>
                    <td><code>(event: Event) => {}</code></td>
                </tr>
                <tr>
                    <td>input</td>
                    <td>Emitted when toggle input form group component value changes.</td>
                    <td><code>(value: Boolean | String) => {}</code></td>
                </tr>
            </tbody>
        </i-table>
    </template>
</i-api-preview>
