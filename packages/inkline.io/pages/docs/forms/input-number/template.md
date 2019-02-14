# Number Input

Allow your users to input data directly from the keyboard. { .lead }

### Example


<i-code-preview title="Number Input" link="https://github.com/inkline/inkline/tree/master/src/components/InputNumber">

<i-input-number v-model="inputValue" placeholder="Type something.." />

<template slot="html">

~~~html
<i-input-number v-model="value" placeholder="Type something.." />
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


<i-code-preview title="Disabled Number Input" link="https://github.com/inkline/inkline/tree/master/src/components/InputNumber">

<i-input-number v-model="disabledInputValue" placeholder="Type something.." disabled />

<template slot="html">

~~~html
<i-input-number v-model="value" placeholder="Type something.." disabled />
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


### Minimum and Maximum Value


<i-code-preview title="Number Input Minimum and Maximum Value" link="https://github.com/inkline/inkline/tree/master/src/components/InputNumber">

<i-input-number v-model="minMaxInputValue" :min="1" :max="10" placeholder="Type something.." />

<template slot="html">

~~~html
<i-input-number v-model="value" :min="1" :max="10" placeholder="Type something.." />
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      value: 1
    };
  }
}
~~~

</template>
<template slot="output">

Value: <code>{{minMaxInputValue}}</code>

</template>
</i-code-preview>

### Step Size

You can set the increment / decrement step by using the `step` property. The step is `1` by default.


<i-code-preview title="Number Input Step Size" link="https://github.com/inkline/inkline/tree/master/src/components/InputNumber">

<i-input-number v-model="stepInputValue" :step="10" placeholder="Type something.." />

<template slot="html">

~~~html
<i-input-number v-model="value" :step="10" placeholder="Type something.." />
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

Value: <code>{{stepInputValue}}</code>

</template>
</i-code-preview>

### Precision

You can set the number precision using the `precision` property, allowing you to enter floating point numbers into the input.


<i-code-preview title="Number Input Precision" link="https://github.com/inkline/inkline/tree/master/src/components/InputNumber">

<i-input-number v-model="precisionInputValue" :precision="2" placeholder="Type something.." />

<template slot="html">

~~~html
<i-input-number v-model="value" :precision="2" placeholder="Type something.." />
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

Value: <code>{{precisionInputValue}}</code>

</template>
</i-code-preview>

### Prefix and Suffix
Inkline allows you to easily add a prefix or suffix to your inputs. Using prefixes and suffixes you can, indicate 
your input type using an icon or text. 


<i-code-preview title="Number Input Prefix and Suffix" link="https://github.com/inkline/inkline/tree/master/src/components/InputNumber">

<i-input-number v-model="prefixInputValue" placeholder="Type something.." class="_margin-bottom-1">
    <i slot="prefix" class="form-input-icon">@</i>
</i-input-number>

<i-input-number v-model="suffixInputValue" placeholder="Type something.." class="_margin-bottom-1">
    <i slot="suffix" class="form-input-icon">@</i>
</i-input-number>

<i-input-number v-model="prefixSuffixInputValue" placeholder="Type something..">
    <i slot="prefix" class="form-input-icon">@</i>
    <i slot="suffix" class="form-input-icon">@</i>
</i-input-number>


<template slot="html">

~~~html
<i-input-number v-model="value" placeholder="Type something..">
    <i slot="prefix" class="form-input-icon">@</i>
</i-input-number>
~~~

~~~html
<i-input-number v-model="value" placeholder="Type something..">
    <i slot="suffix" class="form-input-icon">@</i>
</i-input-number>
~~~

~~~html
<i-input-number v-model="value" placeholder="Type something..">
    <i slot="prefix" class="form-input-icon">@</i>
    <i slot="suffix" class="form-input-icon">@</i>
</i-input-number>
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


<i-code-preview title="Number Input Prepend" link="https://github.com/inkline/inkline/tree/master/src/components/InputNumber">

<i-input-number v-model="prependInputValue" placeholder="Type something.." class="_margin-bottom-1">
    <span slot="prepend" class="form-input-prepend">http://</span>
</i-input-number>

<i-input-number v-model="appendInputValue" placeholder="Type something.." class="_margin-bottom-1">
    <span slot="append" class="form-input-append">http://</span>
</i-input-number>

<i-input-number v-model="prependAppendInputValue" placeholder="Type something..">
    <span slot="prepend" class="form-input-prepend">http://</span>
    <span slot="append" class="form-input-append">.com</span>
</i-input-number>

<template slot="html">

