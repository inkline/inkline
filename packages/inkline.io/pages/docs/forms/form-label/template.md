# Form Label
Form component used to add text labels to inputs. { .lead }

## Example
You can add a label to your input by grouping an `<i-form-label>` and any input component inside an `<i-form-group>`. 

<i-code-preview title="Basic Form Label" link="https://github.com/inkline/inkline/tree/master/src/components/FormLabel">

<i-form-group>
    <i-form-label>Input Label Default</i-form-label>
    <i-input v-model="labelInputValue" placeholder="Type something.." />
</i-form-group>

<template slot="html">

~~~html
<i-form-group>
    <i-form-label>Input Label Default</i-form-label>
    <i-input v-model="value" placeholder="Type something.." />
</i-form-group>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      value: ''
    };
  }
}
~~~

</template>
</i-code-preview>

### Position
You can add labels to either side of your input using the `label` slot, together with the optional `label-position` property.

<i-code-preview title="Form Label Position" link="https://github.com/inkline/inkline/tree/master/src/components/FormLabel">

<i-form-group>
    <i-form-label>Input Label Default</i-form-label>
    <i-input v-model="labelDefaultInputValue" placeholder="Type something.." />
</i-form-group>

<i-form-group inline>
    <i-form-label placement="left">Input Label Left</i-form-label>
    <i-input v-model="labelLeftInputValue" placeholder="Type something.." />
</i-form-group>

<i-form-group inline>
    <i-form-label placement="right">Input Label Right</i-form-label>
    <i-input v-model="labelRightInputValue" placeholder="Type something.." />
</i-form-group>

<template slot="html">

~~~html
<i-form-group>
    <i-form-label>Input Label Default</i-form-label>
    <i-input v-model="value" placeholder="Type something.." />
</i-form-group>
~~~
~~~html
<i-form-group inline>
    <i-form-label placement="left">Input Label Left</i-form-label>
    <i-input v-model="value" placeholder="Type something.." />
</i-form-group>
~~~
~~~html
<i-form-group inline>
    <i-form-label placement="right">Input Label Right</i-form-label>
    <i-input v-model="value" placeholder="Type something.." />
</i-form-group>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      value: ''
    };
  }
}
~~~

</template>
</i-code-preview>

### Size
You're able to use the `size` property to control the size of your form labels, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`. Setting the size on a `<i-form-group>` will also affect form labels.

<i-code-preview title="Form Label Size" link="https://github.com/inkline/inkline/tree/master/src/components/FormLabel">

<i-form-group>
    <i-form-label size="sm">Input Label Small</i-form-label>
    <i-input v-model="labelSmInputValue" placeholder="Type something.." />
</i-form-group>

<i-form-group>
    <i-form-label size="md">Input Label Medium</i-form-label>
    <i-input v-model="labelMdInputValue" placeholder="Type something.." />
</i-form-group>

<i-form-group>
    <i-form-label size="lg">Input Label Large</i-form-label>
    <i-input v-model="labelLgInputValue" placeholder="Type something.." />
</i-form-group>

<template slot="html">

~~~html
<i-form-group>
    <i-form-label size="sm">Input Label Small</i-form-label>
    <i-input v-model="value" placeholder="Type something.." />
</i-form-group>
~~~
~~~html
<i-form-group>
    <i-form-label size="md">Input Label Medium</i-form-label>
    <i-input v-model="value" placeholder="Type something.." />
</i-form-group>
~~~
~~~html
<i-form-group>
    <i-form-label size="lg">Input Label Large</i-form-label>
    <i-input v-model="value" placeholder="Type something.." />
</i-form-group>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      value: ''
    };
  }
}
~~~

</template>
</i-code-preview>


### API

<i-api-preview title="Form Label API" markup="i-form-label" expanded>
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
                    <td>placement</td>
                    <td>Sets the placement of the form label component.</td>
                    <td><code>String</code></td>
                    <td><code>left</code>, <code>default</code>, <code>right</code></td>
                    <td><code>default</code></td>
                </tr>
                <tr>
                    <td>size</td>
                    <td>Sets the size of the form label component.</td>
                    <td><code>String</code></td>
                    <td><code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>md</code></td>
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
                    <td>Slot for form label default content.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>