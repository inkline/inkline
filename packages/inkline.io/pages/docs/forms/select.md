# Select
## Select inputs are form components used for providing a collapsible list of options.{ .lead }

### Example

<i-code-preview title="Basic Select" link="https://github.com/inkline/inkline/tree/master/src/components/Select">

<i-select v-model="selectValue" placeholder="Choose an option">
    <i-select-option value="a" label="Option A" />
    <i-select-option value="b" label="Option B" />
    <i-select-option value="c" label="Option C" />
    <i-select-option value="d" label="Option D" disabled />
</i-select>

<template slot="html">

~~~html
<i-select v-model="value" placeholder="Choose an option">
    <i-select-option value="a" label="Option A" />
    <i-select-option value="b" label="Option B" />
    <i-select-option value="c" label="Option C" />
    <i-select-option value="d" label="Option D" disabled />
</i-select>
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

Selected value: <code>{{selectValue}}</code>

</template>
</i-code-preview>

### Disabled State

<i-code-preview title="Disabled Select" link="https://github.com/inkline/inkline/tree/master/src/components/Select">

<i-select v-model="disabledSelectValue" placeholder="Choose an option" disabled>
    <i-select-option value="a" label="Option A" />
    <i-select-option value="b" label="Option B" />
    <i-select-option value="c" label="Option C" />
    <i-select-option value="d" label="Option D" disabled />
</i-select>

<template slot="html">

~~~html
<i-select v-model="value" placeholder="Choose an option">
    <i-select-option value="a" label="Option A" />
    <i-select-option value="b" label="Option B" />
    <i-select-option value="c" label="Option C" />
    <i-select-option value="d" label="Option D" disabled />
</i-select>
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

<i-code-preview title="Select Prefix and Suffix" link="https://github.com/inkline/inkline/tree/master/src/components/Select">

<i-select v-model="prefixSelectValue" placeholder="Choose an option" class="_margin-bottom-1">
    <i slot="prefix">@</i>
    <i-select-option value="a" label="Option A" />
    <i-select-option value="b" label="Option B" />
    <i-select-option value="c" label="Option C" />
    <i-select-option value="d" label="Option D" disabled />
</i-select>

<i-select v-model="suffixSelectValue" placeholder="Choose an option" class="_margin-bottom-1">
    <i slot="suffix">@</i>
    <i-select-option value="a" label="Option A" />
    <i-select-option value="b" label="Option B" />
    <i-select-option value="c" label="Option C" />
    <i-select-option value="d" label="Option D" disabled />
</i-select>

<i-select v-model="prefixSuffixSelectValue" placeholder="Choose an option">
    <i slot="suffix">@</i>
    <i-select-option value="a" label="Option A" />
    <i-select-option value="b" label="Option B" />
    <i-select-option value="c" label="Option C" />
    <i-select-option value="d" label="Option D" disabled />
    <i slot="prefix">@</i>
</i-select>

<template slot="html">

~~~html
<i-select v-model="value" placeholder="Choose an option">
    <i slot="prefix">@</i>
    <i-select-option value="a" label="Option A" />
    <i-select-option value="b" label="Option B" />
    <i-select-option value="c" label="Option C" />
    <i-select-option value="d" label="Option D" disabled />
</i-select>
~~~
~~~html
<i-select v-model="value" placeholder="Choose an option">
    <i slot="suffix">@</i>
    <i-select-option value="a" label="Option A" />
    <i-select-option value="b" label="Option B" />
    <i-select-option value="c" label="Option C" />
    <i-select-option value="d" label="Option D" disabled />
</i-select>
~~~
~~~html
<i-select v-model="value" placeholder="Choose an option">
    <i slot="prefix">@</i>
    <i-select-option value="a" label="Option A" />
    <i-select-option value="b" label="Option B" />
    <i-select-option value="c" label="Option C" />
    <i-select-option value="d" label="Option D" disabled />
    <i slot="suffix">@</i>
</i-select>
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

<i-code-preview title="Select Sizes" link="https://github.com/inkline/inkline/tree/master/src/components/Select">

<i-form-group class="_margin-bottom-1">
    <i-select v-model="smSelectValue" size="sm" placeholder="Choose an option">
        <i-select-option value="a" label="Option A" />
        <i-select-option value="b" label="Option B" />
        <i-select-option value="c" label="Option C" />
        <i-select-option value="d" label="Option D" disabled />
    </i-select>
</i-form-group>

