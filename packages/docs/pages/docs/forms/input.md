# Input
## Form component used for inputting data directly from the keyboard. { .lead }

### Example

<i-code-preview title="Input">

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


<i-code-preview title="Disabled Input">

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

### Readonly State

<i-code-preview title="Readonly Input">

<i-input v-model="readonlyInputValue" placeholder="Type something.." readonly />

<template slot="html">

~~~html
<i-input v-model="value" placeholder="Type something.." readonly />
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

<i-code-preview title="Input">

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


<i-code-preview title="Input">

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


<i-code-preview title="Input Text Prepend and Append">

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
~~~
~~~html
<i-input v-model="value" placeholder="Type something..">
    <span slot="append">.com</span>
</i-input>
~~~
~~~html
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

<i-code-preview title="Input Button Prepend and Append">

<i-input v-model="prependButtonInputValue" placeholder="Type something.." class="_margin-bottom-1">
    <i-button slot="prepend">Button</i-button>
</i-input>

<i-input v-model="appendButtonInputValue" placeholder="Type something.." class="_margin-bottom-1">
    <i-button slot="append">Button</i-button>
</i-input>

<i-input v-model="prependAppendButtonInputValue" placeholder="Type something..">
    <i-button slot="prepend">Button</i-button>
    <i-button slot="append">Button</i-button>
</i-input>

<template slot="html">

~~~html
<i-input v-model="value" placeholder="Type something..">
    <i-button slot="prepend">Button</i-button>
</i-input>
~~~
~~~html
<i-input v-model="value" placeholder="Type something..">
    <i-button slot="append">Button</i-button>
</i-input>
~~~
~~~html
<i-input v-model="value" placeholder="Type something..">
    <i-button slot="prepend">Button</i-button>
    <i-button slot="append">Button</i-button>
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

<i-code-preview title="Input Button Prepend and Append">

<i-input v-model="prependDropdownInputValue" placeholder="Type something.." class="_margin-bottom-1">
    <i-dropdown slot="prepend">
        <i-button>Dropdown</i-button>
        <i-dropdown-menu>
            <i-dropdown-item href>Action</i-dropdown-item>
            <i-dropdown-item href>Another action</i-dropdown-item>
            <i-dropdown-item href disabled>Something disabled here</i-dropdown-item>
            <i-dropdown-divider />
            <i-dropdown-item>Separated item</i-dropdown-item>
        </i-dropdown-menu>
    </i-dropdown>
</i-input>

<i-input v-model="appendDropdownInputValue" placeholder="Type something.." class="_margin-bottom-1">
    <i-dropdown slot="append">
        <i-button>Dropdown</i-button>
        <i-dropdown-menu>
            <i-dropdown-item href>Action</i-dropdown-item>
            <i-dropdown-item href>Another action</i-dropdown-item>
            <i-dropdown-item href disabled>Something disabled here</i-dropdown-item>
            <i-dropdown-divider />
            <i-dropdown-item>Separated item</i-dropdown-item>
        </i-dropdown-menu>
    </i-dropdown>
</i-input>

<i-input v-model="prependAppendDropdownInputValue" placeholder="Type something..">
    <i-dropdown slot="prepend">
        <i-button>Dropdown</i-button>
        <i-dropdown-menu>
            <i-dropdown-item href>Action</i-dropdown-item>
            <i-dropdown-item href>Another action</i-dropdown-item>
            <i-dropdown-item href disabled>Something disabled here</i-dropdown-item>
            <i-dropdown-divider />
            <i-dropdown-item>Separated item</i-dropdown-item>
        </i-dropdown-menu>
    </i-dropdown>
    <i-dropdown slot="append">
        <i-button>Dropdown</i-button>
        <i-dropdown-menu>
            <i-dropdown-item href>Action</i-dropdown-item>
            <i-dropdown-item href>Another action</i-dropdown-item>
            <i-dropdown-item href disabled>Something disabled here</i-dropdown-item>
            <i-dropdown-divider />
            <i-dropdown-item>Separated item</i-dropdown-item>
        </i-dropdown-menu>
    </i-dropdown>
</i-input>

<template slot="html">

~~~html
<i-input v-model="value" placeholder="Type something..">
    <i-dropdown slot="prepend">
        <i-button>Dropdown</i-button>
        <i-dropdown-menu>
            <i-dropdown-item href>Action</i-dropdown-item>
            <i-dropdown-item href>Another action</i-dropdown-item>
            <i-dropdown-item href disabled>Something disabled here</i-dropdown-item>
            <i-dropdown-divider />
            <i-dropdown-item>Separated item</i-dropdown-item>
        </i-dropdown-menu>
    </i-dropdown>
