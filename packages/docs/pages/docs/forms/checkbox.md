# Checkbox
## Checkbox inputs allow the user to select multiple options from a set. { .lead }

Using the `i-checkbox` component together with a `i-checkbox-group` allows you to control multiple values using a single binding.

### Basic Usage

<i-code-preview title="Basic Checkbox">
<i-checkbox v-model="checked">Apple</i-checkbox>
<template slot="html">

~~~html
<i-checkbox v-model="checked">Apple</i-checkbox>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      checked: true
    };
  }
}
~~~

</template>
<template slot="output">

Checked: <code>{{checked}}</code>

</template>
</i-code-preview>

### Checkbox Group

<i-code-preview title="Checkbox Group">
<i-checkbox-group v-model="checkedGroup">
    <i-checkbox value="Football">Football</i-checkbox>
    <i-checkbox value="Volleyball">Volleyball</i-checkbox>
    <i-checkbox value="Basketball">Basketball</i-checkbox>
    <i-checkbox value="Snowboarding">Snowboarding</i-checkbox>
    <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
</i-checkbox-group>
<template slot="html">

~~~html
<i-checkbox-group v-model="checked">
    <i-checkbox value="Football">Football</i-checkbox>
    <i-checkbox value="Volleyball">Volleyball</i-checkbox>
    <i-checkbox value="Basketball">Basketball</i-checkbox>
    <i-checkbox value="Snowboarding">Snowboarding</i-checkbox>
    <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
</i-checkbox-group>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      checked: ['Football', 'Basketball', 'Tennis']
    };
  }
}
~~~

</template>
<template slot="output">
Checked values: <code>{{checkedGroup}}</code>
</template>
</i-code-preview>


### Sizes
You're able to use the `size` property to control the size of your inputs, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`. 

<i-code-preview title="Checkbox Sizes">
<i-checkbox-group v-model="checkedSize">
    <i-checkbox size="sm" value="Football">Football</i-checkbox>
    <i-checkbox size="md" value="Volleyball">Tennis</i-checkbox>
    <i-checkbox size="lg" value="Basketball">Basketball</i-checkbox>
</i-checkbox-group>
<template slot="html">

~~~html
<i-checkbox-group v-model="checked">
    <i-checkbox size="sm" value="Football">Football</i-checkbox>
    <i-checkbox size="md" value="Volleyball">Tennis</i-checkbox>
    <i-checkbox size="lg" value="Basketball">Basketball</i-checkbox>
</i-checkbox-group>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      checked: ['Basketball']
    };
  }
}
~~~

</template>
</i-code-preview>

Applying the size `size` property to a `i-checkbox-group` will set the chosen size to all of its child inputs.

<i-code-preview title="Checkbox Group Size">
<i-checkbox-group size="sm" v-model="checkedSizeGroupSm" class="_margin-bottom-1">
    <i-checkbox value="Football">Football</i-checkbox>
    <i-checkbox value="Volleyball">Volleyball</i-checkbox>
    <i-checkbox value="Basketball">Basketball</i-checkbox>
    <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
</i-checkbox-group>
<i-checkbox-group size="md" v-model="checkedSizeGroupMd" class="_margin-bottom-1">
    <i-checkbox value="Football">Football</i-checkbox>
    <i-checkbox value="Volleyball">Volleyball</i-checkbox>
    <i-checkbox value="Basketball">Basketball</i-checkbox>
    <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
</i-checkbox-group>
<i-checkbox-group size="lg" v-model="checkedSizeGroupLg">
    <i-checkbox value="Football">Football</i-checkbox>
    <i-checkbox value="Volleyball">Volleyball</i-checkbox>
    <i-checkbox value="Basketball">Basketball</i-checkbox>
    <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
</i-checkbox-group>
<template slot="html">

~~~html
<i-checkbox-group size="sm" v-model="checked">
    <i-checkbox value="Football">Football</i-checkbox>
    <i-checkbox value="Volleyball">Volleyball</i-checkbox>
    <i-checkbox value="Basketball">Basketball</i-checkbox>
    <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
</i-checkbox-group>
~~~
~~~html
<i-checkbox-group size="md" v-model="checked">
    <i-checkbox value="Football">Football</i-checkbox>
    <i-checkbox value="Volleyball">Volleyball</i-checkbox>
    <i-checkbox value="Basketball">Basketball</i-checkbox>
    <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
</i-checkbox-group>
~~~
~~~html
<i-checkbox-group size="lg" v-model="checked">
    <i-checkbox value="Football">Football</i-checkbox>
    <i-checkbox value="Volleyball">Volleyball</i-checkbox>
    <i-checkbox value="Basketball">Basketball</i-checkbox>
    <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
</i-checkbox-group>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      checked: ['Basketball', 'Tennis']
    };
  }
}
~~~

</template>
</i-code-preview>

### Custom vs. Native
Inkline uses custom checkbox designs by setting the `custom` property to `true` by default. 

