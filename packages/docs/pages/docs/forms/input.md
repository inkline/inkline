---
title: Input
description: Form component used for inputting data directly from the keyboard. 
---

#  Input
##  Form component used for inputting data directly from the keyboard. 

### Example

<i-code title="Input">
<i-tab type="preview">
    <i-input v-model="inputValue" placeholder="Type something.." />
</i-tab>
<i-tab type="html">

~~~html
<i-input v-model="value" placeholder="Type something.." />
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      value: ''
    };
  }
}
~~~

</i-tab>
<i-tab type="output">

Value: <code>{{inputValue}}</code>

</i-tab>
</i-code>

### Disabled State


<i-code title="Disabled Input">
<i-tab type="preview">
    <i-input v-model="disabledInputValue" placeholder="Type something.." disabled />
</i-tab>
<i-tab type="html">

~~~html
<i-input v-model="value" placeholder="Type something.." disabled />
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      value: ''
    };
  }
}
~~~

</i-tab>
</i-code>

### Readonly State

<i-code title="Readonly Input">
<i-tab type="preview">
    <i-input v-model="readonlyInputValue" placeholder="Type something.." readonly />
</i-tab>
<i-tab type="html">

~~~html
<i-input v-model="value" placeholder="Type something.." readonly />
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      value: ''
    };
  }
}
~~~

</i-tab>
</i-code>

### Clearable Input

<i-code title="Input">
<i-tab type="preview">
    <i-input v-model="clearableInputValue" placeholder="Type something.." clearable />
</i-tab>
<i-tab type="html">

~~~html
<i-input v-model="value" placeholder="Type something.." clearable />
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      value: ''
    };
  }
}
~~~

</i-tab>
</i-code>

### Prefix and Suffix
Inkline allows you to easily add a prefix or suffix to your inputs. Using prefixes and suffixes you can, indicate 
your input type using an icon or text. 


<i-code title="Input">
<i-tab type="preview">
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
</i-tab>
<i-tab type="html">

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

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      value: ''
    };
  }
}
~~~

</i-tab>
</i-code>

### Prepend and Append
You can add additional content such as select fields, buttons or plain text, to either side of the input by using the prepend and append slots.

<i-code title="Input Text Prepend and Append">
<i-tab type="preview">
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
</i-tab>
<i-tab type="html">

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

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      value: ''
    };
  }
}
~~~

</i-tab>
</i-code>

<i-code title="Input Button Prepend and Append">
<i-tab type="preview">
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
</i-tab>
<i-tab type="html">

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

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      value: ''
    };
  }
}
~~~

</i-tab>
</i-code>

<i-code title="Input Button Prepend and Append">
<i-tab type="preview">
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

</i-tab>
<i-tab type="html">

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

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      value: ''
    };
  }
}
~~~

</i-tab>
</i-code>

### Sizes
You're able to use the `size` modifier to control the size of your inputs, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`.

<i-code title="Input Sizes">
<i-tab type="preview">
    <div class="_margin-bottom-1">
        <i-input size="sm" v-model="smInputValue" placeholder="Type something small.." />
    </div>
    <div class="_margin-bottom-1">
        <i-input size="md" v-model="mdInputValue" placeholder="Type something medium.." />
    </div>
    <div>
        <i-input size="lg" v-model="lgInputValue" placeholder="Type something large.." />
    </div>
</i-tab>
<i-tab type="html">

~~~html
<i-input size="sm" v-model="value" placeholder="Type something small.." />
~~~
~~~html
<i-input size="md" v-model="value" placeholder="Type something medium.." />
~~~
~~~html
<i-input size="lg" v-model="value" placeholder="Type something large.." />
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      value: ''
    };
  }
}
~~~

</i-tab>
</i-code>

### Types
Behind the scenes, Inkline uses a native HTML `<input>` element, meaning that you can use the `type` property to define the type of the input, such as `text`, `password`, `date`, `email`, and so on.


<i-code title="Input Type">
<i-tab type="preview">
    <div>
        <i-input type="password" v-model="passwordInputValue" placeholder="Enter your password.." />
    </div>
</i-tab>
<i-tab type="html">

~~~html
<i-input type="password" v-model="value" placeholder="Enter your password.." />
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      value: ''
    };
  }
}
~~~

</i-tab>
</i-code>

### Component API
Here you can find a list of the various customization options you can use for the input component as props, as well as available slots and events.

<i-code title="Input API" markup="i-input" expanded>
    <i-tab type="props">
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
                <template slot="description">Provides a schema binding to the input form component. See the <nuxt-link :to="{ name: 'docs-forms-validation-introduction' }">Form Validation</nuxt-link> documentation.</template>
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
    </i-tab>
    <i-tab type="slots">
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
    </i-tab>
    <i-tab type="events">
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
    </i-tab>
</i-code>


### Sass Variables
Here you can find a list of the Sass variables you can use for the input components. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

