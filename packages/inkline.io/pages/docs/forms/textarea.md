# Textarea
## Textareas are form components used to for inputting data directly from the keyboard, on multiple lines. { .lead }

### Example

<i-code-preview title="Basic Textarea" link="https://github.com/inkline/inkline/tree/master/src/components/Textarea">

<i-textarea v-model="textareaValue" placeholder="Type something.." />

<template slot="html">

~~~html
<i-textarea v-model="value" placeholder="Type something.." />
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

### Disabled State

<i-code-preview title="Disabled Textarea" link="https://github.com/inkline/inkline/tree/master/src/components/Textarea">

<i-textarea v-model="disabledTextareaValue" placeholder="Type something.." disabled />

<template slot="html">

~~~html
<i-textarea v-model="value" placeholder="Type something.." disabled />
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

### Clearable Textarea

<i-code-preview title="Clearable Textarea" link="https://github.com/inkline/inkline/tree/master/src/components/Textarea">

<i-textarea v-model="clearableTextareaValue" placeholder="Type something.." clearable />

<template slot="html">

~~~html
<i-textarea v-model="value" placeholder="Type something.." clearable />
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

### Prefix and Suffix
Inkline allows you to easily add a prefix or suffix to your Textareas. Using prefixes and suffixes you can, indicate 
your Textarea type using an icon or text. 

<i-code-preview title="Textarea Prefix and Suffix" link="https://github.com/inkline/inkline/tree/master/src/components/Textarea">

<i-textarea v-model="prefixTextareaValue" placeholder="Type something.." class="_margin-bottom-1">
    <i slot="prefix" class="form-input-icon">@</i>
</i-textarea>

<i-textarea v-model="suffixTextareaValue" placeholder="Type something.." class="_margin-bottom-1">
    <i slot="suffix" class="form-input-icon">@</i>
</i-textarea>

<i-textarea v-model="prefixSuffixTextareaValue" placeholder="Type something..">
    <i slot="prefix" class="form-input-icon">@</i>
    <i slot="suffix" class="form-input-icon">@</i>
</i-textarea>

<template slot="html">

~~~html
<i-textarea v-model="value" placeholder="Type something..">
    <i slot="prefix" class="form-input-icon">@</i>
</i-textarea>
~~~
~~~html
<i-textarea v-model="value" placeholder="Type something..">
    <i slot="suffix" class="form-input-icon">@</i>
</i-textarea>
~~~
~~~html
<i-textarea v-model="value" placeholder="Type something..">
    <i slot="prefix" class="form-input-icon">@</i>
    <i slot="suffix" class="form-input-icon">@</i>
</i-textarea>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      value: 'Lorem ipsum dolor sit amet, consectetur adipiscing..'
    };
  }
}
~~~

</template>
</i-code-preview>

### Prepend and Append
You can add additional content such as select fields, buttons or plain text, to either side of the Textarea by using the prepend and append slots.

<i-code-preview title="Textarea Prepend and Append" link="https://github.com/inkline/inkline/tree/master/src/components/Textarea">

<i-textarea v-model="prependTextareaValue" placeholder="Type something.." class="_margin-bottom-1">
    <span slot="prepend" class="form-input-prepend">http://</span>
</i-textarea>

<i-textarea v-model="appendTextareaValue" placeholder="Type something.." class="_margin-bottom-1">
    <span slot="append" class="form-input-append">http://</span>
</i-textarea>

<i-textarea v-model="prependAppendTextareaValue" placeholder="Type something..">
    <span slot="prepend" class="form-input-prepend">http://</span>
    <span slot="append" class="form-input-append">.com</span>
</i-textarea>

<template slot="html">

~~~html
<i-textarea v-model="value" placeholder="Type something..">
    <span slot="prepend" class="form-input-prepend">http://</span>
</i-textarea>
~~~
~~~html
<i-textarea v-model="value" placeholder="Type something..">
    <span slot="append" class="form-input-append">.com</span>
