# Input
## Form component used for inputting data directly from the keyboard. { .lead }

### Example

<i-code-preview title="Input" link="https://github.com/inkline/inkline/tree/master/src/components/Input">

<i-input v-model="inputValue" placeholder="Type something.." />

<template slot="html">

~~~html
<i-input v-model="value" placeholder="Type something.." />
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
<template slot="output">

Value: <code>{{inputValue}}</code>

</template>
</i-code-preview>

### Disabled State


<i-code-preview title="Disabled Input" link="https://github.com/inkline/inkline/tree/master/src/components/Input">

<i-input v-model="disabledInputValue" placeholder="Type something.." disabled />

<template slot="html">

~~~html
<i-input v-model="value" placeholder="Type something.." disabled />
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

### Clearable Input

<i-code-preview title="Input" link="https://github.com/inkline/inkline/tree/master/src/components/Input">

<i-input v-model="clearableInputValue" placeholder="Type something.." clearable />

<template slot="html">

~~~html
<i-input v-model="value" placeholder="Type something.." clearable />
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
Inkline allows you to easily add a prefix or suffix to your inputs. Using prefixes and suffixes you can, indicate 
your input type using an icon or text. 


<i-code-preview title="Input" link="https://github.com/inkline/inkline/tree/master/src/components/Input">

<i-input v-model="prefixInputValue" placeholder="Type something.." class="_margin-bottom-1">
    <i slot="prefix">@</i>
</i-input>

<i-input v-model="suffixInputValue" placeholder="Type something.." class="_margin-bottom-1">
    <i slot="suffix">@</i>
</i-input>

<i-input v-model="prefixSuffixInputValue" placeholder="Type something..">
    <i slot="prefix">@</i>
    <i slot="suffix">@</i>
</i-input>

<template slot="html">

~~~html
<i-input v-model="value" placeholder="Type something..">
    <i slot="prefix">@</i>
</i-input>
~~~
~~~html
<i-input v-model="value" placeholder="Type something..">
    <i slot="suffix">@</i>
</i-input>
~~~
~~~html
<i-input v-model="value" placeholder="Type something..">
    <i slot="prefix">@</i>
    <i slot="suffix">@</i>
</i-input>
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

### Prepend and Append
You can add additional content such as select fields, buttons or plain text, to either side of the input by using the prepend and append slots.


<i-code-preview title="Input" link="https://github.com/inkline/inkline/tree/master/src/components/Input">

<i-input v-model="prependInputValue" placeholder="Type something.." class="_margin-bottom-1">
    <span slot="prepend">http://</span>
</i-input>

<i-input v-model="appendInputValue" placeholder="Type something.." class="_margin-bottom-1">
    <span slot="append">http://</span>
</i-input>

<i-input v-model="prependAppendInputValue" placeholder="Type something..">
    <span slot="prepend">http://</span>
    <span slot="append">.com</span>
</i-input>

<template slot="html">

~~~html
<i-input v-model="value" placeholder="Type something..">
    <span slot="prepend">http://</span>
</i-input>

<i-input v-model="value" placeholder="Type something..">
    <span slot="append">.com</span>
</i-input>

<i-input v-model="value" placeholder="Type something..">
    <span slot="prepend">http://</span>
    <span slot="append">.com</span>
</i-input>
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
You're able to use the `size` modifier to control the size of your inputs, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`.

<i-code-preview title="Input Sizes" link="https://github.com/inkline/inkline/tree/master/src/components/Input">

<div class="_margin-bottom-1">
    <i-input size="sm" v-model="smInputValue" placeholder="Type something small.." />
</div>

<div class="_margin-bottom-1">
    <i-input size="md" v-model="mdInputValue" placeholder="Type something medium.." />
</div>

<div>
    <i-input size="lg" v-model="lgInputValue" placeholder="Type something large.." />
</div>

<template slot="html">

~~~html
<i-input size="sm" v-model="value" placeholder="Type something small.." />
~~~
~~~html
<i-input size="md" v-model="value" placeholder="Type something medium.." />
~~~
~~~html
<i-input size="lg" v-model="value" placeholder="Type something large.." />
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

<i-api-preview title="Input API" markup="i-input" expanded>
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
                    <td>Sets the input as clearable. Clearable inputs have a clear icon when value a is provided.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>disabled</td>
                    <td>Sets the state of the input form component as disabled.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>placeholder</td>
                    <td>Sets the placeholder of the input form component.</td>
                    <td><code>String</code></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>readonly</td>
                    <td>Sets the state of the input form component as readonly.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>schema</td>
                    <td>Provides a schema binding to the input form component. See the <nuxt-link to="/docs/forms/form-validation">Form Validation</nuxt-link> documentation.</td>
                    <td><code>Object</code></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>size</td>
                    <td>Sets the size of the input form component.</td>
                    <td><code>String</code></td>
                    <td><code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>md</code></td>
                </tr>
                <tr>
                    <td>value</td>
                    <td>Sets the value of the input form component. To be provided using the <code>v-model</code> directive.</td>
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
                    <td>Slot for input prepend content. Prepended content appears before the input inside a button-like container.</td>
                </tr>
                <tr>
                    <td>append</td>
                    <td>Slot for input append content. Appended content appears after the input inside a button-like container.</td>
                </tr>
                <tr>
                    <td>prefix</td>
                    <td>Slot for input prefix content. The prefix content appears inside the input field, on the left side.</td>
                </tr>
                <tr>
                    <td>suffix</td>
                    <td>Slot for input suffix content. The suffix content appears inside the input field, on the right side.</td>
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
                    <td>Emitted when input form component is clicked.</td>
                    <td><code>(event: Event) => {}</code></td>
                </tr>
                <tr>
                    <td>focus</td>
                    <td>Emitted when input form component is focused.</td>
                    <td><code>(event: Event) => {}</code></td>
                </tr>
                <tr>
                    <td>blur</td>
                    <td>Emitted when input form component is blurred.</td>
                    <td><code>(event: Event) => {}</code></td>
                </tr>
                <tr>
                    <td>change</td>
                    <td>Emitted when input form component value changes.</td>
                    <td><code>(value: String) => {}</code></td>
                </tr>
                <tr>
                    <td>input</td>
                    <td>Emitted when input form component value changes.</td>
                    <td><code>(value: String) => {}</code></td>
                </tr>
                <tr>
                    <td>mouseenter</td>
                    <td>Emitted when input form component is hovered.</td>
                    <td><code>(value: String) => {}</code></td>
                </tr>
                <tr>
                    <td>mouseleave</td>
                    <td>Emitted when input form component is not hovered anymore.</td>
                    <td><code>(value: String) => {}</code></td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>