<i-code-preview title="Custom Checkbox">
<i-checkbox-group v-model="checkedCustomTrue">
    <i-checkbox :custom="true" value="Football">Football</i-checkbox>
    <i-checkbox :custom="true" value="Volleyball">Tennis</i-checkbox>
    <i-checkbox :custom="true" value="Basketball">Basketball</i-checkbox>    
</i-checkbox-group>
<template slot="html">

~~~html
<i-checkbox-group v-model="checkedCustomTrue">
    <i-checkbox :custom="true" value="Football">Football</i-checkbox>
    <i-checkbox :custom="true" value="Volleyball">Tennis</i-checkbox>
    <i-checkbox :custom="true" value="Basketball">Basketball</i-checkbox>    
</i-checkbox-group>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      checked: ['Basketball']
    };
  }
}
~~~

</template>
</i-code-preview>

### Indeterminate
You can set the state of a `<i-checkbox>` to be indeterminate by setting the `indeterminate` property to `true`. 

<i-code-preview title="Indeterminate Checkbox">
<i-checkbox :indeterminate="true">Football</i-checkbox>
<template slot="html">

~~~html
<i-checkbox :indeterminate="true">Football</i-checkbox>
~~~

</template>
<template slot="js"> 

~~~js
export default {
  data () {
    return {
      checked: ['Basketball']
    };
  }
}
~~~

</template>
</i-code-preview>


### Checkbox Buttons

You can display your checkbox inputs as toggleable buttons using the provided `<i-checkbox-button>` and `<i-checkbox-button-group>` components.

<i-code-preview title="Checkbox Buttons">
<i-checkbox-button-group v-model="checkedButton">
    <i-checkbox-button value="Earth">Earth</i-checkbox-button>
    <i-checkbox-button value="Mars">Mars</i-checkbox-button>
    <i-checkbox-button value="Jupiter">Jupiter</i-checkbox-button>
    <i-checkbox-button value="Venus" disabled>Venus</i-checkbox-button>
</i-checkbox-button-group>
<template slot="html">

~~~html
<i-checkbox-button-group v-model="checked">
    <i-checkbox-button value="Earth">Earth</i-checkbox-button>
    <i-checkbox-button value="Mars">Mars</i-checkbox-button>
    <i-checkbox-button value="Jupiter">Jupiter</i-checkbox-button>
    <i-checkbox-button value="Venus" disabled>Venus</i-checkbox-button>
</i-checkbox-button-group>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      checked: ['Earth']
    };
  }
}
~~~

</template>
</i-code-preview>


### Component API
Here you can find a list of the various customization options you can use for the checkbox components as props, as well as available slots and events.

<i-api-preview title="Checkbox API" markup="i-checkbox" expanded>
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">custom</template>
                <template slot="description">Sets the styling of the checkbox form component to custom or native.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>true</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">disabled</template>
                <template slot="description">Sets the state of the checkbox form component as disabled.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">indeterminate</template>
                <template slot="description">Sets the state of the checkbox form component as indeterminate.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">readonly</template>
                <template slot="description">Sets the state of the checkbox form component as readonly.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">schema</template>
                <template slot="description">Provides a schema binding to the checkbox form component. See the <nuxt-link to="/docs/forms/form-validation">Form Validation</nuxt-link> documentation.</template>
                <template slot="type"><code>Object</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the checkbox form component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">value</template>
                <template slot="description">Sets the value of the checkbox form component. Can be also provided using a <code>v-model</code> directive when the checkbox isn't grouped.</template>
                <template slot="type"><code>Boolean</code>, <code>String</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for checkbox form component label.</template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="events">
        <api-table>
            <api-table-row>
                <template slot="event">click</template>
                <template slot="description">Emitted when checkbox form component is clicked.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">focus</template>
                <template slot="description">Emitted when checkbox form component is focused.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">blur</template>
                <template slot="description">Emitted when checkbox form component is blurred.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">input</template>
                <template slot="description">Emitted when checkbox form component value changes.</template>
                <template slot="type"><code>(value: Boolean | String) => {}</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>

<i-api-preview title="Checkbox Group API" markup="i-checkbox-group" expanded>
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">disabled</template>
                <template slot="description">Sets the state of the checkbox form group component as disabled.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">readonly</template>
                <template slot="description">Sets the state of the checkbox form group component as readonly.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the checkbox form group component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">value</template>
                <template slot="description">Sets the value of the checkbox form group component. To be provided using the <code>v-model</code> directive.</template>
                <template slot="type"><code>Array&lt;String&gt;</code></template>
                <template slot="values"></template>
                <template slot="default"><code>[]</code></template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for checkbox form group component default content.</template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="events">
        <api-table>
            <api-table-row>
                <template slot="event">focus</template>
                <template slot="description">Emitted when a child checkbox form component is focused.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">blur</template>
                <template slot="description">Emitted when a child checkbox form component is blurred.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">input</template>
                <template slot="description">Emitted when checkbox form group component value changes.</template>
                <template slot="type"><code>(value: Boolean | String) => {}</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>