~~~html
<i-input-number v-model="value" placeholder="Type something..">
    <span slot="prepend" class="form-input-prepend">http://</span>
</i-input-number>
~~~

~~~html
<i-input-number v-model="value" placeholder="Type something..">
    <span slot="append" class="form-input-append">.com</span>
</i-input-number>
~~~

~~~html
<i-input-number v-model="value" placeholder="Type something..">
    <span slot="prepend" class="form-input-prepend">http://</span>
    <span slot="append" class="form-input-append">.com</span>
</i-input-number>
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

<i-code-preview title="Number Input Sizes" link="https://github.com/inkline/inkline/tree/master/src/components/InputNumber">

<i-form-group>
    <i-input-number size="sm" v-model="smInputValue" placeholder="Type something small.." />
</i-form-group>

<i-form-group>
    <i-input-number size="md" v-model="mdInputValue" placeholder="Type something medium.." />
</i-form-group>

<i-form-group>
    <i-input-number size="lg" v-model="lgInputValue" placeholder="Type something large.." />
</i-form-group>

<template slot="html">

~~~html
<i-input-number size="sm" v-model="value" placeholder="Type something small.." />
~~~
~~~html
<i-input-number size="md" v-model="value" placeholder="Type something medium.." />
~~~
~~~html
<i-input-number size="lg" v-model="value" placeholder="Type something large.." />
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

<i-api-preview title="Input Number API" markup="i-input-number" expanded>
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
                    <td>Sets the state of the number input form component as disabled.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>placeholder</td>
                    <td>Sets the placeholder of the number input form component.</td>
                    <td><code>String</code></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>readonly</td>
                    <td>Sets the state of the number input form component as readonly.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>schema</td>
                    <td>Provides a schema binding to the number input form component. See the <nuxt-link to="/docs/forms/form-validation">Form Validation</nuxt-link> documentation.</td>
                    <td><code>Object</code></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>size</td>
                    <td>Sets the size of the number input form component.</td>
                    <td><code>String</code></td>
                    <td><code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>md</code></td>
                </tr>
                <tr>
                    <td>value</td>
                    <td>Sets the value of the number input form component. To be provided using the <code>v-model</code> directive.</td>
                    <td><code>String</code></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>min</td>
                    <td>Sets the minimum value of the number input form component.</td>
                    <td><code>Number</code></td>
                    <td></td>
                    <td>-Infinity</td>
                </tr>
                <tr>
                    <td>max</td>
                    <td>Sets the maximum value of the number input form component.</td>
                    <td><code>Number</code></td>
                    <td></td>
                    <td>+Infinity</td>
                </tr>
                <tr>
                    <td>precision</td>
                    <td>Sets the number precision of the number input form component value.</td>
                    <td><code>Number</code></td>
                    <td></td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>step</td>
                    <td>Sets increase and decrease step of the number input form component value.</td>
                    <td><code>Number</code></td>
                    <td></td>
                    <td>1</td>
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
                    <td>Slot for number input prepend content. Prepended content appears before the input inside a button-like container.</td>
                </tr>
                <tr>
                    <td>append</td>
                    <td>Slot for number input append content. Appended content appears after the input inside a button-like container.</td>
                </tr>
                <tr>
                    <td>prefix</td>
                    <td>Slot for number input prefix content. The prefix content appears inside the input field, on the left side.</td>
                </tr>
                <tr>
                    <td>suffix</td>
                    <td>Slot for number input suffix content. The suffix content appears inside the input field, on the right side.</td>
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
                    <td>Emitted when number input form component is clicked.</td>
                    <td><code>(event: Event) => {}</code></td>
                </tr>
                <tr>
                    <td>focus</td>
                    <td>Emitted when number input form component is focused.</td>
                    <td><code>(event: Event) => {}</code></td>
                </tr>
                <tr>
                    <td>blur</td>
                    <td>Emitted when number input form component is blurred.</td>
                    <td><code>(event: Event) => {}</code></td>
                </tr>
                <tr>
                    <td>change</td>
                    <td>Emitted when number input form component value changes.</td>
                    <td><code>(value: String) => {}</code></td>
                </tr>
                <tr>
                    <td>input</td>
                    <td>Emitted when number input form component value changes.</td>
                    <td><code>(value: String) => {}</code></td>
                </tr>
                <tr>
                    <td>mouseenter</td>
                    <td>Emitted when number input form component is hovered.</td>
                    <td><code>(value: String) => {}</code></td>
                </tr>
                <tr>
                    <td>mouseleave</td>
                    <td>Emitted when number input form component is not hovered anymore.</td>
                    <td><code>(value: String) => {}</code></td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>
