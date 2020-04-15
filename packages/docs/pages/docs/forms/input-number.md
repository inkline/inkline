# Number Input
## Number Inputs are form components used to for inputting and manipulating numbers. { .lead }

### Example


<i-code-preview title="Number Input">

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


<i-code-preview title="Disabled Number Input">

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


<i-code-preview title="Number Input Minimum and Maximum Value">

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


<i-code-preview title="Number Input Step Size">

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


<i-code-preview title="Number Input Precision">

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


<i-code-preview title="Number Input Prefix and Suffix">

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


<i-code-preview title="Number Input Prepend">

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

<i-code-preview title="Number Input Sizes">

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


### Component API
Here you can find a list of the various customization options you can use for the number input components as props, as well as available slots and events.

<i-api-preview title="Input Number API" markup="i-input-number" expanded>
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">disabled</template>
                <template slot="description">Sets the state of the number input form component as disabled.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">placeholder</template>
                <template slot="description">Sets the placeholder of the number input form component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">readonly</template>
                <template slot="description">Sets the state of the number input form component as readonly.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">schema</template>
                <template slot="description">Provides a schema binding to the number input form component. See the <nuxt-link to="/docs/forms/form-validation">Form Validation</nuxt-link> documentation.</template>
                <template slot="type"><code>Object</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the number input form component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">value</template>
                <template slot="description">Sets the value of the number input form component. To be provided using the <code>v-model</code> directive.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">min</template>
                <template slot="description">Sets the minimum value of the number input form component.</template>
                <template slot="type"><code>Number</code></template>
                <template slot="values"></template>
                <template slot="default">-Infinity</template>
            </api-table-row>
            <api-table-row>
                <template slot="property">max</template>
                <template slot="description">Sets the maximum value of the number input form component.</template>
                <template slot="type"><code>Number</code></template>
                <template slot="values"></template>
                <template slot="default">+Infinity</template>
            </api-table-row>
            <api-table-row>
                <template slot="property">precision</template>
                <template slot="description">Sets the number precision of the number input form component value.</template>
                <template slot="type"><code>Number</code></template>
                <template slot="values"></template>
                <template slot="default">0</template>
            </api-table-row>
            <api-table-row>
                <template slot="property">step</template>
                <template slot="description">Sets increase and decrease step of the number input form component value.</template>
                <template slot="type"><code>Number</code></template>
                <template slot="values"></template>
                <template slot="default">1</template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">prepend</template>
                <template slot="description">Slot for number input prepend content. Prepended content appears before the input inside a button-like container.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">append</template>
                <template slot="description">Slot for number input append content. Appended content appears after the input inside a button-like container.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">prefix</template>
                <template slot="description">Slot for number input prefix content. The prefix content appears inside the input field, on the left side.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">suffix</template>
                <template slot="description">Slot for number input suffix content. The suffix content appears inside the input field, on the right side.</template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="events">
        <api-table>
            <api-table-row>
                <template slot="event">click</template>
                <template slot="description">Emitted when number input form component is clicked.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">focus</template>
                <template slot="description">Emitted when number input form component is focused.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">blur</template>
                <template slot="description">Emitted when number input form component is blurred.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">change</template>
                <template slot="description">Emitted when number input form component value changes.</template>
                <template slot="type"><code>(value: String) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">input</template>
                <template slot="description">Emitted when number input form component value changes.</template>
                <template slot="type"><code>(value: String) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">mouseenter</template>
                <template slot="description">Emitted when number input form component is hovered.</template>
                <template slot="type"><code>(value: String) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">mouseleave</template>
                <template slot="description">Emitted when number input form component is not hovered anymore.</template>
                <template slot="type"><code>(value: String) => {}</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>
