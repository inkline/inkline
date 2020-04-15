# Textarea
## Form components used for inputting data directly from the keyboard, on multiple lines. { .lead }

### Example

<i-code-preview title="Basic Textarea">

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

<i-code-preview title="Disabled Textarea">

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

<i-code-preview title="Clearable Textarea">

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

<i-code-preview title="Textarea Prefix and Suffix">

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

<i-code-preview title="Textarea Prepend and Append">

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

<i-code-preview title="Textarea Sizes">

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


### Component API
Here you can find a list of the various customization options you can use for the textarea component as props, as well as available slots and events.

<i-api-preview title="Textarea API" markup="i-textarea" expanded>
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">clearable</template>
                <template slot="description">Sets the textarea as clearable. Clearable textareas have a clear icon when value a is provided.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">disabled</template>
                <template slot="description">Sets the state of the textarea form component as disabled.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">placeholder</template>
                <template slot="description">Sets the placeholder of the textarea form component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">readonly</template>
                <template slot="description">Sets the state of the textarea form component as readonly.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">schema</template>
                <template slot="description">Provides a schema binding to the textarea form component. See the <nuxt-link to="/docs/forms/form-validation">Form Validation</nuxt-link> documentation.</template>
                <template slot="type"><code>Object</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the textarea form component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">value</template>
                <template slot="description">Sets the value of the textarea form component. To be provided using the <code>v-model</code> directive.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">prepend</template>
                <template slot="description">Slot for textarea prepend content. Prepended content appears before the textarea inside a button-like container.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">append</template>
                <template slot="description">Slot for textarea append content. Appended content appears after the textarea inside a button-like container.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">prefix</template>
                <template slot="description">Slot for textarea prefix content. The prefix content appears inside the textarea field, on the left side.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">suffix</template>
                <template slot="description">Slot for textarea suffix content. The suffix content appears inside the textarea field, on the right side.</template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="events">
        <api-table>
            <api-table-row>
                <template slot="event">click</template>
                <template slot="description">Emitted when textarea form component is clicked.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">focus</template>
                <template slot="description">Emitted when textarea form component is focused.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">blur</template>
                <template slot="description">Emitted when textarea form component is blurred.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">change</template>
                <template slot="description">Emitted when textarea form component value changes.</template>
                <template slot="type"><code>(value: String) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">input</template>
                <template slot="description">Emitted when textarea form component value changes.</template>
                <template slot="type"><code>(value: String) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">mouseenter</template>
                <template slot="description">Emitted when textarea form component is hovered.</template>
                <template slot="type"><code>(value: String) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">mouseleave</template>
                <template slot="description">Emitted when textarea form component is not hovered anymore.</template>
                <template slot="type"><code>(value: String) => {}</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>