</i-input>
~~~
~~~html
<i-input v-model="value" placeholder="Type something..">
    <i-dropdown slot="append">
        <i-button>Dropdown</i-button>
        <i-dropdown-menu>
            <i-dropdown-item href>Action</i-dropdown-item>
            <i-dropdown-item href>Another action</i-dropdown-item>
            <i-dropdown-item href disabled>Something disabled here</i-dropdown-item>
            <i-dropdown-divider />
            <i-dropdown-item>Separated item</i-dropdown-item>
        </i-dropdown-menu>
    </i-dropdown>
</i-input>
~~~
~~~html
<i-input v-model="value" placeholder="Type something..">
    <i-dropdown slot="prepend">
        <i-button>Dropdown</i-button>
        <i-dropdown-menu>
            <i-dropdown-item href>Action</i-dropdown-item>
            <i-dropdown-item href>Another action</i-dropdown-item>
            <i-dropdown-item href disabled>Something disabled here</i-dropdown-item>
            <i-dropdown-divider />
            <i-dropdown-item>Separated item</i-dropdown-item>
        </i-dropdown-menu>
    </i-dropdown>
    <i-dropdown slot="append">
        <i-button>Dropdown</i-button>
        <i-dropdown-menu>
            <i-dropdown-item href>Action</i-dropdown-item>
            <i-dropdown-item href>Another action</i-dropdown-item>
            <i-dropdown-item href disabled>Something disabled here</i-dropdown-item>
            <i-dropdown-divider />
            <i-dropdown-item>Separated item</i-dropdown-item>
        </i-dropdown-menu>
    </i-dropdown>
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

<i-code-preview title="Input Sizes">

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

### Types
Behind the scenes, Inkline uses a native HTML `<input>` element, meaning that you can use the `type` property to define the type of the input, such as `text`, `password`, `date`, `email`, and so on.


<i-code-preview title="Input Type">

<div>
    <i-input type="password" v-model="passwordInputValue" placeholder="Enter your password.." />
</div>

<template slot="html">

~~~html
<i-input type="password" v-model="value" placeholder="Enter your password.." />
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
Here you can find a list of the various customization options you can use for the input component as props, as well as available slots and events.

<i-api-preview title="Input API" markup="i-input" expanded>
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">clearable</template>
                <template slot="description">Sets the input as clearable. Clearable inputs have a clear icon when value a is provided.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">disabled</template>
                <template slot="description">Sets the state of the input form component as disabled.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">placeholder</template>
                <template slot="description">Sets the placeholder of the input form component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">readonly</template>
                <template slot="description">Sets the state of the input form component as readonly.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">schema</template>
                <template slot="description">Provides a schema binding to the input form component. See the <nuxt-link to="/docs/forms/form-validation">Form Validation</nuxt-link> documentation.</template>
                <template slot="type"><code>Object</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the input form component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">type</template>
                <template slot="description">Sets the type of the input form component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>text</code>, <code>password</code></template>
                <template slot="default"><code>text</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">value</template>
                <template slot="description">Sets the value of the input form component. To be provided using the <code>v-model</code> directive.</template>
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
                <template slot="description">Slot for input prepend content. Prepended content appears before the input inside a button-like container.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">append</template>
                <template slot="description">Slot for input append content. Appended content appears after the input inside a button-like container.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">prefix</template>
                <template slot="description">Slot for input prefix content. The prefix content appears inside the input field, on the left side.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">suffix</template>
                <template slot="description">Slot for input suffix content. The suffix content appears inside the input field, on the right side.</template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="events">
        <api-table>
            <api-table-row>
                <template slot="event">click</template>
                <template slot="description">Emitted when input form component is clicked.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">focus</template>
                <template slot="description">Emitted when input form component is focused.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">blur</template>
                <template slot="description">Emitted when input form component is blurred.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">change</template>
                <template slot="description">Emitted when input form component value changes.</template>
                <template slot="type"><code>(value: String) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">input</template>
                <template slot="description">Emitted when input form component value changes.</template>
                <template slot="type"><code>(value: String) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">mouseenter</template>
                <template slot="description">Emitted when input form component is hovered.</template>
                <template slot="type"><code>(value: String) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">mouseleave</template>
                <template slot="description">Emitted when input form component is not hovered anymore.</template>
                <template slot="type"><code>(value: String) => {}</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>