<i-code title="Input" expanded>
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$label-margin-bottom</template>
                <template slot="default"><code>0.5rem</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-line-height</template>
                <template slot="default"><code>$line-height</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-padding-base</template>
                <template slot="default"><code>spacers('1/2') spacers('1')</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-padding</template>
                <template slot="default"><code>size-map($input-padding-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-prefix-padding-base</template>
                <template slot="default"><code>nth($input-padding-base, 2) * 4</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-prefix-padding</template>
                <template slot="default"><code>size-map($input-prefix-padding-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-prefix-border-width</template>
                <template slot="default"><code>1px</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-font-size</template>
                <template slot="default"><code>$font-size</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-color-light</template>
                <template slot="default"><code>$body-color-light</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-color-focus-light</template>
                <template slot="default"><code>$input-color-light</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-color-disabled-light</template>
                <template slot="default"><code>$input-color-light</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-placeholder-color-light</template>
                <template slot="default"><code>colors('gray-60')</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-plaintext-color-light</template>
                <template slot="default"><code>$input-color-light</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-background-light</template>
                <template slot="default"><code>$color-white</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-background-disabled-light</template>
                <template slot="default"><code>colors('gray-20')</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-background-focus-light</template>
                <template slot="default"><code>$input-background-light</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-border-color-light</template>
                <template slot="default"><code>$border-color-light</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-border-color-hover-light</template>
                <template slot="default"><code>darken-lightness($input-border-color-light, 10%)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-border-color-focus-light</template>
                <template slot="default"><code>$color-primary</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-icon-circle-background-light</template>
                <template slot="default"><code>$color-light</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-icon-circle-background-hover-light</template>
                <template slot="default"><code>$color-primary</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-icon-circle-color-light</template>
                <template slot="default"><code>$color-dark</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-icon-circle-color-hover-light</template>
                <template slot="default"><code>$input-icon-circle-color-light</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-append-prepend-background-light</template>
                <template slot="default"><code>$color-light</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-color-dark</template>
                <template slot="default"><code>$body-color-dark</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-color-focus-dark</template>
                <template slot="default"><code>$input-color-dark</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-color-disabled-dark</template>
                <template slot="default"><code>$input-color-dark</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-placeholder-color-dark</template>
                <template slot="default"><code>colors('gray-40')</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-plaintext-color-dark</template>
                <template slot="default"><code>$input-color-dark</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-background-dark</template>
                <template slot="default"><code>darken($color-dark, 3%)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-background-disabled-dark</template>
                <template slot="default"><code>$color-gray-70</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-background-focus-dark</template>
                <template slot="default"><code>$input-background-dark</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-border-color-dark</template>
                <template slot="default"><code>$border-color-dark</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-border-color-hover-dark</template>
                <template slot="default"><code>lighten-lightness($input-border-color-dark, 10%)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-border-color-focus-dark</template>
                <template slot="default"><code>$color-primary</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-icon-circle-background-dark</template>
                <template slot="default"><code>$color-dark</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-icon-circle-background-hover-dark</template>
                <template slot="default"><code>$color-primary</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-icon-circle-color-dark</template>
                <template slot="default"><code>$color-white</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-icon-circle-color-hover-dark</template>
                <template slot="default"><code>$input-icon-circle-color-dark</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-append-prepend-background-dark</template>
                <template slot="default"><code>$color-dark</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-border-width</template>
                <template slot="default"><code>$border-width</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-border-radius</template>
                <template slot="default"><code>$border-radius</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-box-shadow</template>
                <template slot="default"><code>inset 0 1px 1px rgba($color-black, 0.05)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-transition</template>
                <template slot="default"><code>background-color $transition-duration $transition-easing, color $transition-duration $transition-easing, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-icon-circle-size</template>
                <template slot="default"><code>1.2rem</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-color-for-light-variant</template>
                <template slot="default"><code>$color-for-light-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-color-for-dark-variant</template>
                <template slot="default"><code>$color-for-dark-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-variant-{variant}</template>
                <template slot="default"><code>input-variant($color-{variant})</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$input-variants</template>
<template slot="default-row">
                
~~~scss
(
    light: $input-variant-light,
    dark: $input-variant-dark
)
~~~
                
</template>
            </api-table-row>
            <api-table-row>
                <template slot="function">input-variant</template>
<template slot="default-row">
                
~~~scss
@function input-variant($variant) {
    $input-color: variant-color-by-luminance($variant, $input-color-for-light-variant, $input-color-for-dark-variant);
    $input-color-focus: $input-color;
    $input-color-disabled: $input-color;
    $input-plaintext-color: $input-color;
    $input-placeholder-color: variant-color-by-luminance($variant, $color-gray-60, $color-gray-40);
    $input-background: $variant;
    $input-background-focus: $input-background;
    $input-background-disabled: variant-color-by-luminance($variant, $color-gray-20, $color-gray-70);
    $input-border-color: variant-color-by-luminance($variant, $border-color-light, $border-color-dark);
    $input-border-color-hover: variant-color-by-luminance($variant, darken-lightness($input-border-color, 10%), lighten-lightness($input-border-color, 10%));
    $input-border-color-focus: $color-primary;
    $input-icon-circle-background: variant-color-by-luminance($variant, $color-light, $color-dark);
    $input-icon-circle-background-hover: $color-primary;
    $input-icon-circle-color: variant-color-by-luminance($variant, $input-color-for-dark-variant, $input-color-for-light-variant);
    $input-icon-circle-color-hover: $input-icon-circle-color;
    $input-append-prepend-background: variant-color-by-luminance($variant, $color-light, $color-dark);

    $variant-map: (
        'color': $input-color,
        'color-focus': $input-color-focus,
        'color-disabled': $input-color-disabled,
        'placeholder-color': $input-placeholder-color,
        'plaintext-color': $input-plaintext-color,
        'background': $input-background,
        'background-disabled': $input-background-disabled,
        'background-focus': $input-background-focus,
        'border-color': $input-border-color,
        'border-color-hover': $input-border-color-hover,
        'border-color-focus': $input-border-color-focus,
        'icon-circle-background': $input-icon-circle-background,
        'icon-circle-background-hover': $input-icon-circle-background-hover,
        'icon-circle-color': $input-icon-circle-color,
        'icon-circle-color-hover': $input-icon-circle-color-hover,
        'append-prepend-background': $input-append-prepend-background,
    );

    @return $variant-map;
}
~~~
</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>
