# Select
## Select inputs are form components used for providing a collapsible list of options.{ .lead }

### Example

<i-code-preview title="Basic Select">

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

<i-code-preview title="Disabled Select">

<i-select v-model="disabledSelectValue" placeholder="Choose an option" disabled>
    <i-select-option value="a" label="Option A" />
    <i-select-option value="b" label="Option B" />
    <i-select-option value="c" label="Option C" />
    <i-select-option value="d" label="Option D" disabled />
</i-select>

<template slot="html">

~~~html
<i-select v-model="value" placeholder="Choose an option" disabled>
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

### Readonly State

<i-code-preview title="Readonly Select">

<i-select v-model="readonlySelectValue" placeholder="Choose an option" readonly>
    <i-select-option value="a" label="Option A" />
    <i-select-option value="b" label="Option B" />
    <i-select-option value="c" label="Option C" />
    <i-select-option value="d" label="Option D" disabled />
</i-select>

<template slot="html">

~~~html
<i-select v-model="value" placeholder="Choose an option" readonly>
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

<i-code-preview title="Select Prefix and Suffix">

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

<i-code-preview title="Select Sizes">

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
        <api-table>
            <api-table-row>
                <template slot="property">disabled</template>
                <template slot="description">Sets the state of the select form component as disabled.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">placeholder</template>
                <template slot="description">Sets the placeholder of the select form component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">readonly</template>
                <template slot="description">Sets the state of the select form component as readonly.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">schema</template>
                <template slot="description">Provides a schema binding to the select form component. See the <nuxt-link to="/docs/forms/form-validation">Form Validation</nuxt-link> documentation.</template>
                <template slot="type"><code>Object</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the select form component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">value</template>
                <template slot="description">Sets the value of the select form component. To be provided using the <code>v-model</code> directive.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for select default content. To be populated with select option components.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">prepend</template>
                <template slot="description">Slot for select prepend content. Prepended content appears before the select inside a button-like container.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">append</template>
                <template slot="description">Slot for select append content. Appended content appears after the select inside a button-like container.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">prefix</template>
                <template slot="description">Slot for select prefix content. The prefix content appears inside the select field, on the left side.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">suffix</template>
                <template slot="description">Slot for select suffix content. The suffix content appears inside the select field, on the right side.</template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="events">
        <api-table>
            <api-table-row>
                <template slot="event">click</template>
                <template slot="description">Emitted when select form component is clicked.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">focus</template>
                <template slot="description">Emitted when select form component is focused.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">blur</template>
                <template slot="description">Emitted when select form component is blurred.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">change</template>
                <template slot="description">Emitted when select form component value changes.</template>
                <template slot="type"><code>(value: String) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">input</template>
                <template slot="description">Emitted when select form component value changes.</template>
                <template slot="type"><code>(value: String) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">mouseenter</template>
                <template slot="description">Emitted when select form component is hovered.</template>
                <template slot="type"><code>(value: String) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">mouseleave</template>
                <template slot="description">Emitted when select form component is not hovered anymore.</template>
                <template slot="type"><code>(value: String) => {}</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>

<i-api-preview title="Select Option API" markup="i-select-option" expanded>
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">disabled</template>
                <template slot="description">Sets the state of the select form component as disabled.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">value</template>
                <template slot="description">Sets the value of the select form component option.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">label</template>
                <template slot="description">Sets the text label of the select form component option.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for select default content. To be populated with select option components.</template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>