<i-form-group class="_margin-bottom-1">
    <i-select v-model="mdSelectValue" size="md" placeholder="Choose an option">
        <i-select-option value="a" label="Option A" />
        <i-select-option value="b" label="Option B" />
        <i-select-option value="c" label="Option C" />
        <i-select-option value="d" label="Option D" disabled />
    </i-select>
</i-form-group>

<i-form-group>
    <i-select v-model="lgSelectValue" size="lg" placeholder="Choose an option">
        <i-select-option value="a" label="Option A" />
        <i-select-option value="b" label="Option B" />
        <i-select-option value="c" label="Option C" />
        <i-select-option value="d" label="Option D" disabled />
    </i-select>
</i-form-group>

<template slot="html">

~~~html
<i-select v-model="value" size="sm" placeholder="Choose an option">
    <i-select-option value="a" label="Option A" />
    <i-select-option value="b" label="Option B" />
    <i-select-option value="c" label="Option C" />
    <i-select-option value="d" label="Option D" disabled />
</i-select>
~~~
~~~html
<i-select v-model="value" size="md" placeholder="Choose an option">
    <i-select-option value="a" label="Option A" />
    <i-select-option value="b" label="Option B" />
    <i-select-option value="c" label="Option C" />
    <i-select-option value="d" label="Option D" disabled />
</i-select>
~~~
~~~html
<i-select v-model="value" size="lg" placeholder="Choose an option">
    <i-select-option value="a" label="Option A" />
    <i-select-option value="b" label="Option B" />
    <i-select-option value="c" label="Option C" />
    <i-select-option value="d" label="Option D" disabled />
</i-select>
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

<i-api-preview title="Select API" markup="i-select" expanded>
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
                    <td>Sets the state of the select form component as disabled.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>placeholder</td>
                    <td>Sets the placeholder of the select form component.</td>
                    <td><code>String</code></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>readonly</td>
                    <td>Sets the state of the select form component as readonly.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>schema</td>
                    <td>Provides a schema binding to the select form component. See the <nuxt-link to="/docs/forms/form-validation">Form Validation</nuxt-link> documentation.</td>
                    <td><code>Object</code></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>size</td>
                    <td>Sets the size of the select form component.</td>
                    <td><code>String</code></td>
                    <td><code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>md</code></td>
                </tr>
                <tr>
                    <td>value</td>
                    <td>Sets the value of the select form component. To be provided using the <code>v-model</code> directive.</td>
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
                    <td>default</td>
                    <td>Slot for select default content. To be populated with select option components.</td>
                </tr>
                <tr>
                    <td>prepend</td>
                    <td>Slot for select prepend content. Prepended content appears before the select inside a button-like container.</td>
                </tr>
                <tr>
                    <td>append</td>
                    <td>Slot for select append content. Appended content appears after the select inside a button-like container.</td>
                </tr>
                <tr>
                    <td>prefix</td>
                    <td>Slot for select prefix content. The prefix content appears inside the select field, on the left side.</td>
                </tr>
                <tr>
                    <td>suffix</td>
                    <td>Slot for select suffix content. The suffix content appears inside the select field, on the right side.</td>
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
                    <td>Emitted when select form component is clicked.</td>
                    <td><code>(event: Event) => {}</code></td>
                </tr>
                <tr>
                    <td>focus</td>
                    <td>Emitted when select form component is focused.</td>
                    <td><code>(event: Event) => {}</code></td>
                </tr>
                <tr>
                    <td>blur</td>
                    <td>Emitted when select form component is blurred.</td>
                    <td><code>(event: Event) => {}</code></td>
                </tr>
                <tr>
                    <td>change</td>
                    <td>Emitted when select form component value changes.</td>
                    <td><code>(value: String) => {}</code></td>
                </tr>
                <tr>
                    <td>input</td>
                    <td>Emitted when select form component value changes.</td>
                    <td><code>(value: String) => {}</code></td>
                </tr>
                <tr>
                    <td>mouseenter</td>
                    <td>Emitted when select form component is hovered.</td>
                    <td><code>(value: String) => {}</code></td>
                </tr>
                <tr>
                    <td>mouseleave</td>
                    <td>Emitted when select form component is not hovered anymore.</td>
                    <td><code>(value: String) => {}</code></td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>

<i-api-preview title="Select Option API" markup="i-select-option" expanded>
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
                    <td>Sets the state of the select form component as disabled.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>value</td>
                    <td>Sets the value of the select form component option.</td>
                    <td><code>String</code></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>label</td>
                    <td>Sets the text label of the select form component option.</td>
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
                    <td>default</td>
                    <td>Slot for select default content. To be populated with select option components.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>