</i-textarea>
~~~
~~~html
<i-textarea v-model="value" placeholder="Type something..">
    <span slot="prepend" class="form-input-prepend">http://</span>
    <span slot="append" class="form-input-append">.com</span>
</i-textarea>
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


### Sizes
You're able to use the `size` modifier to control the size of your textareas, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`.

<i-code-preview title="Textarea Sizes" link="https://github.com/inkline/inkline/tree/master/src/components/Textarea">

<i-textarea size="sm" v-model="smTextareaValue" placeholder="Type something small.." class="_margin-bottom-1" />
<i-textarea size="md" v-model="mdTextareaValue" placeholder="Type something medium.." class="_margin-bottom-1" />
<i-textarea size="lg" v-model="lgTextareaValue" placeholder="Type something large.." />

<template slot="html">

~~~html
<i-textarea size="sm" v-model="value" placeholder="Type something small.." />
~~~
~~~html
<i-textarea size="md" v-model="value" placeholder="Type something medium.." />
~~~
~~~html
<i-textarea size="lg" v-model="value" placeholder="Type something large.." />
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

<i-api-preview title="Textarea API" markup="i-textarea" expanded>
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
                    <td>clearable</td>
                    <td>Sets the textarea as clearable. Clearable textareas have a clear icon when value a is provided.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>disabled</td>
                    <td>Sets the state of the textarea form component as disabled.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>placeholder</td>
                    <td>Sets the placeholder of the textarea form component.</td>
                    <td><code>String</code></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>readonly</td>
                    <td>Sets the state of the textarea form component as readonly.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>schema</td>
                    <td>Provides a schema binding to the textarea form component. See the <nuxt-link to="/docs/forms/form-validation">Form Validation</nuxt-link> documentation.</td>
                    <td><code>Object</code></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>size</td>
                    <td>Sets the size of the textarea form component.</td>
                    <td><code>String</code></td>
                    <td><code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>md</code></td>
                </tr>
                <tr>
                    <td>value</td>
                    <td>Sets the value of the textarea form component. To be provided using the <code>v-model</code> directive.</td>
                    <td><code>String</code></td>
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
                    <td>prepend</td>
                    <td>Slot for textarea prepend content. Prepended content appears before the textarea inside a button-like container.</td>
                </tr>
                <tr>
                    <td>append</td>
                    <td>Slot for textarea append content. Appended content appears after the textarea inside a button-like container.</td>
                </tr>
                <tr>
                    <td>prefix</td>
                    <td>Slot for textarea prefix content. The prefix content appears inside the textarea field, on the left side.</td>
                </tr>
                <tr>
                    <td>suffix</td>
                    <td>Slot for textarea suffix content. The suffix content appears inside the textarea field, on the right side.</td>
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
                    <td>click</td>
                    <td>Emitted when textarea form component is clicked.</td>
                    <td><code>(event: Event) => {}</code></td>
                </tr>
                <tr>
                    <td>focus</td>
                    <td>Emitted when textarea form component is focused.</td>
                    <td><code>(event: Event) => {}</code></td>
                </tr>
                <tr>
                    <td>blur</td>
                    <td>Emitted when textarea form component is blurred.</td>
                    <td><code>(event: Event) => {}</code></td>
                </tr>
                <tr>
                    <td>change</td>
                    <td>Emitted when textarea form component value changes.</td>
                    <td><code>(value: String) => {}</code></td>
                </tr>
                <tr>
                    <td>input</td>
                    <td>Emitted when textarea form component value changes.</td>
                    <td><code>(value: String) => {}</code></td>
                </tr>
                <tr>
                    <td>mouseenter</td>
                    <td>Emitted when textarea form component is hovered.</td>
                    <td><code>(value: String) => {}</code></td>
                </tr>
                <tr>
                    <td>mouseleave</td>
                    <td>Emitted when textarea form component is not hovered anymore.</td>
                    <td><code>(value: String) => {}</code></td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>
